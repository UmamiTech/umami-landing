export default function GradientBg() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        className="blob animate-float-slow"
        style={{
          width: 600,
          height: 600,
          background: "var(--brand)",
          opacity: 0.18,
          top: "-200px",
          left: "-100px",
        }}
      />
      <div
        className="blob animate-float-slow"
        style={{
          width: 500,
          height: 500,
          background: "#5b21b6",
          opacity: 0.15,
          top: "200px",
          right: "-150px",
          animationDelay: "-9s",
        }}
      />
    </>
  );
}
