# Marca DEVMARK (juego definitivo, octubre 2026)

SVG vectoriales del isotipo y el logotipo, en los colores de devmarkpe.com. En todas las versiones el
isotipo se alinea con el texto: arriba con las mayúsculas de DEVMARK y abajo con el lema (o con la base
de DEVMARK en las versiones sin lema). Cada logotipo tiene su versión `-sin-lema` para tamaños chicos.

| Archivo | Uso |
|---|---|
| `devmark-logotipo.svg` | **Principal**, sobre fondo claro: isotipo en tres tonos de índigo, DEV en tinta, MARK en índigo. |
| `devmark-logotipo-fondo-oscuro.svg` | La principal sobre tinta o fotos oscuras. |
| `devmark-logotipo-cabecera.svg` | Encabezado de la web: isotipo índigo entero y todo el texto en blanco, sobre oscuro. |
| `devmark-logotipo-indigo.svg` | Todo en el índigo de los botones, sobre fondo claro. |
| `devmark-logotipo-blanco.svg` | Todo en blanco, sobre índigo, tinta o fotos. |
| `devmark-logotipo-oscuro.svg` | Todo en tinta, sobre fondos claros (impresión a una tinta, sellos). |
| `devmark-isotipo.svg` (y `-indigo`, `-blanco`, `-oscuro`) | El símbolo solo (redes, favicon, avatar). |

Colores (de `tailwind.config.ts`): índigo `#3D34BC` (botones), índigo claro `#5B53D0`, periwinkle `#A9B4FF`,
tinta `#110C29`, navy `#35347B` (lema) y `#B4B1D6` (lema sobre oscuro).

Tipografía: el nombre es Braze (ajustada al ancho del original); el lema es Michroma (licencia OFL). En
los SVG el texto ya está convertido a trazos: no hace falta instalar las fuentes.

Para regenerar: `pip install fonttools && python3 scripts/marca/generar-logo.py public/marca`.

## DevmarkPE Store (`tienda/`)

Logotipo propio de la tienda, de la misma familia y con los mismos colores que la agencia: el isotipo
convertido en bolsa (con asa), DEVMARK y debajo STORE, una línea fina y el lema "Tecnología con IA".
La bolsa, con su asa, se alinea arriba con DEVMARK y abajo con STORE, y el lema termina donde termina
DEVMARK. La versión `-sin-lema` deja solo STORE debajo.

| Archivo | Uso |
|---|---|
| `tienda/devmarkstore-logotipo.svg` | **Principal**, sobre fondo claro. |
| `tienda/devmarkstore-logotipo-fondo-oscuro.svg` | La principal sobre tinta o fotos oscuras (pie de la tienda). |
| `tienda/devmarkstore-logotipo-cabecera.svg` | Barra de la tienda sobre oscuro: bolsa índigo y todo el texto en blanco. |
| `tienda/devmarkstore-logotipo-indigo.svg` / `-blanco` / `-oscuro` | Una sola tinta. |
| `tienda/devmarkstore-isotipo.svg` (y `-indigo`, `-blanco`, `-oscuro`) | La bolsa sola (favicon en índigo, redes). |

Cada logotipo tiene su versión `-sin-lema`. Para regenerar: `python3 scripts/marca/generar-logo-tienda.py public/marca/tienda`.
