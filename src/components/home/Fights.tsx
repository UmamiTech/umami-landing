import Image from "next/image";
import Container from "../ui/Container";
import Headline from "../ui/Headline";
import Reveal from "../ui/Reveal";
import { KALEI } from "@/lib/dishes";

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
    <section id="why" data-chapter="orange" className="chapter-orange relative scroll-mt-20 py-24 md:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Headline lines={["Nightly fights,", "settled."]} className="text-[40px] md:text-[72px] lg:text-[64px]" />
              <Reveal from="scale" className="mt-12">
                <figure>
                  <div className="relative aspect-square overflow-hidden rounded-[24px] bg-white p-6">
                    <Image
                      src="/photos/tenderloin-steak.webp"
                      alt="Tenderloin steak with truffle mashed potato, pepper gravy and vegetables."
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-contain p-6"
                    />
                  </div>
                  <figcaption className="mt-3 text-[14px] text-muted">
                    Tenderloin Steak with Truffle Mashed Potato, from the {KALEI} menu.
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
