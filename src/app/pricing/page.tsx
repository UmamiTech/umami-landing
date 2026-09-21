import LandingPage, { landingMetadata } from "@/components/LandingPage";

export const metadata = landingMetadata("pricing");

export default function Page() {
  return <LandingPage slug="pricing" />;
}
