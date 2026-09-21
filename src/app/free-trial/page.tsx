import LandingPage, { landingMetadata } from "@/components/LandingPage";

export const metadata = landingMetadata("free-trial");

export default function Page() {
  return <LandingPage slug="free-trial" />;
}
