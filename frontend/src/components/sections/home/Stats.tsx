import { stats } from "@/data/home";

export function Stats() {
  return (
    <section className="border-y border-outline-variant/20 bg-surface-container-low py-16">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group text-center">
              <div className="mb-2 text-5xl font-bold leading-[56px] tracking-[-0.02em] text-primary transition-transform group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-label-md font-semibold uppercase tracking-widest text-on-surface-variant">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
