export default function Loading() {
  return (
    <div className="bg-paper">
      <div className="panel-ink mt-2 h-[460px] animate-pulse sm:mt-3" />
      <div className="panel-inner mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-mist" />
        ))}
      </div>
    </div>
  );
}
