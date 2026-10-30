import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/hire")({
  head: () => ({ meta: [
    { title: "Hire Govardhan P — Let's Build Together" },
    { name: "description", content: "Available for freelance and full-time roles. Let's build something remarkable." },
    { property: "og:title", content: "Hire Govardhan P" },
    { property: "og:description", content: "Available for freelance and full-time roles." },
  ] }),
  component: Hire,
});

function Hire() {
  return (
    <section className="grid min-h-[70vh] place-items-center text-center">
      <div>
        <motion.h1 initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 120 }}
          className="text-5xl font-extrabold sm:text-8xl">Got an idea?<br /><span className="text-gradient">Let's ship it.</span></motion.h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">Open to freelance projects and full-time roles. I reply within 24 hours.</p>
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[{ to: "/contact" as const, label: "Hire Me" }, { to: "/contact" as const, label: "Contact" }].map((b, i) => (
            <motion.div key={b.label} animate={{ boxShadow: ["var(--shadow-glow)", "0 0 70px 0 color-mix(in oklab, var(--primary) 50%, transparent)", "var(--shadow-glow)"] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i }} className="rounded-full">
              <motion.div whileHover={{ scale: 1.1, filter: "blur(0.6px)", skewX: -6 }} whileTap={{ scale: 0.95 }}>
                <Link to={b.to} className={`block rounded-full px-10 py-4 text-lg font-bold ${i ? "glass" : "bg-gradient-brand text-primary-foreground"}`}>{b.label}</Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <a href="mailto:govardhanchemist@gmail.com" className="mt-10 inline-block text-sm text-secondary underline underline-offset-4">govardhanchemist@gmail.com</a>
      </div>
    </section>
  );
}
