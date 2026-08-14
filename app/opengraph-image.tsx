import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Agentic Rate Card — planning AI workflow time, tokens, and cost";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#f7f6f2",
        color: "#111111",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, Helvetica, sans-serif",
        height: "100%",
        padding: "38px 48px 34px",
        width: "100%",
      }}
    >
      <div style={{ background: "#111111", height: 2, width: "100%" }} />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", paddingTop: 34 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#555555", fontSize: 18, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>A practical planning guide</div>
          <div style={{ fontSize: 72, fontWeight: 400, letterSpacing: -4, lineHeight: 1, marginTop: 16 }}>Agentic Rate Card</div>
          <div style={{ color: "#555555", fontSize: 26, lineHeight: 1.3, marginTop: 23, maxWidth: 770 }}>Plan AI workflow time, token volume, model power, and rough API-equivalent cost.</div>
        </div>
        <div style={{ borderBottom: "1px solid #777777", borderTop: "1px solid #777777", display: "flex", padding: "21px 0" }}>
          {[
            ["Workflow", "Research, build, design, or infrastructure"],
            ["Run time", "Minutes, hours, or overnight"],
            ["Power", "Fast chat through deep reasoning"],
            ["Cost", "OpenAI · Claude · Kimi · GLM"],
          ].map(([label, detail], index) => (
            <div key={label} style={{ borderLeft: index ? "1px solid #c9c8c3" : "none", display: "flex", flexDirection: "column", padding: index ? "0 0 0 25px" : "0 25px 0 0", width: "25%" }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{label}</div>
              <div style={{ color: "#555555", fontSize: 15, lineHeight: 1.25, marginTop: 7 }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ color: "#555555", display: "flex", fontSize: 16, justifyContent: "space-between", paddingTop: 20 }}>
        <span>Agentic workflow calculator included</span><span>IDEO</span>
      </div>
    </div>,
    { ...size },
  );
}
