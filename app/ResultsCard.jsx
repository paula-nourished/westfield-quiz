
import React from "react";

const SKU_INFO = {
  Energy: {
    title: "Energy",
    copy: "Helps reduce tiredness and supports everyday vitality.",
    ingredients: ["Vitamin C 48mg", "Iron 12mg", "Vitamin B12 2μg", "Vitamin E 18mg", "Vitamin D 150 IU", "Ginger Extract 100mg"],
    cta: "Shop Energy",
  },
  Balance: {
    title: "Balance",
    copy: "Supports mood, stress resilience and overall balance.",
    ingredients: ["CoQ10 21mg", "Resveratrol 100mg", "Vitamin E 18mg", "Zinc 10mg", "Vitamin C 48mg", "Selenium 55μg"],
    cta: "Shop Balance",
  },
  Detox: {
    title: "Detox",
    copy: "Liver support and lighter-feeling digestion.",
    ingredients: ["Milk Thistle 100mg", "Iron 12mg", "Vitamin B12 2μg", "Vitamin C 48mg", "Zinc 10mg"],
    cta: "Shop Detox",
  },
  Immunity: {
    title: "Immunity",
    copy: "Daily immune support to help you stay resilient.",
    ingredients: ["Ginger Extract 50mg", "Vitamin C 48mg", "Beta Glucan 25mg", "Vitamin E 9mg", "Iron 6mg", "Zinc 5mg"],
    cta: "Shop Immunity",
  },
  Beauty: {
    title: "Beauty",
    copy: "Skin, hair & nails support with beauty-from-within actives.",
    ingredients: ["CoQ10 60mg", "Vitamin C 48mg", "Resveratrol 50mg", "Vitamin E 9mg", "Selenium Yeast 27.5μg", "Zinc 5mg"],
    cta: "Shop Beauty",
  },
};

export default function ResultsCard({ sku = "Energy", onRestart, onCTA }) {
  const data = SKU_INFO[sku] || SKU_INFO.Energy;
  return (
    <div className="rounded-3xl p-6 md:p-8 bg-white" style={{ border: "2px solid #d6d1c9", boxShadow: "0 12px 32px rgba(21,50,71,.10)" }}>
      <h3 className="text-2xl md:text-3xl font-extrabold mb-2">{data.title}</h3>
      <p className="opacity-85 mb-4 md:mb-6">{data.copy}</p>
      <div className="text-left max-w-xl mx-auto mb-6">
        <div className="font-semibold mb-1">Key ingredients</div>
        <ul className="list-disc pl-5 space-y-1">
          {data.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
        </ul>
      </div>
      <div className="grid gap-3" style={{ width: "min(520px, 90vw)", marginInline: "auto" }}>
        <button
          onClick={onCTA}
          className="rounded-2xl py-3 px-5 font-semibold shadow"
          style={{ background:"#e2c181", color:"#153247", border:"1px solid #d6d1c9" }}
        >
          {data.cta}
        </button>
        <button
          onClick={onRestart}
          className="rounded-2xl py-3 px-5 font-semibold border"
          style={{ background:"#fff", color:"#153247", border:"1px solid #d6d1c9" }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
