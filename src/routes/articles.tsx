import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageTitle } from "@/components/Shell";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [
    { title: "Featured Articles — Gokul" },
    { name: "description", content: "Writing on frontend craft, animation and web performance." },
    { property: "og:title", content: "Featured Articles — Gokul" },
    { property: "og:description", content: "Writing on frontend craft, animation and performance." },
  ] }),
  component: Articles,
});

const A = [
  { t: "Designing motion that feels physical", d: "Mar 2026", r: "6 min", tag: "Animation" },
  { t: "Shipping Three.js scenes that run on phones", d: "Jan 2026", r: "9 min", tag: "WebGL" },
  { t: "React Server Components, a year later", d: "Nov 2025", r: "7 min", tag: "React" },
  { t: "The 100ms rule for perceived performance", d: "Sep 2025", r: "5 min", tag: "Perf" },
  { t: "From student to SDE: what actually mattered", d: "Jun 2025", r: "8 min", tag: "Career" },
];

function Articles() {
  return (
    <>
      <PageTitle kicker="Writing" title="Featured Articles" />
      <ul className="divide-y divide-border">
        {A.map((a, i) => (
          <motion.li key={a.t} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
            <a href="#" className="group flex items-center gap-6 py-6 transition-colors">
              <span className="font-display text-3xl font-extrabold text-muted-foreground/40 transition-colors group-hover:text-primary">0{i + 1}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">{a.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.tag} · {a.d} · {a.r} read</p>
              </div>
              <ArrowUpRight className="text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
