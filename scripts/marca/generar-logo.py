# Uso: pip install fonttools && python3 scripts/marca/generar-logo.py public/marca
"""Genera el isotipo y el logotipo de DEVMARK en SVG.

El isotipo se redibuja con geometria medida sobre el original (1254 px): tres piezas con
esquinas redondeadas. El texto usa los contornos de Braze engrosados con un trazo redondo.
"""
import math, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

OUT = sys.argv[1]
INK, AZUL, MEDIO, CLARO, M_COLOR, ARK_COLOR, LEMA = "#010F35", "#0039FB", "#0C70FD", "#9AB3FA", "#0165FC", "#0132FC", "#12214F"

def f(n):
    s = f"{n:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s

def redondeado(pts):
    """Poligono [(x, y, radio)] con esquinas redondeadas por arcos circulares."""
    n = len(pts)
    segs = []
    for i in range(n):
        px, py, _ = pts[i - 1]
        vx, vy, r = pts[i]
        nx, ny, _ = pts[(i + 1) % n]
        ax, ay = px - vx, py - vy
        bx, by = nx - vx, ny - vy
        la, lb = math.hypot(ax, ay), math.hypot(bx, by)
        ax, ay, bx, by = ax / la, ay / la, bx / lb, by / lb
        if r <= 0:
            segs.append(((vx, vy), (vx, vy), 0, 0)); continue
        cosphi = max(-1, min(1, ax * bx + ay * by))
        phi = math.acos(cosphi)
        t = r / math.tan(phi / 2)
        t = min(t, la * 0.49, lb * 0.49)
        r_eff = t * math.tan(phi / 2)
        p1 = (vx + ax * t, vy + ay * t)
        p2 = (vx + bx * t, vy + by * t)
        cross = (-ax) * by - (-ay) * bx  # giro de entrada -> salida
        sweep = 1 if cross > 0 else 0
        segs.append((p1, p2, r_eff, sweep))
    d = f"M{f(segs[0][1][0])} {f(segs[0][1][1])}"
    for i in list(range(1, n)) + [0]:
        p1, p2, r, sweep = segs[i]
        d += f"L{f(p1[0])} {f(p1[1])}"
        if r > 0:
            d += f"A{f(r)} {f(r)} 0 0 {sweep} {f(p2[0])} {f(p2[1])}"
    return d + "Z"

# ---------------------------------------------------------------- isotipo ---
# Coordenadas del original de 1254 px. Diagonal superior: x = y - 55. Diagonales inferiores medidas.
diag_d = lambda y: 910 + 0.935 * (y - 840)
diag_m = lambda y: 824 + 0.967 * (y - 840)
diag_l = lambda y: 279 + 0.905 * (y - 800)
y_lm = 800 + (130 - 279) / 0.905  # donde la frontera claro/medio toca el borde izquierdo

OSCURA = [(173 - 55, 173, 10), (1114, 173, 230), (1114, 840 + 204 / 0.935, 10), (diag_d(828), 828, 14), (824, 828, 6), (824, 438, 30), (383, 438, 12)]
MEDIA = [(130, 415, 12), (387, 432, 16), (387, 831, 10), (diag_m(831), 831, 8), (diag_m(1101), 1101, 12), (diag_l(1101), 1101, 0), (130, y_lm, 0)]
CLARA = [(130, y_lm, 0), (diag_l(1101), 1101, 0), (130, 1101, 228)]
ISO_BBOX = (118, 173, 1114, 1101)

# Media + clara en una sola pieza, para las versiones de un color (sin costura entre ambas).
MEDIA_Y_CLARA = [(130, 415, 12), (387, 432, 16), (387, 831, 10), (diag_m(831), 831, 8), (diag_m(1101), 1101, 12), (130, 1101, 228)]

def piezas(colores):
    if colores[1] == colores[2]:
        return [(redondeado(OSCURA), colores[0]), (redondeado(MEDIA_Y_CLARA), colores[1])]
    return [(redondeado(OSCURA), colores[0]), (redondeado(MEDIA), colores[1]), (redondeado(CLARA), colores[2])]

def iso_grupo(colores, transform="", extra=""):
    t = f' transform="{transform}"' if transform else ""
    cuerpo = "".join(f'<path d="{d}" fill="{c}"{extra}/>' for d, c in piezas(colores))
    return f"<g{t}>{cuerpo}</g>"

# ------------------------------------------------------------------ texto ---
class Fuente:
    def __init__(self, ruta):
        f = TTFont(ruta)
        self.gs, self.cmap = f.getGlyphSet(), f.getBestCmap()
        self.cap = getattr(f["OS/2"], "sCapHeight", 0) or 700

