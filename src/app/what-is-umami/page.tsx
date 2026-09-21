import LandingPage, { landingMetadata } from "@/components/LandingPage";

export const metadata = landingMetadata("what-is-umami");

export default function Page() {
  return <LandingPage slug="what-is-umami" />;
}
