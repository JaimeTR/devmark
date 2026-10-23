# Marca DEVMARK

SVG vectoriales del isotipo y el logotipo nuevos (octubre 2026), redibujados sobre los originales.

| Archivo | Uso |
|---|---|
| `devmark-logotipo.svg` | Principal, sobre fondo claro. |
| `devmark-logotipo-sin-lema.svg` | Cuando el lema no se lee (tamaños chicos, cabeceras). |
| `devmark-logotipo-fondo-oscuro.svg` | Sobre tinta o fotos oscuras. |
| `devmark-logotipo-blanco.svg` | Sobre índigo o un color de marca. |
| `devmark-logotipo-tinta.svg` | Una sola tinta (impresión, sellos). |
| `devmark-logotipo-vidrio.svg` | Efecto vidrio, sobre fondos oscuros o fotos. |
| `devmark-isotipo*.svg` | El símbolo solo: color, blanco (tonal y sólido), tinta y vidrio. |

Colores: tinta `#010F35`, azul eléctrico `#0039FB` / `#0132FC`, azul medio `#0C70FD` / `#0165FC`, azul claro `#9AB3FA`, lema `#12214F`.

Tipografía: el nombre es Braze (ajustada al ancho del original); el lema es Michroma (licencia OFL). En los SVG el texto ya está convertido a trazos: no hace falta instalar las fuentes.

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
