import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code, Terminal, Trophy, Award } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa6";
import { PageTitle } from "@/components/Shell";

export const Route = createFileRoute("/profiles")({
  head: () => ({ meta: [
    { title: "Coding Profiles — Gokul" },
    { name: "description", content: "Gokul on LeetCode, GitHub, SkillRack, HackerRank and Codeforces." },
    { property: "og:title", content: "Coding Profiles — Gokul" },
    { property: "og:description", content: "Competitive programming and open-source profiles." },
  ] }),
  component: Profiles,
});

const C = [
  { n: "LeetCode", s: "650+ solved · Knight", href: "https://leetcode.com", Icon: Code },
  { n: "GitHub", s: "1.2k contributions / yr", href: "https://github.com", Icon: Github },
  { n: "SkillRack", s: "900+ programs", href: "https://www.skillrack.com", Icon: Terminal },
  { n: "HackerRank", s: "5★ Problem Solving", href: "https://hackerrank.com", Icon: Award },
  { n: "Codeforces", s: "Specialist · 1480", href: "https://codeforces.com", Icon: Trophy },
];

function Profiles() {
  return (
    <>
      <PageTitle kicker="Out in the wild" title="Coding Profiles" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {C.map((c, i) => (
          <motion.a key={c.n} href={c.href} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 160, damping: 14, delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.03 }} className="glass group rounded-3xl p-6 hover:shadow-glow">
            <c.Icon size={36} className="text-primary transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
            <h3 className="mt-4 text-2xl font-bold">{c.n}</h3>
            <p className="text-sm text-muted-foreground">{c.s}</p>
          </motion.a>
        ))}
      </div>
    </>
  );
}
