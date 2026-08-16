export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-navy mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <span className="text-xs font-extrabold text-brand-blue uppercase tracking-wider">Proyectos</span>
          <p className="text-4xl font-extrabold text-brand-navy mt-2">18</p>
          <p className="text-sm text-slate-500 mt-1">Activos en portafolio</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <span className="text-xs font-extrabold text-brand-blue uppercase tracking-wider">Servicios</span>
          <p className="text-4xl font-extrabold text-brand-navy mt-2">10</p>
          <p className="text-sm text-slate-500 mt-1">Publicados</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <span className="text-xs font-extrabold text-brand-blue uppercase tracking-wider">Blog</span>
          <p className="text-4xl font-extrabold text-brand-navy mt-2">13</p>
          <p className="text-sm text-slate-500 mt-1">Posts publicados</p>
        </div>
      </div>
    </div>
  );
}
