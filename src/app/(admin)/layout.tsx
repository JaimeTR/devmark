import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Devmark',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-brand-navy text-white p-6 flex flex-col gap-6">
            <div className="font-logo text-xl tracking-wider">DEVMARK</div>
            <nav className="flex flex-col gap-1">
              <a href="/admin" className="px-3 py-2 rounded-lg hover:bg-white/10 text-sm font-medium">Dashboard</a>
              <a href="/admin/proyectos" className="px-3 py-2 rounded-lg hover:bg-white/10 text-sm font-medium">Proyectos</a>
              <a href="/admin/servicios" className="px-3 py-2 rounded-lg hover:bg-white/10 text-sm font-medium">Servicios</a>
              <a href="/admin/blog" className="px-3 py-2 rounded-lg hover:bg-white/10 text-sm font-medium">Blog</a>
              <a href="/admin/precios" className="px-3 py-2 rounded-lg hover:bg-white/10 text-sm font-medium">Precios</a>
            </nav>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
