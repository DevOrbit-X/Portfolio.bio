import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Check } from "lucide-react";
import { PageTitle } from "@/components/Shell";

export const Route = createFileRoute("/resume")({
  head: () => ({ meta: [
    { title: "Resume — Govardhan P" },
    { name: "description", content: "Download Govardhan P's resume as a PDF." },
    { property: "og:title", content: "Resume — Govardhan P" },
    { property: "og:description", content: "Experience, education and skills in one PDF." },
  ] }),
  component: Resume,
});

function Resume() {
  const [done, setDone] = useState(false);
  return (
    <>
      <PageTitle kicker="Résumé" title="My journey, one PDF." />
      <motion.a href="/resume.pdf" download onClick={() => { setDone(true); setTimeout(() => setDone(false), 2500); }}
        whileHover={{ rotateY: 12, rotateX: -6, scale: 1.03 }} whileTap={{ scale: 0.96 }} style={{ transformPerspective: 900 }}
        className="glass group mx-auto flex max-w-md flex-col items-center gap-6 rounded-3xl p-10 hover:shadow-glow">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
          <FileText size={96} className="text-primary" strokeWidth={1.2} />
        </motion.div>
        <p className="font-display text-2xl font-bold">Govardhan_P_Resume.pdf</p>
        <span className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground">
          {done ? <><Check size={18} /> Downloading…</> : <><Download size={18} className="transition-transform group-hover:translate-y-1" /> Download</>}
        </span>
      </motion.a>
    </>
  );
}
