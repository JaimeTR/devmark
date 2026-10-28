import type { Post } from './blog-posts';
import { cierre, nota } from './blog-nuevos-comun';

const AUTOR = 'Jaime Tarazona';

export const postsNuevosEs: Post[] = [
  {
    slug: 'cuanto-cuesta-pagina-web-peru',
    title: 'Cuánto cuesta una página web en Perú: precios y qué incluye (2026)',
    description: 'Una web a medida en DEVMARK parte desde S/ 800. Mira qué cambia el precio de una página web en Perú, qué rangos se ven en el mercado y cómo comparar cotizaciones.',
    date: '2026-10-27',
    author: AUTOR,
    image: '/illustrations/programming.svg',
    imageHint: 'precios de páginas web en Perú',
    tags: ['Paginas Web', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> en DEVMARK una página web a medida parte desde <strong>S/ 800</strong> (1 a 3 páginas) y una web corporativa de hasta 8 páginas desde <strong>S/ 2500</strong>. En el mercado peruano se ven desde unos cientos de soles para webs muy simples hasta varios miles para sitios corporativos, y bastante más para plataformas a medida. El monto final depende del alcance, la complejidad y los plazos.</p>
        <h2>Precios de una página web en Perú según el tipo</h2>
        <table><thead><tr><th>Tipo de web</th><th>Desde en DEVMARK</th><th>Rango orientativo de mercado</th><th>Para quién</th></tr></thead><tbody>
        <tr><td>Web básica (1 a 3 páginas)</td><td>S/ 800</td><td>Desde unos S/ 500 hasta cerca de S/ 1500</td><td>Quien empieza y necesita presencia y un formulario de contacto</td></tr>
        <tr><td>Web corporativa (hasta 8 páginas, blog)</td><td>S/ 2500</td><td>Entre unos S/ 1500 y S/ 5000</td><td>Negocios que ya venden y quieren captar clientes por Google</td></tr>
        <tr><td>Web con CMS administrable</td><td>S/ 1500</td><td>Entre unos S/ 1500 y S/ 4000</td><td>Quien quiere editar textos y fotos sin pedir ayuda</td></tr>
        <tr><td>Plataforma o tienda a medida</td><td>A medida</td><td>Desde varios miles de soles, sin techo claro</td><td>Reservas, pagos, paneles, integraciones</td></tr>
        </tbody></table>
        ${nota('es')}
        <h2>Qué hace subir o bajar el precio</h2>
        <ul>
          <li><strong>Páginas y secciones:</strong> más páginas, más diseño y más contenido que preparar.</li>
          <li><strong>Diseño propio o plantilla:</strong> un diseño a medida lleva más horas que adaptar una plantilla.</li>
          <li><strong>Funciones:</strong> pagos, reservas, áreas privadas, integración con tu CRM o con WhatsApp.</li>
          <li><strong>Administración de contenido:</strong> si quieres editar tú mismo, hace falta un CMS o un panel.</li>
          <li><strong>SEO de base:</strong> URLs limpias, velocidad, metadatos y datos estructurados. Pregunta si va incluido.</li>
          <li><strong>Plazos:</strong> la urgencia suele encarecer, porque desplaza otros trabajos.</li>
        </ul>
        <h2>Lo que se paga aparte, cada año o cada mes</h2>
        <p>La cotización de la web no suele incluir todo. Revisa estas partidas: el <a href="/blog/cuanto-cuesta-hosting-peru">hosting y el dominio</a>, el <a href="/blog/cuanto-cuesta-mantenimiento-web-mensual-peru">mantenimiento mensual</a>, el <a href="/blog/cuanto-cuesta-seo-mensual-peru">SEO</a> si quieres que te encuentren, y los plugins o licencias de pago si tu web los usa.</p>
        <h2>Cómo comparar cotizaciones sin perderte</h2>
        <ol>
          <li>Pide que cada propuesta liste páginas, funciones y entregables. Si dice solo «web profesional», no se puede comparar.</li>
          <li>Pregunta quién es el dueño del dominio, del hosting y del código al terminar.</li>
          <li>Confirma si el monto incluye IGV y qué pasa con las renovaciones.</li>
          <li>Pregunta quién te atiende después de entregar la web y cuánto cuesta ese soporte.</li>
          <li>Revisa trabajos anteriores en el <a href="/portfolio">portafolio</a> y habla con quien va a diseñar tu proyecto, no solo con quien vende.</li>
        </ol>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cuesta una landing page en Perú?</h3>
        <p>Una web básica de 1 a 3 páginas parte desde S/ 800 en DEVMARK. En el mercado se ven propuestas desde unos cientos de soles, pero conviene mirar qué incluyen.</p>
        <h3>¿La web incluye hosting y dominio?</h3>
        <p>Depende de la cotización. Pídelo por escrito. Somos socios de Hostinger y con el código DEVMARKPE tienes descuento.</p>
        <h3>¿Es mejor una plantilla o una web a medida?</h3>
        <p>Una plantilla sirve para empezar rápido y con poco presupuesto. Una web a medida conviene cuando necesitas diferenciarte, velocidad o funciones propias.</p>
        <h3>¿Puedo ver el precio exacto antes de escribir?</h3>
        <p>Sí, a modo de referencia: arriba están los precios «desde». Para tu caso, el cotizador con IA te entrega una propuesta en PDF al momento.</p>
        ${cierre('es', 'web', 'Hola DEVMARK, leí cuánto cuesta una página web en Perú y quiero cotizar mi web.')}
      `,
  },
  {
    slug: 'cuanto-cuesta-tienda-virtual-peru',
    title: 'Cuánto cuesta una tienda virtual en Perú: desarrollo y costos de operar',
    description: 'Una tienda con CMS en DEVMARK parte desde S/ 1500. Qué incluye el costo de una tienda virtual en Perú, qué se paga cada mes y cuándo conviene una a medida.',
    date: '2026-10-26',
    author: AUTOR,
    image: '/portfolio/ecommerce-global.jpg',
    imageHint: 'precio de una tienda virtual en Perú',
    tags: ['E-commerce', 'Tienda Online', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> una tienda o sitio con CMS administrable parte desde <strong>S/ 1500</strong> en DEVMARK, y desde <strong>S/ 3200</strong> si necesitas más páginas, blog e integraciones. Una tienda a medida, con pagos y funciones propias, se cotiza según el caso. Aparte vienen los costos de operar: pasarela de pago, hosting, dominio y mantenimiento.</p>
        <h2>Tres caminos y cuánto cuestan</h2>
        <table><thead><tr><th>Camino</th><th>Costo de arranque</th><th>Lo que se paga después</th><th>Conviene cuando…</th></tr></thead><tbody>
        <tr><td>Plataforma por suscripción (Shopify, Tiendanube y similares)</td><td>Configuración y diseño; la plataforma cobra por mes</td><td>Suscripción mensual, que según lo que se ve en el mercado parte en unas decenas de dólares, más comisiones</td><td>Quieres salir rápido y vender un catálogo estándar</td></tr>
        <tr><td>Tienda con CMS (por ejemplo WordPress con WooCommerce)</td><td>Desde S/ 1500 en DEVMARK</td><td>Hosting, mantenimiento y plugins de pago</td><td>Quieres controlar tu catálogo, tu contenido y tus costos</td></tr>
        <tr><td>Tienda a medida</td><td>A medida; en el mercado se ve desde varios miles de soles</td><td>Hosting y mantenimiento</td><td>Tienes reglas de precio, stock o pedidos que una plantilla no cubre</td></tr>
        </tbody></table>
        ${nota('es')}
        <h2>Lo que casi nadie suma al presupuesto</h2>
        <ul>
          <li><strong>Pasarela de pago:</strong> cada una cobra su comisión por venta. Pide la tarifa vigente al proveedor antes de decidir.</li>
          <li><strong>Fotos y fichas de producto:</strong> cargar y redactar el catálogo toma tiempo, o cuesta si lo delegas.</li>
          <li><strong>Hosting, dominio y certificado SSL:</strong> mira la guía de <a href="/blog/cuanto-cuesta-hosting-peru">cuánto cuesta el hosting en Perú</a>.</li>
          <li><strong>Mantenimiento:</strong> una tienda que no se actualiza se vuelve lenta y vulnerable. Consulta el <a href="/blog/cuanto-cuesta-mantenimiento-web-mensual-peru">costo del mantenimiento mensual</a>.</li>
          <li><strong>Logística:</strong> envíos, empaque y devoluciones.</li>
          <li><strong>Tráfico:</strong> una tienda sin visitas no vende. Piensa en SEO o publicidad desde el primer mes.</li>
        </ul>
        <h2>Cómo decidir sin gastar de más</h2>
        <p>Si vendes menos de unos pocos cientos de productos y tu catálogo es estándar, una tienda con CMS suele alcanzar. Pasa a una a medida cuando tengas reglas propias (precios por cliente, cotizaciones, conexión con tu sistema de inventario). Antes de comprometerte, define cuántos productos tendrás, qué medios de pago aceptarás y cómo harás los envíos. Con eso cualquier agencia puede cotizarte con precisión.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cuesta una tienda virtual básica en Perú?</h3>
        <p>En DEVMARK, una tienda con CMS parte desde S/ 1500. El monto final cambia con la cantidad de productos, las integraciones y los plazos.</p>
        <h3>¿Puedo aceptar Yape o tarjetas?</h3>
        <p>Sí, se integran pasarelas de pago. Cada pasarela tiene sus condiciones y comisiones; las revisamos contigo al cotizar.</p>
        <h3>¿Shopify o WooCommerce?</h3>
        <p>Shopify es rápido de lanzar pero depende de una suscripción. WooCommerce da más control, a cambio de más mantenimiento. Lo vemos según tu catálogo y tu presupuesto.</p>
        <h3>¿Quién actualiza los productos?</h3>
        <p>Tú, desde un panel sencillo. Si prefieres delegarlo, se acuerda aparte.</p>
        ${cierre('es', 'cms', 'Hola DEVMARK, leí cuánto cuesta una tienda virtual en Perú y quiero cotizar mi tienda.')}
      `,
  },
  {
    slug: 'cuanto-cuesta-seo-mensual-peru',
    title: 'Cuánto cuesta el SEO mensual en Perú: qué incluye cada nivel',
    description: 'El SEO en DEVMARK parte desde S/ 300 al mes. Qué incluye cada nivel, qué rangos se ven en Lima y cómo detectar propuestas que no llevan trabajo real.',
    date: '2026-10-25',
    author: AUTOR,
    image: '/undraw_web-devices_i15y.svg',
    imageHint: 'precio del SEO mensual en Perú',
    tags: ['SEO', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> el SEO mensual en DEVMARK parte desde <strong>S/ 300 al mes</strong> (SEO local básico), pasa a <strong>S/ 600</strong> con contenido y SEO técnico, y a <strong>S/ 1200</strong> para mercados competitivos, con optimización GEO incluida. Según lo que se ve en el mercado peruano, las agencias para pymes en Lima suelen moverse desde algo más de S/ 1000 hasta varios miles de soles al mes. La diferencia está en el alcance, no en un precio «correcto».</p>
        <h2>Qué incluye cada nivel en DEVMARK</h2>
        <table><thead><tr><th>Nivel</th><th>Desde</th><th>Incluye</th></tr></thead><tbody>
        <tr><td>Emprendedor</td><td>S/ 300 al mes</td><td>Optimización on-page, perfil de Google, configuración de Search Console, reporte mensual básico</td></tr>
        <tr><td>Negocio</td><td>S/ 600 al mes</td><td>Lo anterior, más investigación de palabras clave, 2 artículos optimizados al mes, SEO técnico básico y link building básico</td></tr>
        <tr><td>Empresa</td><td>S/ 1200 al mes</td><td>Lo anterior, más 4 artículos al mes, SEO técnico avanzado, link building de calidad y optimización GEO</td></tr>
        </tbody></table>
        ${nota('es')}
        <h2>Por qué ves precios tan distintos</h2>
        <ul>
          <li><strong>Competencia de tu sector:</strong> posicionar una clínica o un estudio legal en Lima es más duro que un oficio con poca oferta online.</li>
          <li><strong>Tamaño de tu web:</strong> cuántas páginas hay que optimizar y cuánto contenido nuevo hace falta.</li>
          <li><strong>Estado técnico:</strong> una web lenta o mal estructurada pide una <a href="/blog/auditoria-seo-tecnica-que-revisar-en-tu-web">auditoría técnica</a> antes de cualquier otra cosa.</li>
          <li><strong>Contenido y enlaces:</strong> artículos y menciones en otras webs suman horas cada mes.</li>
          <li><strong>Mercado local o nacional:</strong> un negocio con una sede en Lima necesita menos que uno que quiere vender en todo el país.</li>
        </ul>
        <h2>Señales para desconfiar de una propuesta</h2>
        <ul>
          <li>Promete el primer lugar en Google o una fecha exacta. Nadie controla el algoritmo.</li>
          <li>No explica qué hará cada mes ni te da reporte.</li>
          <li>Te pide acceso total a tus cuentas sin dejarte propietario de ellas (Search Console, Analytics, perfil de Google).</li>
          <li>El precio es tan bajo que no cubre horas de trabajo reales.</li>
        </ul>
        <h2>Cuánto tarda en notarse</h2>
        <p>El SEO se mide en meses, no en días. Los primeros meses suelen ir a ordenar la base técnica y publicar contenido; el efecto en visitas y consultas aparece después y depende de tu sector. Por eso conviene fijar metas simples: consultas por WhatsApp, llamadas y formularios, no solo posiciones.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cuesta el SEO para una pyme en Lima?</h3>
        <p>En DEVMARK, desde S/ 300 al mes en SEO local básico. En el mercado se ven propuestas desde algo más de S/ 1000 hasta varios miles de soles al mes, según el alcance.</p>
        <h3>¿El SEO garantiza estar primero en Google?</h3>
        <p>No. Se trabaja para mejorar la visibilidad y las consultas, pero ningún proveedor serio promete una posición.</p>
        <h3>¿Qué es el GEO y está incluido?</h3>
        <p>Es optimizar tu web para que asistentes como ChatGPT, Gemini o Perplexity te citen. Va en el nivel Empresa; lo explicamos en <a href="/blog/que-es-geo-seo-para-ia-como-aparecer-en-chatgpt">qué es el GEO</a>.</p>
        <h3>¿Hay contrato de permanencia?</h3>
        <p>Lo acordamos al cotizar, según el alcance. Pregunta siempre por esto antes de firmar con cualquier agencia.</p>
        ${cierre('es', 'seo', 'Hola DEVMARK, leí cuánto cuesta el SEO mensual en Perú y quiero cotizar SEO para mi negocio.')}
      `,
  },
  {
    slug: 'cuanto-cuesta-mantenimiento-web-mensual-peru',
    title: 'Cuánto cuesta el mantenimiento web mensual en Perú',
    description: 'El mantenimiento web en DEVMARK parte desde S/ 60 al mes. Qué incluye, qué no, y por qué una web sin mantenimiento termina costando más.',
    date: '2026-10-24',
    author: AUTOR,
    image: '/illustrations/coding.svg',
    imageHint: 'mantenimiento web mensual en Perú',
    tags: ['Soporte', 'Mantenimiento', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> el mantenimiento web en DEVMARK parte desde <strong>S/ 60 al mes</strong> (plan Básico), sube a <strong>S/ 150</strong> con soporte proactivo y a <strong>S/ 300</strong> para webs críticas. Según lo que se ve en el mercado peruano, los planes van desde unas decenas de soles para sitios simples hasta varios cientos para webs con más piezas, y más aún para tiendas.</p>
        <h2>Qué incluye cada plan</h2>
        <table><thead><tr><th>Plan</th><th>Desde</th><th>Incluye</th></tr></thead><tbody>
        <tr><td>Básico</td><td>S/ 60 al mes</td><td>Actualizaciones de seguridad, copias de seguridad, monitoreo de disponibilidad, 1 hora de soporte técnico</td></tr>
        <tr><td>Profesional</td><td>S/ 150 al mes</td><td>Lo anterior, más 4 horas de soporte, cambios menores de contenido, optimización de velocidad y reporte mensual</td></tr>
        <tr><td>Empresa</td><td>S/ 300 al mes</td><td>Lo anterior, más 8 horas de soporte, monitoreo 24/7, respuesta inmediata y soporte telefónico</td></tr>
        </tbody></table>
        ${nota('es')}
        <h2>Qué hace el mantenimiento en la práctica</h2>
        <ul>
          <li><strong>Actualiza</strong> el sistema, los temas y los plugins antes de que una falla de seguridad los exponga.</li>
          <li><strong>Respalda</strong> tu web para poder restaurarla si algo sale mal.</li>
          <li><strong>Vigila</strong> que la web esté en línea y te avisa si se cae.</li>
          <li><strong>Corrige</strong> errores y atiende cambios pequeños.</li>
          <li><strong>Cuida la velocidad</strong>, que afecta ventas y posicionamiento. Mira <a href="/blog/web-lenta-pierde-ventas-core-web-vitals">por qué una web lenta pierde ventas</a>.</li>
        </ul>
        <h2>Lo que normalmente no incluye</h2>
        <p>Rediseños, secciones nuevas, funciones nuevas, campañas de SEO o contenido, y licencias de plugins de pago. Eso se cotiza aparte. Pregunta siempre cuántas horas de soporte van incluidas y qué pasa si te quedas corto.</p>
        <h2>Cuándo conviene pagarlo</h2>
        <p>Si tu web recibe consultas o ventas, conviene tener mantenimiento. Si es una página estática que casi no cambia, un plan básico puede bastar. Si tienes una tienda, el mantenimiento pesa más, porque hay pedidos y datos de clientes de por medio. Una web abandonada acumula actualizaciones pendientes, y el día que falla la reparación cuesta más que haberla cuidado.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cuesta mantener una página web al mes en Perú?</h3>
        <p>En DEVMARK, desde S/ 60 al mes. El monto final depende del tipo de web, su complejidad y el nivel de soporte que necesites.</p>
        <h3>¿Puedo contratar mantenimiento si mi web la hizo otra empresa?</h3>
        <p>Sí. Revisamos primero cómo está construida para decirte qué plan te conviene.</p>
        <h3>¿El hosting va incluido?</h3>
        <p>No necesariamente. Se cotiza aparte; mira <a href="/blog/cuanto-cuesta-hosting-peru">cuánto cuesta el hosting en Perú</a>.</p>
        <h3>¿Qué pasa si no hago mantenimiento?</h3>
        <p>Tu web sigue funcionando un tiempo, pero queda expuesta a fallas de seguridad, lentitud y errores que se acumulan.</p>
        ${cierre('es', 'cms', 'Hola DEVMARK, leí cuánto cuesta el mantenimiento web mensual y quiero un plan de soporte para mi web.', 'support')}
      `,
  },
  {
    slug: 'cuanto-cuesta-implementar-ia-pyme-peru',
    title: 'Cuánto cuesta implementar IA en una pyme peruana',
    description: 'Qué costos tiene usar inteligencia artificial en una pyme en Perú: herramientas, chatbots y automatizaciones. Precios desde en DEVMARK y cómo empezar sin gastar de más.',
    date: '2026-10-23',
    author: AUTOR,
    image: '/undraw_coding_joxb.svg',
    imageHint: 'costo de implementar inteligencia artificial en una pyme',
    tags: ['IA', 'Pymes', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> depende de qué quieras que haga la IA. Un chatbot básico en WhatsApp parte desde <strong>S/ 500</strong> en DEVMARK, un chatbot con IA entrenado con tu información desde <strong>S/ 2500</strong>, y automatizar un proceso desde <strong>S/ 1500</strong>. Según lo que se ve en el mercado peruano, los proyectos hechos por consultoras para un caso puntual se mueven entre unos miles y varias decenas de miles de soles. Lo que cambia el monto es el alcance.</p>
        <h2>Cuatro niveles de IA para una pyme</h2>
        <table><thead><tr><th>Nivel</th><th>Qué es</th><th>Desde en DEVMARK</th></tr></thead><tbody>
        <tr><td>1. Herramientas listas</td><td>Asistentes de IA por suscripción para redactar, resumir o analizar</td><td>No requiere desarrollo; la suscripción es el costo</td></tr>
        <tr><td>2. Chatbot</td><td>Atiende preguntas frecuentes por WhatsApp o tu web; con IA generativa, usa tu información</td><td>S/ 500 (flujos) y S/ 2500 (con IA)</td></tr>
        <tr><td>3. Automatización</td><td>Conecta tus herramientas para que los datos se muevan solos</td><td>S/ 1500 por un flujo; S/ 3500 hasta 3 flujos</td></tr>
        <tr><td>4. IA integrada a tu sistema</td><td>Asistente conectado a tu CRM, ERP o pedidos</td><td>A medida</td></tr>
        </tbody></table>
        ${nota('es')}
        <h2>Costos que se repiten cada mes</h2>
        <p>La IA no es solo el desarrollo inicial. Suma lo que se paga de forma recurrente: la plataforma de mensajería (por ejemplo, WhatsApp Business), el consumo del modelo de IA, que crece con el uso, y el mantenimiento. Pídelos desglosados en la cotización para que no haya sorpresas.</p>
        <h2>Cómo empezar sin gastar de más</h2>
        <ol>
          <li><strong>Elige un solo proceso</strong> que consuma tiempo: responder las mismas preguntas, capturar leads, cargar pedidos a mano.</li>
          <li><strong>Mide cuánto tiempo toma hoy</strong> y cuántas veces ocurre al mes.</li>
          <li><strong>Empieza con una versión pequeña</strong> y amplíala cuando veas que funciona.</li>
          <li><strong>Deja una persona responsable</strong> de revisar las respuestas y corregir al sistema.</li>
        </ol>
        <p>Si no sabes por dónde empezar, una consultoría puntual desde S/ 30 la hora sirve para ordenar prioridades antes de gastar en desarrollo. Más ideas en <a href="/blog/ia-para-negocios-como-aplicarla-en-tu-empresa">IA para negocios</a> y en <a href="/blog/automatizacion-procesos-pymes-peru">automatización de procesos para pymes</a>.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cuesta una IA para una pyme en Perú?</h3>
        <p>Desde S/ 500 un chatbot básico en DEVMARK. Un proyecto con IA propia e integraciones se cotiza según el alcance.</p>
        <h3>¿Necesito datos propios para usar IA?</h3>
        <p>Para un chatbot útil, sí: preguntas frecuentes, catálogo, políticas. Entre mejor ordenada esté esa información, mejor responde.</p>
        <h3>¿La IA reemplaza a mi equipo?</h3>
        <p>No. Se encarga de lo repetitivo y deja al equipo los casos que piden criterio.</p>
        <h3>¿Cuánto tarda en estar lista?</h3>
        <p>Depende del alcance. Un chatbot sencillo se acuerda en plazos cortos; una integración con tus sistemas lleva más. Lo fijamos en la cotización.</p>
        ${cierre('es', 'automation', 'Hola DEVMARK, leí cuánto cuesta implementar IA en una pyme y quiero evaluar mi caso.')}
      `,
  },
  {
    slug: 'cuanto-cuesta-chatbot-ia-whatsapp-peru',
    title: 'Cuánto cuesta un chatbot con IA para WhatsApp en Perú',
    description: 'Un chatbot para WhatsApp en DEVMARK parte desde S/ 500. Cuánto cuesta crear uno, qué se paga cada mes y cuándo conviene una plataforma o un desarrollo a medida.',
    date: '2026-10-22',
    author: AUTOR,
    image: '/undraw_coding_joxb.svg',
    imageHint: 'chatbot con IA para WhatsApp en Perú',
    tags: ['Chatbots', 'WhatsApp', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> un chatbot para WhatsApp con flujos y menús parte desde <strong>S/ 500</strong> en DEVMARK; uno con IA generativa entrenado con tu información, desde <strong>S/ 2500</strong>; y uno integrado a tu CRM o a tus pedidos se cotiza a medida. A eso se suma un costo mensual por la plataforma de WhatsApp y el consumo de IA.</p>
        <h2>Cuánto cuesta según el tipo de chatbot</h2>
        <table><thead><tr><th>Tipo</th><th>Desde en DEVMARK</th><th>Qué hace</th><th>Rango orientativo de mercado</th></tr></thead><tbody>
        <tr><td>Chatbot de flujos</td><td>S/ 500</td><td>Menús y respuestas predefinidas en WhatsApp o tu web</td><td>Setup básico desde casi nada hasta unos cientos de dólares con plataformas sin código</td></tr>
        <tr><td>Chatbot con IA</td><td>S/ 2500</td><td>Responde con lenguaje natural usando tu información, con panel de conversaciones</td><td>Con integraciones, desde unos miles de dólares</td></tr>
        <tr><td>Asistente integrado</td><td>A medida</td><td>Conectado a CRM o ERP; toma pedidos y apoya ventas</td><td>Proyectos mayores, según los sistemas que conecte</td></tr>
        </tbody></table>
        ${nota('es', false)}
        <h2>Lo que pagas cada mes</h2>
        <ul>
          <li><strong>API de WhatsApp Business:</strong> para usar un chatbot de forma oficial se necesita la API de WhatsApp, y Meta cobra según el tipo de mensaje. Las tarifas cambian; confirma la vigente.</li>
          <li><strong>Plataforma de chatbot:</strong> si usas una por suscripción, según lo que se ve en el mercado va desde unas decenas de dólares hasta unos cientos al mes, según el volumen de conversaciones.</li>
          <li><strong>Modelo de IA:</strong> el consumo crece con el número de conversaciones.</li>
          <li><strong>Mantenimiento:</strong> ajustar respuestas, actualizar precios y revisar casos mal respondidos.</li>
        </ul>
        <h2>Plataforma o desarrollo a medida</h2>
        <p>Una plataforma por suscripción sirve si solo necesitas responder preguntas frecuentes. Si tu bot tiene que leer stock, estado de pedidos o facturación en tiempo real, ya hablamos de desarrollo a medida. En DEVMARK entrenamos al chatbot con tu información, le definimos qué puede y qué no puede responder, y lo derivamos a una persona cuando hace falta.</p>
        <h2>Qué debe tener un buen chatbot de ventas</h2>
        <ol>
          <li>Responde con tu tono y solo con información verificada.</li>
          <li>Sabe decir «no tengo ese dato» y pasa la conversación a una persona.</li>
          <li>Captura el nombre y la necesidad del cliente antes de derivar.</li>
          <li>Registra las conversaciones para que puedas mejorarlo.</li>
        </ol>
        <p>Si quieres ver el panorama general, lee <a href="/blog/chatbots-ia-atencion-cliente-peru">chatbots con IA para atención al cliente</a>.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cuesta un chatbot de WhatsApp en Perú?</h3>
        <p>Desde S/ 500 en DEVMARK. Con IA entrenada con tu información, desde S/ 2500. Aparte va la plataforma de WhatsApp.</p>
        <h3>¿Funciona con mi número actual?</h3>
        <p>Depende de cómo esté configurado tu WhatsApp. Lo revisamos al empezar.</p>
        <h3>¿El chatbot puede equivocarse?</h3>
        <p>Sí, por eso se limita a tu información y se deriva a una persona cuando no está seguro. Hay que revisarlo con regularidad.</p>
        <h3>¿Puede tomar pedidos o agendar citas?</h3>
        <p>Sí, con integración a tu sistema. Ese caso se cotiza a medida.</p>
        ${cierre('es', 'chatbot', 'Hola DEVMARK, leí cuánto cuesta un chatbot con IA para WhatsApp y quiero cotizar el mío.')}
      `,
  },
  {
    slug: 'cuanto-cuesta-hosting-peru',
    title: 'Cuánto cuesta el hosting en Perú: hosting, dominio y correos',
    description: 'Cuánto se paga por hosting y dominio en Perú: hosting compartido, VPS, dominio .pe y .com. Qué mirar antes de contratar y cómo evitar sorpresas en la renovación.',
    date: '2026-10-21',
    author: AUTOR,
    image: '/illustrations/programming.svg',
    imageHint: 'costo del hosting y dominio en Perú',
    tags: ['Hosting', 'Dominio', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> según lo que se ve en el mercado peruano, un hosting compartido para una web de negocio ronda entre <strong>S/ 30 y S/ 50 al mes</strong>, y un dominio .pe unos <strong>S/ 110 a S/ 180 al año</strong>. Los VPS cuestan varias veces más. DEVMARK es socio directo de Hostinger: con el código <strong>DEVMARKPE</strong> tienes descuento y te configuramos gratis tus correos y el certificado SSL.</p>
        <h2>Precios orientativos</h2>
        <table><thead><tr><th>Concepto</th><th>Rango orientativo</th><th>Notas</th></tr></thead><tbody>
        <tr><td>Hosting compartido</td><td>Unos S/ 30 a S/ 50 al mes</td><td>Hay ofertas por año desde menos, con renovación a otro precio</td></tr>
        <tr><td>Dominio .pe</td><td>Unos S/ 110 a S/ 180 al año</td><td>Revisa el precio de renovación en NIC.PE o tu proveedor</td></tr>
        <tr><td>Dominio .com</td><td>Unos S/ 40 a S/ 60 al año</td><td>Suele variar entre el primer año y la renovación</td></tr>
        <tr><td>Certificado SSL</td><td>Gratis en la mayoría de planes</td><td>Verifica que esté incluido</td></tr>
        <tr><td>Correos con tu dominio</td><td>Incluidos o por cuenta</td><td>Pregunta cuántas cuentas entran</td></tr>
        <tr><td>VPS o servidor propio</td><td>Varias veces el hosting compartido</td><td>Solo si tu proyecto lo exige</td></tr>
        </tbody></table>
        ${nota('es')}
        <h2>Compartido, VPS o gestionado</h2>
        <ul>
          <li><strong>Compartido:</strong> comparte el servidor con otras webs. Basta para una web corporativa o un blog con tráfico moderado.</li>
          <li><strong>VPS:</strong> recursos propios y más control, pero tú (o tu proveedor) administras el servidor. Conviene para apps, tiendas grandes o sistemas a medida.</li>
          <li><strong>Gestionado:</strong> el proveedor se ocupa de actualizaciones y seguridad. Cuesta más y ahorra trabajo técnico.</li>
        </ul>
        <h2>Qué mirar antes de contratar</h2>
        <ol>
          <li><strong>Precio de renovación:</strong> el del primer año puede ser promocional.</li>
          <li><strong>Copias de seguridad:</strong> frecuencia y si puedes restaurarlas tú.</li>
          <li><strong>Velocidad y estabilidad:</strong> es lo que más se nota al usar la web. Mira <a href="/blog/web-lenta-pierde-ventas-core-web-vitals">por qué una web lenta pierde ventas</a>.</li>
          <li><strong>Soporte en español</strong> y horarios.</li>
          <li><strong>Propiedad:</strong> el dominio debe estar a tu nombre, no al de la agencia.</li>
        </ol>
        <p>Mira nuestros planes y descuentos en <a href="/hosting">hosting</a>. Si además necesitas mantener la web al día, revisa el <a href="/blog/cuanto-cuesta-mantenimiento-web-mensual-peru">mantenimiento mensual</a>.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cuesta el hosting en Perú?</h3>
        <p>Según lo que se ve en el mercado, un hosting compartido ronda entre S/ 30 y S/ 50 al mes, aunque hay ofertas anuales más baratas.</p>
        <h3>¿Cuánto cuesta un dominio .pe?</h3>
        <p>Unos S/ 110 a S/ 180 al año según el proveedor. Confirma el precio de renovación.</p>
        <h3>¿El servidor debe estar en Perú?</h3>
        <p>Para la mayoría de webs de negocio lo que importa es que sea rápido y estable. Para casos especiales lo evaluamos contigo.</p>
        <h3>¿Puedo migrar mi web sin perderla?</h3>
        <p>Sí. Migramos tu web y tu dominio con cuidado para evitar caídas.</p>
        ${cierre('es', 'web', 'Hola DEVMARK, leí cuánto cuesta el hosting en Perú y quiero que me ayuden con mi hosting y dominio.')}
      `,
  },
  {
    slug: 'freelancer-o-agencia-desarrollo-web-peru-costo',
    title: 'Freelancer o agencia de desarrollo web en Perú: cuánto cobra cada uno',
    description: 'Comparamos cuánto cobra un freelancer de desarrollo frente a una agencia en Perú, qué incluye cada opción y cuándo conviene una u otra para tu proyecto.',
    date: '2026-10-20',
    author: AUTOR,
    image: '/undraw_team-up_qeem.svg',
    imageHint: 'freelancer o agencia de desarrollo web',
    tags: ['Desarrollo Web', 'Precios', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> según lo que se ve en el mercado, un freelancer de desarrollo en Perú cobra en promedio unos <strong>US$ 20 por hora</strong>, y una agencia cobra más por proyecto porque el precio incluye gestión, diseño, pruebas y soporte. En DEVMARK una web parte desde S/ 800 y una consultoría desde S/ 30 la hora. Lo barato o lo caro depende de qué incluye cada propuesta.</p>
        <h2>Comparación honesta</h2>
        <table><thead><tr><th>Criterio</th><th>Freelancer</th><th>Agencia o equipo</th></tr></thead><tbody>
        <tr><td>Precio</td><td>Suele ser menor, sobre todo en trabajos pequeños</td><td>Mayor, porque incluye varios perfiles y gestión</td></tr>
        <tr><td>Quién trabaja</td><td>Una persona que hace todo</td><td>Diseño, desarrollo y pruebas repartidos</td></tr>
        <tr><td>Disponibilidad</td><td>Depende de su agenda y de que no se enferme o se vaya</td><td>El trabajo continúa si alguien falta</td></tr>
        <tr><td>Alcance</td><td>Ideal para una tarea clara y acotada</td><td>Mejor para proyectos con varias piezas</td></tr>
        <tr><td>Soporte posterior</td><td>Se pacta con la persona</td><td>Suele haber planes de mantenimiento</td></tr>
        <tr><td>Riesgo</td><td>Mayor variación de calidad entre personas</td><td>Mayor variación entre agencias grandes y chicas</td></tr>
        </tbody></table>
        ${nota('es')}
        <h2>Cuándo conviene un freelancer</h2>
        <p>Cuando tienes una tarea concreta (un ajuste, una landing simple, una integración puntual), un presupuesto muy limitado y puedes supervisar el trabajo. Pide ejemplos reales, comprueba referencias y acuerda por escrito qué entrega y cuándo.</p>
        <h2>Cuándo conviene una agencia o un equipo chico</h2>
        <p>Cuando el proyecto tiene diseño, desarrollo, SEO y soporte, cuando la web es clave para tus ventas, o cuando no quieres depender de una sola persona. Un equipo pequeño puede ser un punto medio: en DEVMARK quien diseña tu proyecto es quien responde tus mensajes.</p>
        <h2>Preguntas para hacerle a cualquiera de los dos</h2>
        <ol>
          <li>¿Qué incluye exactamente el precio y qué queda fuera?</li>
          <li>¿Quién es dueño del código, del dominio y del hosting al terminar?</li>
          <li>¿Qué pasa si necesito cambios después de entregar?</li>
          <li>¿Cuáles son los plazos y cómo se comunican los avances?</li>
          <li>¿Tiene trabajos publicados que pueda ver? Revisa nuestro <a href="/portfolio">portafolio</a> como ejemplo de lo que puedes pedir.</li>
        </ol>
        <p>Si dudas sobre el camino, nuestra guía de <a href="/blog/como-elegir-la-agencia-de-desarrollo-web-correcta">cómo elegir una agencia</a> te da más criterios, y <a href="/blog/cuanto-cuesta-pagina-web-peru">cuánto cuesta una página web</a> te da referencias de precio.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cuánto cobra un freelancer de desarrollo en Perú?</h3>
        <p>Según lo que se ve en el mercado, en promedio unos US$ 20 por hora, aunque varía con la experiencia y el tipo de trabajo.</p>
        <h3>¿Una agencia siempre es más cara?</h3>
        <p>Por proyecto suele serlo, pero también incluye más. Compara qué entrega cada propuesta, no solo el monto.</p>
        <h3>¿Puedo empezar con un freelancer y pasar luego a una agencia?</h3>
        <p>Sí, siempre que el código esté ordenado y sea tuyo. Pide acceso a todo desde el primer día.</p>
        <h3>¿Qué pasa si el freelancer desaparece?</h3>
        <p>Es el riesgo principal. Se reduce con contratos claros, accesos compartidos y documentación.</p>
        ${cierre('es', 'consulting', 'Hola DEVMARK, leí la comparación entre freelancer y agencia y quiero conversar sobre mi proyecto.')}
      `,
  },
  {
    slug: 'que-es-geo-seo-para-ia-como-aparecer-en-chatgpt',
    title: 'Qué es el GEO: cómo aparecer en las respuestas de ChatGPT, Gemini y Perplexity',
    description: 'El GEO es el SEO para buscadores con IA. Qué es, en qué se parece y en qué se diferencia del SEO, y qué puedes hacer en tu web para que ChatGPT, Gemini y Perplexity te citen.',
    date: '2026-10-27',
    author: AUTOR,
    image: '/undraw_web-devices_i15y.svg',
    imageHint: 'GEO y SEO para buscadores con inteligencia artificial',
    tags: ['GEO', 'SEO', 'IA', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> el GEO (Generative Engine Optimization) es el conjunto de prácticas para que asistentes con IA, como ChatGPT, Gemini o Perplexity, encuentren tu web, la entiendan y la citen cuando responden una pregunta. Se apoya en el SEO, pero pone el foco en respuestas claras, datos verificables y una identidad consistente. No existe garantía de aparecer, pero sí hay señales que puedes ordenar.</p>
        <h2>SEO y GEO: en qué se parecen y en qué no</h2>
        <table><thead><tr><th></th><th>SEO</th><th>GEO</th></tr></thead><tbody>
        <tr><td>Objetivo</td><td>Aparecer en la lista de resultados</td><td>Ser fuente citada dentro de una respuesta</td></tr>
        <tr><td>Qué se lee</td><td>Páginas completas y sus enlaces</td><td>Fragmentos claros que responden una pregunta</td></tr>
        <tr><td>Qué ayuda</td><td>Palabras clave, enlaces, velocidad</td><td>Respuestas directas, datos, estructura, autoría</td></tr>
        <tr><td>Cómo se mide</td><td>Posiciones y visitas</td><td>Si te mencionan, y en qué consultas</td></tr>
        </tbody></table>
        <p>El GEO no reemplaza al SEO: una web que Google no puede rastrear ni entender tampoco es una buena fuente para una IA. Por eso empieza por una buena base de <a href="/blog/seo-tecnico-la-base-para-un-buen-posicionamiento">SEO técnico</a>.</p>
        <h2>Qué puedes hacer en tu web</h2>
        <ol>
          <li><strong>Responde primero.</strong> Pon la respuesta directa al comienzo de cada página, en dos o tres frases, y desarrolla después.</li>
          <li><strong>Usa preguntas reales como subtítulos</strong> y respuestas cortas debajo. Es el formato que más fácil se cita.</li>
          <li><strong>Da datos concretos y atribuidos:</strong> precios «desde», rangos, definiciones. Evita cifras sin fuente.</li>
          <li><strong>Marca tu contenido con datos estructurados</strong> (Organization, Article, FAQ, LocalBusiness) para que las máquinas lo entiendan sin adivinar.</li>
          <li><strong>Sé consistente:</strong> el mismo nombre, dirección, teléfono y perfiles en tu web, Google y redes.</li>
          <li><strong>Muestra quién escribe:</strong> autor, cargo y experiencia real.</li>
          <li><strong>No bloquees a los rastreadores</strong> sin querer. Revisa tu <code>robots.txt</code> y decide qué bots permites.</li>
          <li><strong>Considera un archivo <code>llms.txt</code>,</strong> una convención reciente que resume tu sitio para asistentes de IA. Nosotros tenemos el nuestro.</li>
          <li><strong>Consigue menciones fuera de tu web:</strong> directorios, notas, perfiles y reseñas ayudan a que te reconozcan como entidad.</li>
        </ol>
        <h2>Cómo saber si funciona</h2>
        <p>Haz preguntas reales a ChatGPT, Gemini y Perplexity («¿qué agencia de desarrollo web recomiendas en Lima?», «¿cuánto cuesta un chatbot para WhatsApp en Perú?»), anota si te mencionan y desde qué página, y repite cada mes. Las respuestas cambian, así que mira la tendencia, no un solo día.</p>
        <h2>Lo que no hay que prometer</h2>
        <p>Nadie fuera de cada plataforma conoce la fórmula exacta con la que decide qué citar. Desconfía de quien garantice aparecer en ChatGPT. Lo que sí se puede hacer es dejar tu contenido claro, verificable y fácil de leer para personas y máquinas.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Qué significa GEO?</h3>
        <p>Generative Engine Optimization: optimización para motores de búsqueda generativos, es decir, los que responden con IA.</p>
        <h3>¿El GEO reemplaza al SEO?</h3>
        <p>No. Se complementan; el GEO se apoya en una web técnicamente sana y con buen contenido.</p>
        <h3>¿Cuánto cuesta el GEO?</h3>
        <p>En DEVMARK va dentro del servicio de SEO y GEO; la optimización GEO está en el nivel Empresa, desde S/ 1200 al mes. Mira <a href="/blog/cuanto-cuesta-seo-mensual-peru">cuánto cuesta el SEO mensual</a>.</p>
        <h3>¿Cuánto tarda en notarse?</h3>
        <p>Es un trabajo de meses y sin garantía de resultado. Se mide con consultas de prueba periódicas.</p>
        ${cierre('es', 'seo', 'Hola DEVMARK, leí qué es el GEO y quiero que mi negocio aparezca en ChatGPT y otros asistentes con IA.')}
      `,
  },
  {
    slug: 'seo-local-lima-negocios-google-maps',
    title: 'SEO local en Lima: cómo aparecer en Google Maps y en las búsquedas «cerca de mí»',
    description: 'Pasos concretos de SEO local para un negocio en Lima: perfil de Google, reseñas, datos consistentes, páginas por servicio y cómo medir llamadas y consultas.',
    date: '2026-10-19',
    author: AUTOR,
    image: '/undraw_web-devices_i15y.svg',
    imageHint: 'SEO local en Lima y Google Maps',
    tags: ['SEO', 'SEO Local', 'Lima', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> para aparecer en Google Maps y en búsquedas como «dentista cerca de mí» en Lima necesitas tres cosas: un perfil de negocio en Google completo y activo, datos de tu negocio iguales en todas partes, y una web con páginas claras por servicio. El SEO local en DEVMARK parte desde S/ 300 al mes.</p>
        <h2>El orden que seguimos</h2>
        <ol>
          <li><strong>Perfil de Negocio en Google.</strong> Reclámalo y verifícalo. Elige la categoría principal que mejor describe lo que haces, completa horarios, servicios, descripción y teléfono, y sube fotos reales.</li>
          <li><strong>Datos consistentes.</strong> Nombre, dirección y teléfono deben ser idénticos en tu web, tu perfil de Google y tus redes. Una diferencia pequeña confunde.</li>
          <li><strong>Reseñas reales.</strong> Pídelas a clientes reales después de atenderlos y responde todas, incluidas las negativas. No las compres ni las inventes: va contra las reglas y pierdes confianza.</li>
          <li><strong>Una página por servicio.</strong> Cada servicio importante merece su página con texto útil, precios «desde» si puedes, preguntas frecuentes y datos de contacto.</li>
          <li><strong>Páginas por zona, solo si atiendes ahí.</strong> Si tienes clientes en Miraflores, Surco o San Miguel, una página con información real de esa zona ayuda. Copiar el mismo texto cambiando el distrito perjudica.</li>
          <li><strong>Datos estructurados LocalBusiness</strong> en tu web, para que Google lea tu dirección, horarios y teléfono sin dudas.</li>
          <li><strong>Velocidad en el celular.</strong> La mayoría busca desde el teléfono. Una web lenta pierde la consulta; mira <a href="/blog/web-lenta-pierde-ventas-core-web-vitals">por qué una web lenta pierde ventas</a>.</li>
        </ol>
        <h2>Qué medir</h2>
        <table><thead><tr><th>Señal</th><th>Dónde verla</th></tr></thead><tbody>
        <tr><td>Llamadas, rutas y clics a tu web desde el perfil</td><td>Estadísticas de tu perfil en Google</td></tr>
        <tr><td>Búsquedas con las que te encuentran</td><td>Google Search Console</td></tr>
        <tr><td>Clics a WhatsApp</td><td>Un evento en Google Analytics o el contador del botón</td></tr>
        <tr><td>Consultas que llegan</td><td>Tu bandeja y tu WhatsApp, anotando de dónde vienen</td></tr>
        </tbody></table>
        <h2>Errores comunes</h2>
        <ul>
          <li>Dejar el perfil sin actualizar horarios en feriados.</li>
          <li>Usar una dirección que no es real para parecer cercano.</li>
          <li>Llenar la web de palabras clave en vez de responder dudas.</li>
          <li>No registrar de dónde vienen los clientes.</li>
        </ul>
        <p>Para una visión general del posicionamiento en el país, lee <a href="/blog/seo-peru-posicionar-web-google">SEO en Perú: cómo posicionar tu web en Google</a>, y para costos, <a href="/blog/cuanto-cuesta-seo-mensual-peru">cuánto cuesta el SEO mensual</a>.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Necesito una web para aparecer en Google Maps?</h3>
        <p>No es obligatorio, pero una web clara con tus servicios refuerza tu perfil y te da más lugares donde aparecer.</p>
        <h3>¿Cuánto cuesta el SEO local?</h3>
        <p>En DEVMARK, desde S/ 300 al mes. El monto final depende de tu competencia y del alcance.</p>
        <h3>¿Cuánto tarda en verse?</h3>
        <p>Un perfil bien armado puede mejorar en semanas, y la web en meses. Depende de tu zona y de la competencia.</p>
        <h3>¿Sirve si atiendo en provincias?</h3>
        <p>Sí. Los pasos son los mismos; cambia la zona de servicio.</p>
        ${cierre('es', 'seo', 'Hola DEVMARK, leí sobre SEO local en Lima y quiero aparecer en Google Maps con mi negocio.')}
      `,
  },
  {
    slug: 'auditoria-seo-tecnica-que-revisar-en-tu-web',
    title: 'Auditoría SEO técnica: qué revisar en tu web y cómo priorizar',
    description: 'Una lista para auditar tu web: rastreo, indexación, velocidad, estructura, datos estructurados y seguridad. Qué herramientas usar y cómo ordenar lo que encuentres.',
    date: '2026-10-18',
    author: AUTOR,
    image: '/illustrations/coding.svg',
    imageHint: 'auditoría SEO técnica de un sitio web',
    tags: ['SEO', 'SEO Tecnico', 'Peru'],
    content: `
        <p><strong>Respuesta corta:</strong> una auditoría SEO técnica revisa si Google puede <em>rastrear</em>, <em>entender</em> e <em>indexar</em> tu web, y si esta carga rápido y segura. Con las herramientas gratuitas de Google ya puedes detectar los problemas más graves. Lo importante después es ordenar los hallazgos por impacto y esfuerzo para arreglar primero lo que más pesa.</p>
        <h2>Qué se revisa</h2>
        <table><thead><tr><th>Área</th><th>Qué comprobar</th><th>Dónde mirarlo</th></tr></thead><tbody>
        <tr><td>Rastreo</td><td>El <code>robots.txt</code> no bloquea páginas importantes; hay un <code>sitemap.xml</code> actualizado</td><td>Search Console</td></tr>
        <tr><td>Indexación</td><td>Las páginas clave están indexadas; no hay duplicados ni páginas basura indexadas</td><td>Informe de páginas en Search Console</td></tr>
        <tr><td>Estructura y enlaces</td><td>URLs claras, enlaces internos entre páginas relacionadas, sin enlaces rotos ni cadenas de redirecciones</td><td>Un rastreador de sitios</td></tr>
        <tr><td>Metadatos</td><td>Títulos y descripciones únicos, un solo H1 por página</td><td>Rastreador o revisión manual</td></tr>
        <tr><td>Velocidad</td><td>Core Web Vitals en verde, imágenes optimizadas</td><td>PageSpeed Insights, Lighthouse</td></tr>
        <tr><td>Móvil</td><td>Se ve y se usa bien en celular</td><td>Prueba real en un teléfono</td></tr>
        <tr><td>Datos estructurados</td><td>Organization, Article, FAQ o LocalBusiness, sin errores</td><td>Prueba de resultados enriquecidos de Google</td></tr>
        <tr><td>Seguridad</td><td>HTTPS válido en todas las páginas, sin contenido mixto</td><td>Navegador y Search Console</td></tr>
        <tr><td>Idiomas</td><td>Si tienes versión en inglés, etiquetas hreflang correctas</td><td>Rastreador, código fuente</td></tr>
        </tbody></table>
        <h2>Cómo priorizar</h2>
        <ol>
          <li><strong>Bloqueos graves primero:</strong> páginas importantes que no se indexan o están bloqueadas.</li>
          <li><strong>Después, lo que afecta a muchas páginas a la vez:</strong> velocidad, estructura, plantillas con metadatos repetidos.</li>
          <li><strong>Luego, las mejoras de detalle:</strong> datos estructurados, enlaces internos, textos alternativos.</li>
          <li><strong>Al final, lo cosmético</strong> que no cambia el resultado.</li>
        </ol>
        <p>Anota cada hallazgo con su página, su impacto probable y quién lo arregla. Una auditoría que termina en un PDF de 80 páginas sin prioridades no sirve.</p>
        <h2>Qué debe entregarte quien audita</h2>
        <ul>
          <li>Lista priorizada de problemas, con ejemplos concretos.</li>
          <li>Qué hacer en cada caso, en lenguaje claro.</li>
          <li>Un plan por etapas y, si quieres, quien lo ejecute.</li>
        </ul>
        <p>En DEVMARK incluimos SEO técnico básico en el plan Negocio de SEO y avanzado en el plan Empresa; si prefieres revisar solo tu caso, una consultoría desde S/ 30 la hora sirve para empezar. Más fundamentos en <a href="/blog/seo-tecnico-la-base-para-un-buen-posicionamiento">SEO técnico: la base para posicionar</a>.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Cada cuánto conviene auditar?</h3>
        <p>Una revisión completa al año y una rápida tras cada cambio grande de la web, como un rediseño o una migración.</p>
        <h3>¿Puedo hacerla yo mismo?</h3>
        <p>Los puntos básicos sí, con Search Console y PageSpeed Insights. Lo difícil es interpretar y priorizar.</p>
        <h3>¿Cuánto cuesta una auditoría SEO?</h3>
        <p>Depende del tamaño de la web. Pídenos una cotización con tu dirección web y te respondemos con el alcance.</p>
        <h3>¿La auditoría mejora el posicionamiento por sí sola?</h3>
        <p>No: ordena la base. Los resultados vienen de corregir lo que encuentra y de publicar buen contenido.</p>
        ${cierre('es', 'seo', 'Hola DEVMARK, leí sobre auditoría SEO técnica y quiero que revisen mi web.')}
      `,
  },
  {
    slug: 'web-lenta-pierde-ventas-core-web-vitals',
    title: 'Por qué una web lenta pierde ventas y cómo medir los Core Web Vitals',
    description: 'Una web lenta frustra a tus clientes y pesa en Google. Qué miden los Core Web Vitals, cuáles son los valores recomendados, qué los empeora y cómo mejorarlos.',
    date: '2026-10-17',
    author: AUTOR,
    image: '/undraw_device-sync_d9ei.svg',
    imageHint: 'velocidad de carga de una web y Core Web Vitals',
    tags: ['SEO', 'Rendimiento', 'Desarrollo Web'],
    content: `
        <p><strong>Respuesta corta:</strong> una web lenta pierde ventas porque la gente se va antes de ver tu oferta, sobre todo desde el celular, y porque Google toma la experiencia de página como señal de calidad. Se mide con tres indicadores, los Core Web Vitals, y se mejora con imágenes ligeras, menos código, un buen hosting y una web bien construida.</p>
        <h2>Los tres indicadores y sus valores recomendados</h2>
        <table><thead><tr><th>Indicador</th><th>Qué mide</th><th>Valor recomendado por Google</th></tr></thead><tbody>
        <tr><td>LCP</td><td>Cuánto tarda en verse lo principal de la página</td><td>2.5 segundos o menos</td></tr>
        <tr><td>INP</td><td>Cuánto tarda la página en responder a un toque o clic</td><td>200 milisegundos o menos</td></tr>
        <tr><td>CLS</td><td>Cuánto se mueve el contenido mientras carga</td><td>0.1 o menos</td></tr>
        </tbody></table>
        <p>Mídelos gratis en PageSpeed Insights y en el informe de Core Web Vitals de Search Console. Prueba en un celular real, con datos móviles, no solo en tu computadora.</p>
        <h2>Cómo se traduce en ventas</h2>
        <ul>
          <li><strong>Abandono antes de ver tu oferta:</strong> quien llega desde Google o una publicidad no espera.</li>
          <li><strong>Formularios y carritos que se traban:</strong> un botón que responde tarde se siente roto.</li>
          <li><strong>Publicidad desperdiciada:</strong> pagas por un clic que no llega a ver tu página.</li>
          <li><strong>Menor visibilidad:</strong> la experiencia de página es una de las señales que Google usa, junto a muchas otras.</li>
        </ul>
        <h2>Qué suele hacer lenta a una web</h2>
        <ol>
          <li><strong>Imágenes pesadas</strong> sin comprimir ni dimensionar.</li>
          <li><strong>Demasiados plugins o scripts</strong> de terceros, como chats, píxeles y mapas, cargados todos a la vez.</li>
          <li><strong>Hosting saturado</strong> o mal configurado; mira <a href="/blog/cuanto-cuesta-hosting-peru">cuánto cuesta el hosting en Perú</a>.</li>
          <li><strong>Plantillas pesadas</strong> que cargan código que no usas.</li>
          <li><strong>Fuentes y animaciones</strong> sin optimizar.</li>
        </ol>
        <h2>Cómo mejorarla, en orden de impacto</h2>
        <ol>
          <li>Comprime las imágenes y usa formatos modernos como WebP o AVIF.</li>
          <li>Carga de forma diferida lo que está debajo de la pantalla.</li>
          <li>Quita lo que no usas: plugins, scripts, fuentes extra.</li>
          <li>Usa caché y, si tu público está repartido, una red de distribución de contenido.</li>
          <li>Revisa el hosting si los tiempos de respuesta del servidor son altos.</li>
          <li>Si la base es el problema, una web construida con tecnologías modernas rinde mejor desde el inicio. Es lo que hacemos en DEVMARK con Next.js y React.</li>
        </ol>
        <p>La velocidad es parte del <a href="/blog/seo-tecnico-la-base-para-un-buen-posicionamiento">SEO técnico</a> y se revisa en una <a href="/blog/auditoria-seo-tecnica-que-revisar-en-tu-web">auditoría</a>. Un mantenimiento mensual ayuda a que no se degrade con el tiempo: <a href="/blog/cuanto-cuesta-mantenimiento-web-mensual-peru">mira cuánto cuesta</a>.</p>
        <h2>Preguntas frecuentes</h2>
        <h3>¿Qué es una web lenta?</h3>
        <p>La que no cumple los valores recomendados de los Core Web Vitals en celular. Como referencia, que lo principal tarde más de 2.5 segundos en verse.</p>
        <h3>¿Cuánto cuesta acelerar mi web?</h3>
        <p>Depende de por qué es lenta. La optimización de velocidad va en el plan Profesional de mantenimiento, desde S/ 150 al mes, o se cotiza como proyecto.</p>
        <h3>¿Una web más rápida vende más?</h3>
        <p>Quita fricción y mejora la experiencia, lo que ayuda a la conversión, aunque el resultado depende de tu oferta y tu tráfico.</p>
        <h3>¿Cómo sé si mi web es lenta?</h3>
        <p>Pega tu dirección en PageSpeed Insights y revisa la pestaña móvil.</p>
        ${cierre('es', 'web', 'Hola DEVMARK, mi web va lenta y quiero que la revisen y la aceleren.')}
      `,
  },
];
