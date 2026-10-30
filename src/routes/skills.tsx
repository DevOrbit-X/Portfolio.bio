import { createFileRoute } from "@tanstack/react-router";
import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Code2, Database, Palette, Server, Cloud, Boxes,
  FileCode, Paintbrush, Zap, Terminal, Coffee,
} from "lucide-react";
import { PageTitle } from "@/components/Shell";

export const Route = createFileRoute("/skills")({
  head: () => ({ meta: [
    { title: "Skills — Govardhan P" },
    { name: "description", content: "Govardhan P's technical skills: HTML, CSS, JavaScript, Python, Java and more." },
    { property: "og:title", content: "Skills — Govardhan P" },
    { property: "og:description", content: "Frontend, backend, cloud and design skills." },
  ] }),
  component: Skills,
});

export const SKILLS = [
  { n: "HTML5", v: 95, Icon: FileCode },
  { n: "CSS3", v: 92, Icon: Paintbrush },
  { n: "JavaScript", v: 90, Icon: Zap },
  { n: "Python", v: 88, Icon: Terminal },
  { n: "Java", v: 85, Icon: Coffee },
  { n: "React / TypeScript", v: 95, Icon: Code2 },
  { n: "Node.js", v: 88, Icon: Server },
  { n: "Three.js / WebGL", v: 78, Icon: Boxes },
  { n: "SQL & NoSQL", v: 82, Icon: Database },
  { n: "Cloud & DevOps", v: 70, Icon: Cloud },
  { n: "UI / Motion design", v: 90, Icon: Palette },
];

function Skill({ s, i }: { s: (typeof SKILLS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => { if (inView) { const c = animate(0, s.v, { duration: 1.6, delay: i * 0.1, onUpdate: (v) => setN(Math.round(v)) }); return () => c.stop(); } return undefined; }, [inView, s.v, i]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.1 }} className="glass rounded-3xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} className="bg-gradient-brand grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-primary-foreground"><s.Icon /></motion.div>
        <p className="flex-1 text-sm font-semibold">{s.n}</p>
        <p className="font-display text-xl font-extrabold text-primary">{n}%</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div className="bg-gradient-brand h-full rounded-full" initial={{ width: 0 }} animate={inView ? { width: `${s.v}%` } : {}} transition={{ duration: 1.6, delay: i * 0.1, ease: "easeOut" }} />
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <>
      <PageTitle kicker="Toolkit" title="My Skills" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{SKILLS.map((s, i) => <Skill key={s.n} s={s} i={i} />)}</div>
    </>
  );
}
