import Image from "next/image";
import Container from "../ui/Container";
import Headline from "../ui/Headline";
import Reveal from "../ui/Reveal";
import { DISH_SOURCE } from "@/lib/dishes";

const FIGHTS = [
  { problem: "The internet drops mid-service.", answer: "Umami keeps taking orders. Nobody at the table notices." },
  { problem: "The menu changed. Reprint again.", answer: "Edit it once. Every table sees it within seconds." },
  { problem: "Five branches, five spreadsheets.", answer: "One dashboard with every branch’s sales, live." },
  { problem: "Where is table 12’s bill?", answer: "The bill builds itself from the order. Guests see it too." },
  { problem: "Tourists can’t read the menu.", answer: "Six languages, translated for you." },
  { problem: "Tablets cost a fortune and break.", answer: "Guests use their own phones. You start free." },
];

export default function Fights() {
  return (
    <section id="why" className="relative scroll-mt-20 bg-paper py-24 md:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Headline lines={["Nightly fights,", "settled."]} className="text-[40px] md:text-[72px] lg:text-[64px]" />
              <Reveal from="scale" className="mt-12">
                <figure>
                  <div className="relative aspect-square overflow-hidden rounded-[24px] bg-white">
                    <Image
                      src="/photos/barkada-set.webp"
                      alt="A Barkada Set for four laid out on a grill table: meats, rice, sides and sauces."
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[14px] text-muted">
                    Barkada Set for four, from the {DISH_SOURCE} menu.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          <ul className="lg:col-span-7 lg:pl-8">
            {FIGHTS.map((f, i) => (
              <li key={f.problem} className={i ? "mt-12 md:mt-16" : ""}>
                <Reveal>
                  <p className="text-[18px] text-muted md:text-[21px]">{f.problem}</p>
                  <p className="mt-2 font-display text-[24px] leading-[1.15] tracking-[-0.02em] md:text-[36px]">
                    {f.answer}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
