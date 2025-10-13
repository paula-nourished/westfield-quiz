"use client";
import React from "react";

// Theme & assets (update after you upload the mockups)
const SKU_THEME = {
  Energy:   { accent: "#E2C181", bg: "#FFF9EF", text: "#153247", img: "/images/sku-energy.png",  badge: "Daily vitality" },
  Balance:  { accent: "#79B9B7", bg: "#F3FBFA", text: "#153247", img: "/images/sku-balance.png", badge: "Calm & focus" },
  Detox:    { accent: "#DC8B73", bg: "#FFF3EF", text: "#153247", img: "/images/sku-detox.png",   badge: "Liver & digestion" },
  Immunity: { accent: "#C7B6D8", bg: "#F8F6FB", text: "#153247", img: "/images/sku-immunity.png",badge: "Defense support" },
  Beauty:   { accent: "#E0D7C9", bg: "#FFFCF8", text: "#153247", img: "/images/sku-beauty.png",  badge: "Skin • Hair • Nails" },
};

const SKU_INFO = {
  Energy: {
    title: "Energy",
    copy: "Helps reduce tiredness and supports everyday vitality.",
    ingredients: ["Vitamin C 48mg","Iron 12mg","Vitamin B12 2μg","Vitamin E 18mg","Vitamin D 150 IU","Ginger Extract 100mg"],
    cta: "Shop Energy",
  },
  Balance: {
    title: "Balance",
    copy: "Supports mood, stress resilience and overall balance.",
    ingredients: ["CoQ10 21mg","Resveratrol 100mg","Vitamin E 18mg","Zinc 10mg","Vitamin C 48mg","Selenium 55μg"],
    cta: "Shop Balance",
  },
  Detox: {
    title: "Detox",
    copy: "Liver support and lighter-feeling digestion.",
    ingredients: ["Milk Thistle 100mg","Iron 12mg","Vitamin B12 2μg","Vitamin C 48mg","Zinc 10mg"],
    cta: "Shop Detox",
  },
  Immunity: {
    title: "Immunity",
    copy: "Daily immune support to help you stay resilient.",
    ingredients: ["Ginger Extract 50mg","Vitamin C 48mg","Beta Glucan 25mg","Vitamin E 9mg","Iron 6mg","Zinc 5mg"],
    cta: "Shop Immunity",
  },
  Beauty: {
    title: "Beauty",
    copy: "Skin, hair & nails support with beauty-from-within actives.",
    ingredients: ["CoQ10 60mg","Vitamin C 48mg","Resveratrol 50mg","Vitamin E 9mg","Selenium Yeast 27.5μg","Zinc 5mg"],
    cta: "Shop Beauty",
  },
};

export default function ResultsCard({
  sku = "Energy",
  layout = "stack", // "stack" | "side"
  onRestart,
  onCTA,
  reasons = [], // optional bullet points like “You selected X” etc.
}) {
  const theme = SKU_THEME[sku] || SKU_THEME.Energy;
  const data  = SKU_INFO[sku] || SKU_INFO.Energy;

  return (
    <div
  className="rounded-3xl p-6 md:p-8 mx-auto"
  style={{
    background: theme.bg,
    border: "2px solid #d6d1c9",
    boxShadow: "0 12px 32px rgba(21,50,71,.10)",
    color: theme.text,
    maxWidth: "620px",
    width: "100%",
  }}
>
      {/* header */}
      <div className={`grid gap-6 ${layout === "side" ? "md:grid-cols-2 items-center" : ""}`}>
        {/* image */}
        <div className={`${layout === "side" ? "" : "order-1"} flex justify-center`}>
          {theme.img && (
            <img
              src={theme.img}
              alt={data.title}
              className="max-h-64 w-auto"
              style={{ objectFit: "contain" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>

        {/* text */}
        <div className={`${layout === "side" ? "" : "order-2"} text-left`}>
          {theme.badge && (
            <div
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
              style={{ background: "#fff", border: `1px solid ${theme.accent}`, color: theme.text }}
            >
              {theme.badge}
            </div>
          )}
          <h3 className="text-3xl md:text-4xl font-extrabold mb-2">{data.title}</h3>
          <p className="text-base md:text-lg opacity-85 mb-4">{data.copy}</p>

          {/* optional “why” */}
          {reasons.length > 0 && (
            <div className="mb-4">
              <div className="font-semibold mb-1">Why this match</div>
              <ul className="list-disc pl-5 space-y-1">
                {reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

          {/* ingredients */}
          <div className="mb-6">
            <div className="font-semibold mb-1">Key ingredients</div>
            <ul className="list-disc pl-5 space-y-1">
              {data.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
            </ul>
          </div>

          {/* CTAs */}
          <div className="grid gap-3" style={{ width: "min(520px, 90vw)" }}>
            <button
              onClick={onRestart}
              className="rounded-2xl py-3 px-5 font-semibold border bg-white"
              style={{ color: "#153247", borderColor: "#d6d1c9" }}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
