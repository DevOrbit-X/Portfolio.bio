import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PageTitle } from "@/components/Shell";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [
    { title: "Projects — Gokul" },
    { name: "description", content: "Selected projects by Gokul: web apps, tools and experiments." },
    { property: "og:title", content: "Projects — Gokul" },
    { property: "og:description", content: "Selected web apps, tools and experiments." },
  ] }),
  component: Projects,
});

const P = [
  { t: "Nebula Dashboard", d: "Real-time analytics with streaming charts.", tags: ["React", "WebSockets"], seed: 10 },
  { t: "Pixel Forge", d: "Browser-based generative art studio.", tags: ["Three.js", "GLSL"], seed: 20 },
  { t: "Tasker AI", d: "Natural-language task planner.", tags: ["Node", "LLM"], seed: 30 },
  { t: "Campus Connect", d: "Social platform for 5k students.", tags: ["Next", "Postgres"], seed: 40 },
  { t: "Trailmix", d: "Offline-first hiking route maps.", tags: ["PWA", "Maps"], seed: 50 },
  { t: "Synthwave Music", d: "Web-audio sequencer toy.", tags: ["Web Audio"], seed: 60 },
];

function Card({ p, i }: { p: (typeof P)[number]; i: number }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]));
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]));
  return (
    <motion.article initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: (i % 3) * 0.1 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800, transformStyle: "preserve-3d" }}
      className="glass group overflow-hidden rounded-3xl">
      <div className="overflow-hidden">
        <img loading="lazy" src={`https://picsum.photos/seed/${p.seed}/600/400`} alt={p.t} className="aspect-[3/2] w-full object-cover opacity-80 grayscale transition duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0" />
      </div>
      <div className="p-5" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-center justify-between"><h3 className="text-xl font-bold">{p.t}</h3><ExternalLink size={16} className="text-primary" /></div>
        <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
        <div className="mt-3 flex gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs text-secondary">{t}</span>)}</div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <>
      <PageTitle kicker="Selected work" title="Projects" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{P.map((p, i) => <Card key={p.t} p={p} i={i} />)}</div>
    </>
  );
}
