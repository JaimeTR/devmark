export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-screen">
      <div className="relative h-full w-full bg-background">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div 
          className="absolute inset-0 h-full w-full" 
          style={{
            backgroundImage: "radial-gradient(circle at center, hsla(var(--foreground) / 0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        />
      </div>
    </div>
  );
}
