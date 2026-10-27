import Container from "../ui/Container";
import Headline from "../ui/Headline";
import BrandIcon from "../ui/BrandIcon";

const beats = [
  { year: "2018", title: "Opened a restaurant", body: "A restaurateur, not a coder. I lived the chaos before I tried to fix it." },
  { year: "2018 to 2021", title: "Tried everything", body: "Table beepers, tablets, POS terminals costing six figures. They broke, and we went back to pen and paper." },
  { year: "2022", title: "Started building Umami", body: "The system I needed as a guest and as an owner, written by someone who has worked the floor." },
  { year: "2024", title: "First chains went live", body: "Romantic Baboy and Kalei Cafe Bar. Real branches, real volume." },
  { year: "2025", title: "Built for bad internet", body: "Restaurants can run a full night without a connection." },
  { year: "2026", title: "Open to every restaurant", body: "A free plan for the first hundred. The goal: every café and restaurant in the Philippines." },
];

export default function Story() {
  return (
    <section id="story" data-chapter="white" className="chapter-white relative scroll-mt-20 py-24 md:py-40">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Headline lines={["Built on a", "restaurant floor."]} className="text-[40px] md:text-[72px]" />
            <div className="mt-12">
              <blockquote className="max-w-lg text-[24px] leading-[1.35] lg:text-[32px]">
                &ldquo;In 2018 I opened a restaurant. By 2022 I had built the software I wished it had
                from day one.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <BrandIcon className="size-11" />
                <div className="text-[16px] leading-tight">
                  <div className="font-semibold">Sean Lim</div>
                  <div className="text-muted">Founder, Umami</div>
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:pt-4">
            {beats.map((b, i) => (
              <li key={b.year} className={i ? "mt-10" : ""}>
                <div>
                  <div className="grid grid-cols-[7.5rem_1fr] gap-4 md:grid-cols-[9rem_1fr]">
                    <div className="pt-1 text-[16px] font-medium tabular-nums text-brand-ink">{b.year}</div>
                    <div>
                      <h3 className="text-[21px] font-semibold leading-tight">{b.title}</h3>
                      <p className="mt-1.5 text-[18px] text-muted">{b.body}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
