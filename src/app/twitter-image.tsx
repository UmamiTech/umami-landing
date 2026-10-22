import { ImageResponse } from "next/og";

// The link preview for every page (WhatsApp, Messenger, Facebook, LinkedIn, X).
// Nested pages inherit it. Plain shapes and the default font only, so the build
// never depends on fetching a font or an asset.
export const alt = "Umami — QR ordering for restaurants. Works with your POS.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#121212",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700, color: "#a9500a" }}>
          umami
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            QR ordering for restaurants.
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#a9500a" }}>
            Works with your POS.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#4a4a4a" }}>
            Scan. Order. It’s cooking. Free to start.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#4a4a4a" }}>
          umami.com.ph · Made in the Philippines
        </div>
      </div>
    ),
    { ...size },
  );
}
