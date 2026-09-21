import LandingPage, { landingMetadata } from "@/components/LandingPage";

export const metadata = landingMetadata("multi-branch");

export default function Page() {
  return <LandingPage slug="multi-branch" />;
}