import os
AQUI = os.path.dirname(os.path.abspath(__file__))
BRAZE = Fuente(os.path.join(AQUI, "..", "..", "src", "fonts", "Braze.otf"))  # el nombre
MICHROMA = Fuente(os.path.join(AQUI, "Michroma-Regular.ttf"))  # el lema (OFL)

from fontTools.pens.boundsPen import BoundsPen

def caja(ch, fu=BRAZE):
    p = BoundsPen(fu.gs); fu.gs[fu.cmap[ord(ch)]].draw(p); return p.bounds

def texto(cadena, x, y_base, alto, sx_rel, hueco, trazo, color, hueco_espacio=None, extra="", fu=BRAZE):
    """Coloca cada letra por su caja (no por su avance), como en el logo original.
    alto: alto de mayuscula; sx_rel: estiramiento horizontal; hueco: espacio entre letras."""
    # El trazo crece hacia afuera: la letra se dibuja mas chica para que el total mida lo pedido.
    sy = (alto - trazo) / fu.cap
    sx = sy * sx_rel
    partes, cx = [], x + trazo / 2
    for ch in cadena:
        if ch == " ":
            cx += (hueco_espacio if hueco_espacio is not None else hueco * 3); continue
        x0, _, x1, _ = caja(ch, fu)
        pen = SVGPathPen(fu.gs)
        fu.gs[fu.cmap[ord(ch)]].draw(TransformPen(pen, (sx, 0, 0, -sy, cx - x0 * sx, y_base - trazo / 2)))
        partes.append(pen.getCommands())
        cx += (x1 - x0) * sx + trazo + hueco
    ancho = cx - hueco - x - trazo / 2
    attrs = f'fill="{color}"' + (f' stroke="{color}" stroke-width="{f(trazo)}" stroke-linejoin="round"' if trazo else "")
    return f'<path d="{" ".join(partes)}" {attrs}{extra}/>', ancho

def ancho_letras(cadena, alto, sx_rel, trazo=0, fu=BRAZE):
    sx = (alto - trazo) / fu.cap * sx_rel
    return sum((caja(c, fu)[2] - caja(c, fu)[0]) * sx + trazo for c in cadena if c != " ")

# ------------------------------------------------------------- archivos ---
def svg(w, h, cuerpo, titulo, defs=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" role="img" aria-label="{titulo}"><title>{titulo}</title>{defs}{cuerpo}</svg>\n'

def guardar(nombre, contenido):
    open(f"{OUT}/{nombre}", "w").write(contenido)

COLOR = (AZUL, MEDIO, CLARO)
BLANCO = ("#FFFFFF", "#FFFFFF", "#FFFFFF")
# Blanco con tres opacidades: conserva la profundidad del isotipo sobre color.
BLANCO_TONAL = ("rgba(255,255,255,1)", "rgba(255,255,255,0.78)", "rgba(255,255,255,0.5)")

# Isotipo cuadrado con margen interno minimo.
ix0, iy0, ix1, iy1 = ISO_BBOX
pad = 8
iso_vb = (ix0 - pad, iy0 - pad, ix1 - ix0 + 2 * pad, iy1 - iy0 + 2 * pad)
def iso_svg(colores, titulo, defs="", extra=""):
    x, y, w, h = iso_vb
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x)} {f(y)} {f(w)} {f(h)}" role="img" aria-label="{titulo}"><title>{titulo}</title>{defs}{iso_grupo(colores, extra=extra)}</svg>\n'

guardar("devmark-isotipo.svg", iso_svg(COLOR, "DEVMARK"))
guardar("devmark-isotipo-blanco.svg", iso_svg(BLANCO_TONAL, "DEVMARK"))
guardar("devmark-isotipo-blanco-solido.svg", iso_svg(BLANCO, "DEVMARK"))
guardar("devmark-isotipo-tinta.svg", iso_svg((INK, INK, INK), "DEVMARK"))

# Version vidrio: piezas blancas con degradado azul hacia la arista, como el original.
VIDRIO_DEFS = (
    '<defs>'
    '<linearGradient id="v1" x1="0.35" y1="1" x2="0.55" y2="0.35"><stop offset="0" stop-color="#6F93FA"/><stop offset="0.55" stop-color="#E6EDFE"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>'
    '<linearGradient id="v2" x1="0.6" y1="1" x2="0.4" y2="0"><stop offset="0" stop-color="#7E9EFB"/><stop offset="0.7" stop-color="#E3EBFE"/><stop offset="1" stop-color="#F7F9FF"/></linearGradient>'
    '<linearGradient id="v3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF2FE"/></linearGradient>'
    '</defs>'
)
guardar("devmark-isotipo-vidrio.svg", iso_svg(("url(#v1)", "url(#v2)", "url(#v3)"), "DEVMARK", VIDRIO_DEFS, ' stroke="#B9C9FC" stroke-width="2"'))

