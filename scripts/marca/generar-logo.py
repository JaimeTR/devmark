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
# Indigo de los botones de devmarkpe.com (--primary: hsl(244 57% 47%)).
INDIGO = "#3D34BC"

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

# ------------------------------------------------- juego definitivo (2026) ---
# Colores de devmarkpe.com (tailwind.config.ts y globals.css). El azul electrico del logo original
# queda solo en la tienda (generar-logo-tienda.py).
WEB_INDIGO = "#3D34BC"      # --primary, el de los botones
WEB_INDIGO_CLARO = "#5B53D0"  # brand.blue-dark: hsl(244 57% 57%)
WEB_PERIWINKLE = "#A9B4FF"
WEB_TINTA = "#110C29"       # ink
WEB_NAVY = "#35347B"        # brand.navy
WEB_INK_MUTED = "#B4B1D6"   # ink.muted
BLANCO = ("#FFFFFF", "#FFFFFF", "#FFFFFF")
ISO_MARCA = (WEB_INDIGO, WEB_INDIGO_CLARO, WEB_PERIWINKLE)
uno = lambda c: (c, c, c)

# Isotipo cuadrado con margen interno minimo.
ix0, iy0, ix1, iy1 = ISO_BBOX
pad = 8
iso_vb = (ix0 - pad, iy0 - pad, ix1 - ix0 + 2 * pad, iy1 - iy0 + 2 * pad)
def iso_svg(colores, titulo, defs="", extra=""):
    x, y, w, h = iso_vb
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x)} {f(y)} {f(w)} {f(h)}" role="img" aria-label="{titulo}"><title>{titulo}</title>{defs}{iso_grupo(colores, extra=extra)}</svg>\n'

# Logotipo horizontal, en pixeles del original (2000 x 667) restando su esquina (81, 185):
# isotipo 305 x 288, nombre de x=429 a 1920 con mayusculas de 160 (y 237-397),
# lema de 28 de alto (y 438-466) a lo ancho de x=428 a 1906.
OX, OY = 81, 185
def logotipo(tonos, con_lema=True, defs="", extra_iso="", extra_txt=""):
    cap_h, trazo = 160.0, 6.0
    # El isotipo se alinea con el texto arriba y abajo: arriba con las mayusculas de DEVMARK y abajo
    # con el lema (o con la base de DEVMARK si no hay lema). Separaciones del original (2000 x 667):
    # nombre y = 237-397, lema y = 438-466, hueco isotipo-nombre 43 a la escala del isotipo de 288.
    base = cap_h
    lema_base = (466 - 237) if con_lema else None
    iso_alto = lema_base if con_lema else cap_h
    tx = (ix1 - ix0) * iso_alto / (iy1 - iy0) + 43 * iso_alto / 288
    s_iso = iso_alto / (iy1 - iy0)
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
        l_svg, _ = texto(lema, tx - 1, lema_base, lh, 1.0, hueco_l, lt, tonos["lema"], hueco_espacio=hueco_l * 2, extra=extra_txt, fu=MICHROMA)
        cuerpo += l_svg
    ancho = tx + ancho_nombre + trazo
    return ancho, alto, cuerpo, defs

def guardar_logo(nombre, tonos, con_lema=True, defs="", extra_iso="", extra_txt=""):
    w, h, cuerpo, defs = logotipo(tonos, con_lema, defs, extra_iso, extra_txt)
    m = 4
    guardar(nombre, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(-m)} {f(-m)} {f(w + 2 * m)} {f(h + 2 * m)}" role="img" aria-label="DEVMARK, agencia de desarrollo web y software"><title>DEVMARK</title>{defs}{cuerpo}</svg>\n')

VERSIONES = {
    # Principal, sobre fondo claro: isotipo en tres tonos de indigo, DEV en tinta, MARK en indigo.
    "": {"iso": ISO_MARCA, "dev": WEB_TINTA, "m": WEB_INDIGO_CLARO, "ark": WEB_INDIGO, "lema": WEB_NAVY},
    # Principal sobre fondo oscuro (tinta o fotos).
    "-fondo-oscuro": {"iso": ISO_MARCA, "dev": "#FFFFFF", "m": WEB_PERIWINKLE, "ark": "#8C85EE", "lema": WEB_INK_MUTED},
    # Encabezado de devmarkpe.com: isotipo indigo entero y todo el texto en blanco.
    "-cabecera": {"iso": uno(WEB_INDIGO), "dev": "#FFFFFF", "m": "#FFFFFF", "ark": "#FFFFFF", "lema": "#FFFFFF"},
    # Una sola tinta.
    "-indigo": {"iso": uno(WEB_INDIGO), "dev": WEB_INDIGO, "m": WEB_INDIGO, "ark": WEB_INDIGO, "lema": WEB_INDIGO},
    "-blanco": {"iso": BLANCO, "dev": "#FFFFFF", "m": "#FFFFFF", "ark": "#FFFFFF", "lema": "#FFFFFF"},
    "-oscuro": {"iso": uno(WEB_TINTA), "dev": WEB_TINTA, "m": WEB_TINTA, "ark": WEB_TINTA, "lema": WEB_TINTA},
}

for sufijo, tonos in VERSIONES.items():
    guardar_logo(f"devmark-logotipo{sufijo}.svg", tonos)
    guardar_logo(f"devmark-logotipo{sufijo}-sin-lema.svg", tonos, False)

guardar("devmark-isotipo.svg", iso_svg(ISO_MARCA, "DEVMARK"))
guardar("devmark-isotipo-indigo.svg", iso_svg(uno(WEB_INDIGO), "DEVMARK"))
guardar("devmark-isotipo-blanco.svg", iso_svg(BLANCO, "DEVMARK"))
guardar("devmark-isotipo-oscuro.svg", iso_svg(uno(WEB_TINTA), "DEVMARK"))
print("ok")
