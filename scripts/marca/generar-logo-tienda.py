# Uso: pip install fonttools && python3 scripts/marca/generar-logo-tienda.py public/marca/tienda
"""Logotipo de DevmarkPE Store: el isotipo de la agencia convertido en bolsa (con asa),
DEVMARK y debajo STORE con el lema "Tecnologia con IA". Reutiliza la geometria y las
fuentes de generar-logo.py para que las dos marcas sean de la misma familia."""
import os, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
_src = open(os.path.join(AQUI, "generar-logo.py")).read()
_src = _src[: _src.index("# ------------------------------------------------------------- archivos ---")]
_ns = {"__file__": os.path.join(AQUI, "generar-logo.py")}
exec(_src, _ns)
redondeado, f = _ns["redondeado"], _ns["f"]
OSCURA, MEDIA, CLARA, MEDIA_Y_CLARA = _ns["OSCURA"], _ns["MEDIA"], _ns["CLARA"], _ns["MEDIA_Y_CLARA"]
texto, ancho_letras, MICHROMA = _ns["texto"], _ns["ancho_letras"], _ns["MICHROMA"]
INK, AZUL, MEDIO, CLARO, M_COLOR, ARK_COLOR, LEMA = (_ns[k] for k in ("INK", "AZUL", "MEDIO", "CLARO", "M_COLOR", "ARK_COLOR", "LEMA"))
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

# ----------------------------------------------------------- isotipo bolsa ---
# Asa: arco con puntas redondas sobre el hueco del isotipo (coordenadas del original de 1254 px).
ASA = (420, 790, 215, 80)  # x inicial, x final, y de apoyo, grosor

def asa(color):
    x0, x1, y, g = ASA
    r = (x1 - x0) / 2
    return f'<path d="M{x0} {y}V{y - 40}A{f(r)} {f(r)} 0 0 1 {x1} {y - 40}V{y}" fill="none" stroke="{color}" stroke-width="{g}" stroke-linecap="round"/>'

def bolsa(c):
    """c = (pieza oscura y asa, media, clara). Si media == clara se dibujan como una sola pieza."""
    partes = [(OSCURA, c[0])] + ([(MEDIA_Y_CLARA, c[1])] if c[1] == c[2] else [(MEDIA, c[1]), (CLARA, c[2])])
    return asa(c[0]) + "".join(f'<path d="{redondeado(p)}" fill="{col}"/>' for p, col in partes)

BOLSA_VB = (110, -152, 1012, 1261)  # incluye el asa
BOLSA_ALTO = BOLSA_VB[3]

# ------------------------------------------------------------------ texto ---
def nombre(x, base, cap, t):
    sx, hueco, trazo = 1.12, cap * 0.06, 6
    a, w1 = texto("DEV", x, base, cap, sx, hueco, trazo, t["dev"])
    b, w2 = texto("M", x + w1 + hueco, base, cap, sx, hueco, trazo, t["m"])
    c, w3 = texto("ARK", x + w1 + w2 + 2 * hueco, base, cap, sx, hueco, trazo, t["ark"])
    return a + b + c, w1 + w2 + w3 + 2 * hueco

def espaciado(cadena, x, base, alto, ancho, color, trazo):
    letras = [c for c in cadena if c != " "]
    esp = cadena.count(" ")
    hueco = (ancho - ancho_letras(cadena, alto, 1.0, trazo, MICHROMA)) / (len(letras) - 1 + esp * 2)
    return texto(cadena, x, base, alto, 1.0, hueco, trazo, color, hueco_espacio=hueco * 2, fu=MICHROMA)[0]

def logotipo(t, con_lema=True):
    alto = 260.0
    s = alto / BOLSA_ALTO
    iso = f'<g transform="scale({f(s)}) translate({-BOLSA_VB[0]} {-BOLSA_VB[1]})">{bolsa(t["iso"])}</g>'
    tx = BOLSA_VB[2] * s + 40
    n, wn = nombre(tx, 150, 120, t)
    cuerpo = iso + n + espaciado("STORE", tx, 214, 44, wn * 0.36, t["store"], 4.2)
    if con_lema:
        cuerpo += espaciado("TECNOLOGIA CON IA", tx + wn * 0.42, 210, 20, wn * 0.58, t["lema"], 2.4)
    w = tx + wn + 6
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 {f(w + 8)} {f(alto + 8)}" role="img" aria-label="DevmarkPE Store"><title>DevmarkPE Store</title>{cuerpo}</svg>\n'

def isotipo(c):
    x, y, w, h = BOLSA_VB
    lado = max(w, h)
    x -= (lado - w) / 2
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x - 8)} {f(y - 8)} {f(lado + 16)} {f(lado + 16)}" role="img" aria-label="DevmarkPE Store"><title>DevmarkPE Store</title>{bolsa(c)}</svg>\n'

COLOR = {"iso": (AZUL, MEDIO, CLARO), "dev": INK, "m": M_COLOR, "ark": ARK_COLOR, "store": M_COLOR, "lema": LEMA}
OSCURO = {"iso": (AZUL, MEDIO, CLARO), "dev": "#FFFFFF", "m": "#3D8BFF", "ark": "#5B7BFF", "store": "#A9B4FF", "lema": "#B4B1D6"}
TONAL = ("rgba(255,255,255,1)", "rgba(255,255,255,0.78)", "rgba(255,255,255,0.5)")
BLANCO = {"iso": TONAL, "dev": "#FFFFFF", "m": "#FFFFFF", "ark": "#FFFFFF", "store": "#FFFFFF", "lema": "#FFFFFF"}
TINTA = {"iso": (INK, INK, INK), "dev": INK, "m": INK, "ark": INK, "store": INK, "lema": INK}

archivos = {
    "devmarkstore-logotipo.svg": logotipo(COLOR),
    "devmarkstore-logotipo-sin-lema.svg": logotipo(COLOR, False),
    "devmarkstore-logotipo-fondo-oscuro.svg": logotipo(OSCURO),
    "devmarkstore-logotipo-sin-lema-fondo-oscuro.svg": logotipo(OSCURO, False),
    "devmarkstore-logotipo-blanco.svg": logotipo(BLANCO),
    "devmarkstore-logotipo-tinta.svg": logotipo(TINTA),
    "devmarkstore-isotipo.svg": isotipo((AZUL, MEDIO, CLARO)),
    "devmarkstore-isotipo-blanco.svg": isotipo(TONAL),
    "devmarkstore-isotipo-tinta.svg": isotipo((INK, INK, INK)),
}
for nombre_archivo, contenido in archivos.items():
    open(os.path.join(OUT, nombre_archivo), "w").write(contenido)
print("ok")
