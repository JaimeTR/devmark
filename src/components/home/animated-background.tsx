export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-light to-brand-lavender/40" />

      <div className="absolute -top-20 -right-20 w-[800px] h-[800px] rounded-full bg-brand-blue/[0.09] blur-[120px]" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-brand-lavender/[0.5] blur-[110px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-brand-navy/[0.07] blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-[650px] h-[650px] rounded-full bg-brand-blue/[0.07] blur-[130px]" />
      
      <div 
        className="absolute inset-0 h-full w-full" 
        style={{
          backgroundImage: "radial-gradient(circle at center, #4F4AD808 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
    </div>
  );
}