# Logotipo horizontal, en pixeles del original (2000 x 667) restando su esquina (81, 185):
# isotipo 305 x 288, nombre de x=429 a 1920 con mayusculas de 160 (y 237-397),
# lema de 28 de alto (y 438-466) a lo ancho de x=428 a 1906.
OX, OY = 81, 185
def logotipo(tonos, con_lema=True, defs="", extra_iso="", extra_txt=""):
    iso_alto = 288.0
    s_iso = iso_alto / (iy1 - iy0)
    cap_h, trazo = 160.0, 6.0
    tx = 429 - OX
    base = 397 - OY
    sx_rel = (203 - trazo) / ((caja("D")[2] - caja("D")[0]) * (cap_h - trazo) / BRAZE.cap)  # la D mide 203 de ancho
    ancho_nombre = 1920 - 429
    hueco = (ancho_nombre - ancho_letras("DEVMARK", cap_h, sx_rel, trazo)) / 6
    dev, w_dev = texto("DEV", tx, base, cap_h, sx_rel, hueco, trazo, tonos["dev"], extra=extra_txt)
    m, w_m = texto("M", tx + w_dev + hueco, base, cap_h, sx_rel, hueco, trazo, tonos["m"], extra=extra_txt)
    ark, w_ark = texto("ARK", tx + w_dev + hueco + w_m + hueco, base, cap_h, sx_rel, hueco, trazo, tonos["ark"], extra=extra_txt)
    cuerpo = f'<g transform="scale({f(s_iso)}) translate({f(-ix0)} {f(-iy0)})">{iso_grupo(tonos["iso"], extra=extra_iso)}</g>{dev}{m}{ark}'
    alto = iso_alto
    if con_lema:
        lema = "AGENCIA DE DESARROLLO WEB Y SOFTWARE"
        lh, lt = 28.0, 3.6
        letras = [c for c in lema if c != " "]
        palabras = lema.count(" ")
        ancho_lema = 1906 - 428
        # Entre palabras va el triple del hueco entre letras (hueco + espacio de 2 huecos).
        hueco_l = (ancho_lema - ancho_letras(lema, lh, 1.0, lt, MICHROMA)) / (len(letras) - 1 + palabras * 2)
        l_svg, _ = texto(lema, 428 - OX, 466 - OY, lh, 1.0, hueco_l, lt, tonos["lema"], hueco_espacio=hueco_l * 2, extra=extra_txt, fu=MICHROMA)
        cuerpo += l_svg
    ancho = 1920 - OX + trazo
    return ancho, alto, cuerpo, defs

def guardar_logo(nombre, tonos, con_lema=True, defs="", extra_iso="", extra_txt=""):
    w, h, cuerpo, defs = logotipo(tonos, con_lema, defs, extra_iso, extra_txt)
    m = 4
    guardar(nombre, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(-m)} {f(-m)} {f(w + 2 * m)} {f(h + 2 * m)}" role="img" aria-label="DEVMARK, agencia de desarrollo web y software"><title>DEVMARK</title>{defs}{cuerpo}</svg>\n')

COLOR_T = {"iso": COLOR, "dev": INK, "m": M_COLOR, "ark": ARK_COLOR, "lema": LEMA}
OSCURO_T = {"iso": COLOR, "dev": "#FFFFFF", "m": "#3D8BFF", "ark": "#5B7BFF", "lema": "#B4B1D6"}
BLANCO_T = {"iso": BLANCO_TONAL, "dev": "#FFFFFF", "m": "#FFFFFF", "ark": "#FFFFFF", "lema": "#FFFFFF"}
TINTA_T = {"iso": (INK, INK, INK), "dev": INK, "m": INK, "ark": INK, "lema": INK}

guardar_logo("devmark-logotipo.svg", COLOR_T)
guardar_logo("devmark-logotipo-sin-lema.svg", COLOR_T, False)
guardar_logo("devmark-logotipo-fondo-oscuro.svg", OSCURO_T)
guardar_logo("devmark-logotipo-blanco.svg", BLANCO_T)
guardar_logo("devmark-logotipo-tinta.svg", TINTA_T)
VIDRIO_T = {"iso": ("url(#v1)", "url(#v2)", "url(#v3)"), "dev": "#F3F6FF", "m": "url(#vt)", "ark": "#EEF2FF", "lema": "#F1F4FF"}
guardar_logo("devmark-logotipo-vidrio.svg", VIDRIO_T, True, VIDRIO_DEFS.replace("</defs>", '<linearGradient id="vt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F6FF"/><stop offset="1" stop-color="#C9D6FD"/></linearGradient></defs>'), ' stroke="#B9C9FC" stroke-width="2"')
print("ok")
