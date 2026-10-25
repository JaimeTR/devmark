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
texto, ancho_letras, MICHROMA, BRAZE, caja = _ns["texto"], _ns["ancho_letras"], _ns["MICHROMA"], _ns["BRAZE"], _ns["caja"]
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

# Caja exacta de la bolsa (asa incluida) en coordenadas del original de 1254 px: el asa llega a
# y = 175 - 185 - 40 (radio y medio trazo) = -50 y el cuerpo baja hasta 1101.
BOLSA = (118, -50, 996, 1151)
# Cuerpo de la bolsa sin el asa (el isotipo de la agencia): es lo que se alinea con el texto.
CUERPO = (118, 173, 996, 928)

# ------------------------------------------------------------------ texto ---
# DEVMARK con las mismas proporciones que el logotipo de la agencia (generar-logo.py): mayusculas de
# 160, la D de 203 de ancho y el nombre de 1491 de ancho. La segunda linea (STORE y el lema) va
# 41 por debajo, como el lema de la agencia, con 40 de alto.
CAP, TRAZO = 160.0, 6.0
SX = (203 - TRAZO) / ((caja("D")[2] - caja("D")[0]) * (CAP - TRAZO) / BRAZE.cap)
ANCHO_NOMBRE = 1491.0
HUECO = (ANCHO_NOMBRE - ancho_letras("DEVMARK", CAP, SX, TRAZO)) / 6
FILA2_ALTO, FILA2_GAP = 40.0, 41.0
ALTO = CAP + FILA2_GAP + FILA2_ALTO
LEMA = "TECNOLOGÍA CON IA"

def nombre(x, t):
    a, w1 = texto("DEV", x, CAP, CAP, SX, HUECO, TRAZO, t["dev"])
    b, w2 = texto("M", x + w1 + HUECO, CAP, CAP, SX, HUECO, TRAZO, t["m"])
    c, _ = texto("ARK", x + w1 + w2 + 2 * HUECO, CAP, CAP, SX, HUECO, TRAZO, t["ark"])
    return a + b + c

def con_tracking(cadena, x, base, alto, tracking, color, trazo):
    """Texto en Michroma con un espaciado fijo (fraccion del alto); entre palabras, el triple."""
    hueco = alto * tracking
    svg, ancho = texto(cadena, x, base, alto, 1.0, hueco, trazo, color, hueco_espacio=hueco * 2, fu=MICHROMA)
    return svg, ancho

def ancho_tracking(cadena, alto, tracking, trazo):
    letras = [c for c in cadena if c != " "]
    return ancho_letras(cadena, alto, 1.0, trazo, MICHROMA) + alto * tracking * (len(letras) - 1 + cadena.count(" ") * 2)

