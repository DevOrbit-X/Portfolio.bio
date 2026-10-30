import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { ArrowRight, Trophy, Rocket, Users } from "lucide-react";
import { SocialLinks } from "@/components/Shell";
import { ProfileAvatar } from "@/components/ProfileAvatar";

const HeroScene = lazy(() => import("@/components/HeroScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Govardhan P — Full-Stack Developer Portfolio" },
      { name: "description", content: "Hi, I'm Govardhan P — a full-stack developer building fast, animated web experiences." },
      { property: "og:title", content: "Govardhan P — Full-Stack Developer" },
      { property: "og:description", content: "Animated developer portfolio: projects, skills, articles and more." },
    ],
  }),
  component: Index,
});

const ACH = [
  { Icon: Trophy, n: "12+", t: "Hackathon wins" },
  { Icon: Rocket, n: "40+", t: "Projects shipped" },
  { Icon: Users, n: "8k", t: "Community reach" },
];
const word = { hidden: { y: "110%" }, show: (i: number) => ({ y: 0, transition: { delay: 0.2 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }) };

function Index() {
  return (
    <>
      <section className="grid min-h-[80vh] items-center gap-8 lg:grid-cols-2">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-sm uppercase tracking-[0.3em] text-secondary">Full-Stack Developer · Creative Coder</motion.p>
          <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            {["Hi, I'm", "Govardhan P."].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span custom={i} variants={word} initial="hidden" animate="show" className={`block ${i ? "text-gradient" : ""}`}>{w}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6 max-w-md text-lg text-muted-foreground">
            I design and build fluid, motion-rich web apps — from pixel to production.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/projects" className="bg-gradient-brand group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-glow">
              View work <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
            </Link>
            <SocialLinks />
          </motion.div>
        </div>
        <div className="relative h-[380px] sm:h-[520px]">
          <div className="absolute inset-0">
            <ClientOnly fallback={null}><Suspense fallback={null}><HeroScene /></Suspense></ClientOnly>
          </div>
          <div className="relative grid h-full place-items-center">
            <ProfileAvatar className="h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">About me</h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm a software engineer who loves the intersection of design and code. I work across React, Node and cloud
            infrastructure, and obsess over the small details — easing curves, load times, and accessible interfaces.
            When I'm not shipping, I write about frontend craft and mentor student developers.
          </p>
        </motion.div>
        <div className="grid grid-cols-3 gap-3">
          {ACH.map(({ Icon, n, t }, i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 40, rotateX: -40 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="glass rounded-2xl p-4 text-center">
              <Icon className="mx-auto mb-2 text-primary" />
              <p className="font-display text-2xl font-extrabold">{n}</p>
              <p className="text-xs text-muted-foreground">{t}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
