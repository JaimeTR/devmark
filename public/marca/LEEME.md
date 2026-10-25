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

Logotipo propio de la tienda, de la misma familia que la agencia: el isotipo convertido en bolsa (con asa), DEVMARK y debajo STORE con el lema "Tecnología con IA".

| Archivo | Uso |
|---|---|
| `tienda/devmarkstore-logotipo.svg` | Principal, sobre fondo claro. |
| `tienda/devmarkstore-logotipo-sin-lema.svg` | Barra de la tienda y tamaños chicos. |
| `tienda/devmarkstore-logotipo-fondo-oscuro.svg` (y `-sin-lema-`) | Sobre tinta o fotos oscuras. |
| `tienda/devmarkstore-logotipo-blanco.svg` | Sobre índigo o un color de marca. |
| `tienda/devmarkstore-logotipo-tinta.svg` | Una sola tinta. |
| `tienda/devmarkstore-isotipo*.svg` | La bolsa sola: color, blanco tonal y tinta (favicon, redes). |

Para regenerar: `python3 scripts/marca/generar-logo-tienda.py public/marca/tienda`.
