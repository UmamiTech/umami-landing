import LandingPage, { landingMetadata } from "@/components/LandingPage";

export const metadata = landingMetadata("works-with-your-pos");

export default function Page() {
  return <LandingPage slug="works-with-your-pos" />;
}
