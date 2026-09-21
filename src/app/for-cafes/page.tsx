import LandingPage, { landingMetadata } from "@/components/LandingPage";

export const metadata = landingMetadata("for-cafes");

export default function Page() {
  return <LandingPage slug="for-cafes" />;
}
