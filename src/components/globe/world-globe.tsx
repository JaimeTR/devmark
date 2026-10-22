'use client';

import { useEffect, useRef } from 'react';

// Globo 3D rescatado del viejo repo de portafolio (devmarkpe), reescrito con
// three + three-globe a secas: sin @react-three/fiber, que exige otra version
// de React. Todo lo pesado (three, three-globe y el GeoJSON de paises) se
// importa recien cuando el globo esta por entrar en pantalla.

export type GlobeArc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  /** Altura del arco: 0.1 cerca, 0.5 cruzando continentes. */
  alt: number;
};

type WorldGlobeProps = {
  arcs: GlobeArc[];
  /** Origen de los arcos: lleva el anillo que late. */
  focus: { lat: number; lng: number };
  /** Centro del encuadre; por defecto el foco. */
  view?: { lat: number; lng: number };
  /** Sobre fondo claro (paneles niebla) u oscuro (paneles tinta). */
  tone?: 'light' | 'dark';
  className?: string;
};

// Sobre tinta el globo es casi del color del panel y los paises brillan en pervinca.
const DARK = {
  polygon: 'rgba(169, 180, 255, 0.5)',
  surface: '#1C1640',
  emissive: '#110C29',
  atmosphere: '#3D34BC',
  arc: ['#A9B4FF', '#FFFFFF'],
  point: '#CBD5FA',
  ring: (t: number) => `rgba(203, 213, 250, ${1 - t})`,
};

// Lee un token "H S% L%" de globals.css y lo devuelve como hsla() con comas,
// el unico formato que entienden tanto three como three-globe.
function tokenColor(name: string, alpha = 1) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '244 57% 47%';
  const [h, s, l] = value.split(/\s+/);
  return alpha === 1 ? `hsl(${h}, ${s}, ${l})` : `hsla(${h}, ${s}, ${l}, ${alpha})`;
}

export function WorldGlobe({ arcs, focus, view = focus, tone = 'light', className }: WorldGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const [THREE, { default: ThreeGlobe }, countries] = await Promise.all([
        import('three'),
        import('three-globe'),
        import('@/data/globe-countries.json'),
      ]);
      if (disposed) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const primary = tokenColor('--primary');
      const teal = tokenColor('--chart-2');
      const dark = tone === 'dark';

      const globe = new ThreeGlobe({ animateIn: !reducedMotion })
        .hexPolygonsData(countries.default.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.65)
        .hexPolygonColor(() => (dark ? DARK.polygon : tokenColor('--primary', 0.55)))
        .showAtmosphere(true)
        .atmosphereColor(dark ? DARK.atmosphere : tokenColor('--border'))
        .atmosphereAltitude(0.15)
        .arcsData(arcs)
        .arcStartLat((d) => (d as GlobeArc).startLat)
        .arcStartLng((d) => (d as GlobeArc).startLng)
        .arcEndLat((d) => (d as GlobeArc).endLat)
        .arcEndLng((d) => (d as GlobeArc).endLng)
        .arcAltitude((d) => (d as GlobeArc).alt)
        .arcColor(() => (dark ? DARK.arc : [primary, teal]))
        .arcStroke(0.8)
        .arcDashLength(reducedMotion ? 1 : 0.9)
        .arcDashGap(reducedMotion ? 0 : 1)
        .arcDashInitialGap(() => Math.random() * 2)
        .arcDashAnimateTime(reducedMotion ? 0 : 3000)
        .pointsData([focus, ...arcs.map((a) => ({ lat: a.endLat, lng: a.endLng }))])
        .pointColor(() => (dark ? DARK.point : primary))
        .pointAltitude(0.01)
        .pointRadius(0.6)
        .ringsData(reducedMotion ? [] : [focus])
        .ringColor(() => (dark ? DARK.ring : (t: number) => tokenColor('--primary', 1 - t)))
        .ringMaxRadius(5)
        .ringPropagationSpeed(2)
        .ringRepeatPeriod(1400);

      const material = globe.globeMaterial() as InstanceType<typeof THREE.MeshPhongMaterial>;
      material.color = new THREE.Color(dark ? DARK.surface : tokenColor('--secondary'));
      material.emissive = new THREE.Color(dark ? DARK.emissive : tokenColor('--secondary'));
      material.emissiveIntensity = dark ? 0.6 : 0.35;
      material.shininess = 0.6;

      // three-globe pone la longitud 0 frente a la camara: se gira -lng para
      // traer el encuadre al frente y se inclina lat para centrarlo.
      const baseY = (-view.lng * Math.PI) / 180;
      globe.rotation.y = baseY;
      globe.rotation.x = (view.lat * Math.PI) / 180;

      const scene = new THREE.Scene();
      scene.add(globe);
      scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.9 : 2.2));
      const light = new THREE.DirectionalLight(dark ? 0xa9b4ff : 0xffffff, dark ? 0.8 : 1.2);
      light.position.set(-200, 300, 400);
      scene.add(light);

      const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
      camera.position.z = 290;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      container.appendChild(renderer.domElement);

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      // Solo dibuja mientras se ve: fuera de pantalla no gasta bateria.
      let visible = true;
      let frame = 0;
      // Vaiven suave alrededor del foco en vez de giro completo: Lima no se pierde de vista.
      const render = (time: number) => {
        frame = 0;
        if (!visible) return;
        if (!reducedMotion) globe.rotation.y = baseY + Math.sin(time / 4000) * 0.25;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) frame = requestAnimationFrame(render);
      });
      visibility.observe(container);
      frame = requestAnimationFrame(render);

      cleanup = () => {
        cancelAnimationFrame(frame);
        visibility.disconnect();
        resizeObserver.disconnect();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // No descarga nada hasta que el globo esta cerca de la pantalla.
    const lazy = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        lazy.disconnect();
        void start();
      },
      { rootMargin: '200px' },
    );
    lazy.observe(container);

    return () => {
      disposed = true;
      lazy.disconnect();
      cleanup?.();
    };
  }, [arcs, focus, view, tone]);

  return <div ref={containerRef} className={className} />;
}
