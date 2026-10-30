import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram, FaYoutube as Youtube, FaXTwitter as Twitter } from "react-icons/fa6";
import { Particles } from "./Particles";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/articles", label: "Articles" },
  { to: "/profiles", label: "Profiles" },
  { to: "/resume", label: "Resume" },
  { to: "/hire", label: "Hire Me" },
  { to: "/contact", label: "Contact" },
] as const;

export const SOCIALS = [
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
];

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ href, label, Icon }) => (
        <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
          whileHover={{ y: -6, rotate: 8, scale: 1.15 }} whileTap={{ scale: 0.9 }}
          className="glass grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary hover:shadow-glow">
          <Icon size={18} />
        </motion.a>
      ))}
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-0 h-[50vh] w-[50vh] rounded-full bg-primary/25 blur-[120px]" />
        <div className="animate-blob absolute right-0 top-1/3 h-[45vh] w-[45vh] rounded-full bg-accent/20 blur-[120px] [animation-delay:-6s]" />
        <div className="animate-blob absolute bottom-0 left-1/3 h-[40vh] w-[40vh] rounded-full bg-secondary/20 blur-[120px] [animation-delay:-12s]" />
      </div>
      <Particles />
      <header className="fixed inset-x-0 top-0 z-40 px-4 py-4">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
          <Link to="/" className="font-display text-lg font-extrabold text-gradient">GOKUL.</Link>
          <ul className="hidden gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.to} className="relative">
                <Link to={n.to} className="relative z-10 block px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary-foreground">
                  {n.label}
                </Link>
                {pathname === n.to && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </li>
            ))}
          </ul>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </nav>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto mt-2 grid max-w-6xl gap-1 rounded-3xl p-3 lg:hidden">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-2 data-[status=active]:bg-primary data-[status=active]:text-primary-foreground">{n.label}</Link></li>
            ))}
          </motion.ul>
        )}
      </header>
      <motion.main key={pathname}
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto min-h-screen max-w-6xl px-5 pb-24 pt-28">
        {children}
      </motion.main>
      <footer className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">© 2026 Gokul. Crafted with motion.</p>
        <SocialLinks />
      </footer>
    </div>
  );
}

export function PageTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12">
      <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-2 text-sm uppercase tracking-[0.3em] text-secondary">{kicker}</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-extrabold sm:text-6xl">{title}</motion.h1>
    </div>
  );
}
