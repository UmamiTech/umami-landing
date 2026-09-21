import LandingPage, { landingMetadata } from "@/components/LandingPage";

export const metadata = landingMetadata("qr-ordering");

export default function Page() {
  return <LandingPage slug="qr-ordering" />;
}
