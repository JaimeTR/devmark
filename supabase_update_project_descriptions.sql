-- ==========================================
-- ✍️ Mejora de descripciones pobres del portafolio
-- ==========================================
-- Detecté 35 proyectos con descripción de 1-3 palabras o texto placeholder
-- (ej: "Travel", "IE", "Finansas fff", "clinica dental") en la tabla
-- "projects" (compartida con jaimetr.dev). Las reemplazo por una descripción
-- profesional de 1 frase, inferida del título + categoría + rubro de cada
-- proyecto — NO son datos verificados del proyecto real (no tengo más
-- contexto que esos 3 campos), así que revisa antes de correr y edita las
-- que conozcas mejor. No toco description_en (queda igual que estaba).
--
-- Instrucciones:
-- 1. Ir al proyecto de Supabase COMPARTIDO (epmdauwektgtwujsisdh, el de
--    jaimetr.dev) — OJO, no es el proyecto propio de DEVMARK.
-- 2. Abrir el SQL Editor
-- 3. Revisar las descripciones abajo y ajustar las que quieras
-- 4. Ejecutar
-- ==========================================

UPDATE projects SET description = 'Sitio web corporativo para una agencia de marketing, diseñado para presentar sus servicios y generar contacto con nuevos clientes.', description_es = 'Sitio web corporativo para una agencia de marketing, diseñado para presentar sus servicios y generar contacto con nuevos clientes.' WHERE id = 40; -- Vision360
UPDATE projects SET description = 'Tienda online de ropa con catálogo de productos, carrito de compra y proceso de pago optimizado para conversión.', description_es = 'Tienda online de ropa con catálogo de productos, carrito de compra y proceso de pago optimizado para conversión.' WHERE id = 77; -- Fresco est
UPDATE projects SET description = 'Plataforma educativa para aprender inglés con tutores nativos en vivo, con reserva de clases y seguimiento de progreso.', description_es = 'Plataforma educativa para aprender inglés con tutores nativos en vivo, con reserva de clases y seguimiento de progreso.' WHERE id = 82; -- Breezelingo APP
UPDATE projects SET description = 'Sitio web institucional para un geoparque en España, con información turística y educativa para visitantes.', description_es = 'Sitio web institucional para un geoparque en España, con información turística y educativa para visitantes.' WHERE id = 41; -- Maestrazgo
UPDATE projects SET description = 'Herramienta de generación automática de leads para agencias, sin necesidad de gestionar redes sociales o anuncios manualmente.', description_es = 'Herramienta de generación automática de leads para agencias, sin necesidad de gestionar redes sociales o anuncios manualmente.' WHERE id = 75; -- SmartRank
UPDATE projects SET description = 'Sitio web para una agencia de turismo de aventura, con información de rutas, actividades y reservas.', description_es = 'Sitio web para una agencia de turismo de aventura, con información de rutas, actividades y reservas.' WHERE id = 61; -- Matarraña Aventura
UPDATE projects SET description = 'Sitio web para una clínica dental, con presentación de servicios, especialistas y formulario de citas.', description_es = 'Sitio web para una clínica dental, con presentación de servicios, especialistas y formulario de citas.' WHERE id = 43; -- Dental Life
UPDATE projects SET description = 'Sistema web para una inmobiliaria, con gestión de propiedades y contacto directo con interesados.', description_es = 'Sistema web para una inmobiliaria, con gestión de propiedades y contacto directo con interesados.' WHERE id = 37; -- Devmark (rubro: Inmobiliaria)
UPDATE projects SET description = 'Portafolio personal para mostrar proyectos, habilidades y experiencia como desarrollador.', description_es = 'Portafolio personal para mostrar proyectos, habilidades y experiencia como desarrollador.' WHERE id = 38; -- Portafolio JaimeTR
UPDATE projects SET description = 'Sitio web institucional para un centro educativo, con enfoque en su propuesta pedagógica y valores.', description_es = 'Sitio web institucional para un centro educativo, con enfoque en su propuesta pedagógica y valores.' WHERE id = 78; -- CI Enanos
UPDATE projects SET description = 'Sitio web corporativo para una empresa de motobombas, con catálogo de productos y contacto para cotizaciones.', description_es = 'Sitio web corporativo para una empresa de motobombas, con catálogo de productos y contacto para cotizaciones.' WHERE id = 48; -- Jopco
UPDATE projects SET description = 'Sitio web para una clínica de ortodoncia, con presentación de tratamientos y formulario de contacto.', description_es = 'Sitio web para una clínica de ortodoncia, con presentación de tratamientos y formulario de contacto.' WHERE id = 65; -- Dorthon
UPDATE projects SET description = 'Sitio web para una empresa de tecnología médica, con presentación de soluciones y contacto comercial.', description_es = 'Sitio web para una empresa de tecnología médica, con presentación de soluciones y contacto comercial.' WHERE id = 42; -- Visual Medica
UPDATE projects SET description = 'Sistema de automatización financiera para el seguimiento de operaciones y generación de reportes.', description_es = 'Sistema de automatización financiera para el seguimiento de operaciones y generación de reportes.' WHERE id = 44; -- FFFinanzas
UPDATE projects SET description = 'Sitio web para un espacio de coworking, con información de planes, servicios y reserva de espacios.', description_es = 'Sitio web para un espacio de coworking, con información de planes, servicios y reserva de espacios.' WHERE id = 76; -- Urbis Coworking
UPDATE projects SET description = 'Sitio web institucional para un centro educativo, con información de programas académicos y admisión.', description_es = 'Sitio web institucional para un centro educativo, con información de programas académicos y admisión.' WHERE id = 39; -- Aprende +
UPDATE projects SET description = 'Sitio web para un despacho de abogados, con áreas de práctica y formulario de consulta legal.', description_es = 'Sitio web para un despacho de abogados, con áreas de práctica y formulario de consulta legal.' WHERE id = 51; -- España Abogados
UPDATE projects SET description = 'Asistente virtual con inteligencia artificial para el sector salud, diseñado para resolver consultas de pacientes.', description_es = 'Asistente virtual con inteligencia artificial para el sector salud, diseñado para resolver consultas de pacientes.' WHERE id = 45; -- Inoia AI
UPDATE projects SET description = 'Tienda online con catálogo de productos, carrito de compra y proceso de pago para ventas al público.', description_es = 'Tienda online con catálogo de productos, carrito de compra y proceso de pago para ventas al público.' WHERE id = 54; -- Amysa Shop
UPDATE projects SET description = 'Sitio web para un alojamiento rural, con presentación de habitaciones, servicios y reservas.', description_es = 'Sitio web para un alojamiento rural, con presentación de habitaciones, servicios y reservas.' WHERE id = 49; -- Amazona Rural
UPDATE projects SET description = 'Sitio web para un taller mecánico especializado en vehículos todoterreno, con servicios y contacto.', description_es = 'Sitio web para un taller mecánico especializado en vehículos todoterreno, con servicios y contacto.' WHERE id = 59; -- Offroand Perú
UPDATE projects SET description = 'Sitio web para una institución educativa infantil, con información del programa y proceso de matrícula.', description_es = 'Sitio web para una institución educativa infantil, con información del programa y proceso de matrícula.' WHERE id = 50; -- Ozsagales Edu
UPDATE projects SET description = 'Tienda online con catálogo de productos y gestión de pedidos.', description_es = 'Tienda online con catálogo de productos y gestión de pedidos.' WHERE id = 47; -- El ganso y Guti
UPDATE projects SET description = 'Sitio web corporativo para una empresa de venta e instalación de ventanas, con catálogo y cotización online.', description_es = 'Sitio web corporativo para una empresa de venta e instalación de ventanas, con catálogo y cotización online.' WHERE id = 55; -- Enova Windows
UPDATE projects SET description = 'Sitio web inmobiliario para la promoción de un desarrollo residencial, con información de unidades disponibles.', description_es = 'Sitio web inmobiliario para la promoción de un desarrollo residencial, con información de unidades disponibles.' WHERE id = 80; -- Calnegre
UPDATE projects SET description = 'Landing page para una agencia inmobiliaria, enfocada en la captación de leads y presentación de propiedades.', description_es = 'Landing page para una agencia inmobiliaria, enfocada en la captación de leads y presentación de propiedades.' WHERE id = 56; -- Taklab Agency
UPDATE projects SET description = 'Sitio web para una clínica de salud, con presentación de especialidades médicas y formulario de citas.', description_es = 'Sitio web para una clínica de salud, con presentación de especialidades médicas y formulario de citas.' WHERE id = 57; -- Chancay Medic
UPDATE projects SET description = 'Sitio web para una droguería e importadora de productos de salud, con catálogo y contacto comercial.', description_es = 'Sitio web para una droguería e importadora de productos de salud, con catálogo y contacto comercial.' WHERE id = 58; -- Tapmedic
UPDATE projects SET description = 'Panel administrativo web para la gestión interna de una institución educativa.', description_es = 'Panel administrativo web para la gestión interna de una institución educativa.' WHERE id = 53; -- Segittur web
UPDATE projects SET description = 'Sistema automatizado para el seguimiento de balances financieros y generación de reportes.', description_es = 'Sistema automatizado para el seguimiento de balances financieros y generación de reportes.' WHERE id = 46; -- FinanTrack
UPDATE projects SET description = 'Sistema web para una clínica dental, con gestión de citas y presentación de servicios.', description_es = 'Sistema web para una clínica dental, con gestión de citas y presentación de servicios.' WHERE id = 63; -- Vinvata Dental
UPDATE projects SET description = 'Dashboard de gestión de clientes con seguimiento de interacciones y reportes automatizados.', description_es = 'Dashboard de gestión de clientes con seguimiento de interacciones y reportes automatizados.' WHERE id = 72; -- Dashboard MM
UPDATE projects SET description = 'Presencia digital para doctores ocupados: diseño y publicación del sitio a cargo del equipo, aprobación simple para el cliente.', description_es = 'Presencia digital para doctores ocupados: diseño y publicación del sitio a cargo del equipo, aprobación simple para el cliente.' WHERE id = 79; -- HIDoctors (tagline pulida, no reemplazada del todo)
UPDATE projects SET description = 'Sitio web para un seguro de salud, con información de coberturas y gestión de pólizas en línea.', description_es = 'Sitio web para un seguro de salud, con información de coberturas y gestión de pólizas en línea.' WHERE id = 81; -- ERSM Canarias

-- ==========================================
-- 🔍 Verificar antes/después
-- ==========================================
-- SELECT id, title, description FROM projects WHERE id IN (40,77,82,41,75,61,43,37,38,78,48,65,42,44,76,39,51,45,54,49,59,50,47,55,80,56,57,58,53,46,63,72,79,81);
