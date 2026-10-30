import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { PageTitle } from "@/components/Shell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Govardhan P" },
    { name: "description", content: "Send Govardhan P a message about projects, roles or collaborations." },
    { property: "og:title", content: "Contact Govardhan P" },
    { property: "og:description", content: "Say hello — projects, roles or collaborations." },
  ] }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});
type F = z.infer<typeof schema>;

function Contact() {
  const [f, setF] = useState<F>({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) { setErr(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErr({}); setState("sending");
    setTimeout(() => setState("sent"), 1200);
  };
  const field = "w-full rounded-2xl border border-input bg-muted/50 px-4 py-3 outline-none transition focus:border-primary focus:shadow-glow";
  return (
    <>
      <PageTitle kicker="Say hello" title="Contact" />
      <div className="glass mx-auto max-w-xl rounded-3xl p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {state === "sent" ? (
            <motion.div key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-10 text-center">
              <motion.div initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                <CheckCircle2 size={80} className="mx-auto text-primary" />
              </motion.div>
              <h2 className="mt-4 text-3xl font-extrabold">Message sent!</h2>
              <p className="mt-2 text-muted-foreground">Thanks {f.name}, I'll get back to you soon.</p>
              <button onClick={() => { setF({ name: "", email: "", message: "" }); setState("idle"); }} className="mt-6 text-sm text-secondary underline">Send another</button>
            </motion.div>
          ) : (
            <motion.form key="form" exit={{ opacity: 0, y: -30 }} onSubmit={submit} noValidate className="grid gap-4">
              {(["name", "email"] as const).map((k) => (
                <div key={k}>
                  <input className={field} placeholder={k === "name" ? "Your name" : "Email address"} type={k === "email" ? "email" : "text"} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
                  {err[k] && <motion.p initial={{ x: -8 }} animate={{ x: [8, -6, 0] }} className="mt-1 text-sm text-destructive">{err[k]}</motion.p>}
                </div>
              ))}
              <div>
                <textarea rows={5} className={field} placeholder="Tell me about your project" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
                {err.message && <motion.p animate={{ x: [8, -6, 0] }} className="mt-1 text-sm text-destructive">{err.message}</motion.p>}
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={state === "sending"} className="bg-gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-primary-foreground shadow-glow">
                {state === "sending" ? "Sending…" : <>Send message <Send size={16} /></>}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