def logotipo(t, con_lema=True):
    # El cuerpo de la bolsa mide lo mismo que el bloque de texto (arriba con DEVMARK, abajo con STORE),
    # como el isotipo de la agencia; el asa sobresale hacia arriba y distingue a la tienda.
    bx, by, bw, bh = CUERPO
    s = ALTO / bh
    asa_alto = (by - BOLSA[1]) * s
    iso = f'<g transform="scale({f(s)}) translate({f(-bx)} {f(-by)})">{bolsa(t["iso"])}</g>'
    tx = bw * s + 43 * ALTO / 288
    base2 = ALTO
    cuerpo = iso + nombre(tx, t)
    # STORE con el espaciado de un rotulo (0,32 de su alto). Con lema, a su derecha una linea fina y
    # el lema, con el alto justo para terminar donde termina DEVMARK y centrado en el alto de STORE.
    st_svg, w_store = con_tracking("STORE", tx, base2, FILA2_ALTO, 0.32, t["store"], 4.6)
    cuerpo += st_svg
    if con_lema:
        sep = FILA2_ALTO * 0.7
        x_linea = tx + w_store + sep
        x_lema = x_linea + sep
        disponible = tx + ANCHO_NOMBRE - x_lema
        # Espaciado de rotulo (0,3 del alto) y el alto justo para que el lema termine donde termina
        # DEVMARK; si saliera mas alto que 0,8 de STORE, se queda en ese alto y abre un poco el espaciado.
        lt = 2.8
        letras = [c for c in LEMA if c != " "]
        unidades = len(letras) - 1 + LEMA.count(" ") * 2
        lh = (disponible - lt * len(letras)) / (ancho_letras(LEMA, 1.0, 1.0, 0, MICHROMA) + 0.3 * unidades)
        lh = min(lh, FILA2_ALTO * 0.8)
        tracking = (disponible - ancho_letras(LEMA, lh, 1.0, lt, MICHROMA)) / (lh * unidades)
        cuerpo += f'<rect x="{f(x_linea - 1.5)}" y="{f(base2 - FILA2_ALTO)}" width="3" height="{f(FILA2_ALTO)}" rx="1.5" fill="{t["lema"]}" opacity="0.5"/>'
        cuerpo += con_tracking(LEMA, x_lema, base2 - (FILA2_ALTO - lh) / 2, lh, tracking, t["lema"], lt)[0]
    w = tx + ANCHO_NOMBRE + TRAZO
    titulo = "DevmarkPE Store, tecnología con IA"
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 {f(-asa_alto - 4)} {f(w + 8)} {f(ALTO + asa_alto + 8)}" role="img" aria-label="{titulo}"><title>DevmarkPE Store</title>{cuerpo}</svg>\n'

def isotipo(c):
    x, y, w, h = BOLSA
    lado = max(w, h)
    x -= (lado - w) / 2
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x - 8)} {f(y - 8)} {f(lado + 16)} {f(lado + 16)}" role="img" aria-label="DevmarkPE Store"><title>DevmarkPE Store</title>{bolsa(c)}</svg>\n'

# ------------------------------------------------- juego definitivo (2026) ---
# Los mismos colores de devmarkpe.com que el logotipo de la agencia.
INDIGO, INDIGO_CLARO, PERIWINKLE, TINTA, NAVY, INK_MUTED = "#3D34BC", "#5B53D0", "#A9B4FF", "#110C29", "#35347B", "#B4B1D6"
ISO = (INDIGO, INDIGO_CLARO, PERIWINKLE)
uno = lambda c: (c, c, c)
todo = lambda c, iso=None: {"iso": iso or uno(c), "dev": c, "m": c, "ark": c, "store": c, "lema": c}

VERSIONES = {
    "": {"iso": ISO, "dev": TINTA, "m": INDIGO_CLARO, "ark": INDIGO, "store": INDIGO, "lema": NAVY},
    "-fondo-oscuro": {"iso": ISO, "dev": "#FFFFFF", "m": PERIWINKLE, "ark": "#8C85EE", "store": PERIWINKLE, "lema": INK_MUTED},
    "-cabecera": {**todo("#FFFFFF"), "iso": uno(INDIGO)},
    "-indigo": todo(INDIGO),
    "-blanco": todo("#FFFFFF"),
    "-oscuro": todo(TINTA),
}

os.makedirs(OUT, exist_ok=True)
for viejo in os.listdir(OUT):
    if viejo.startswith("devmarkstore-") and viejo.endswith(".svg"):
        os.remove(os.path.join(OUT, viejo))
archivos = {}
for sufijo, tonos in VERSIONES.items():
    archivos[f"devmarkstore-logotipo{sufijo}.svg"] = logotipo(tonos)
    archivos[f"devmarkstore-logotipo{sufijo}-sin-lema.svg"] = logotipo(tonos, False)
archivos["devmarkstore-isotipo.svg"] = isotipo(ISO)
archivos["devmarkstore-isotipo-indigo.svg"] = isotipo(uno(INDIGO))
archivos["devmarkstore-isotipo-blanco.svg"] = isotipo(uno("#FFFFFF"))
archivos["devmarkstore-isotipo-oscuro.svg"] = isotipo(uno(TINTA))
for nombre_archivo, contenido in archivos.items():
    open(os.path.join(OUT, nombre_archivo), "w").write(contenido)
print("ok")
