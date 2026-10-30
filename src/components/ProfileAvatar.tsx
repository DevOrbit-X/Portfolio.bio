import { motion } from "framer-motion";
import profileAsset from "@/assets/govardhan-profile.jpg.asset.json";

type Props = {
  /** Tailwind size classes, e.g. "h-72 w-72" */
  className?: string;
  alt?: string;
  /** soft brand-coloured halo behind the shape */
  glow?: boolean;
  /** slow bobbing motion; disable in tight UI like the nav bar */
  float?: boolean;
};

export function ProfileAvatar({
  className = "h-64 w-64",
  alt = "Govardhan P",
  glow = true,
  float = true,
}: Props) {
  return (
    <div className={`${float ? "animate-float" : ""} ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: -2 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative h-full w-full"
      >
        {glow && (
          <div aria-hidden className="bg-gradient-brand blob-shape absolute -inset-6 opacity-40 blur-3xl" />
        )}

        {/* brand gradient ring */}
        <div className="bg-gradient-brand blob-shape absolute inset-0 p-[3px]">
          <div className="blob-shape h-full w-full bg-background/85 p-[6px]">
            <div className="blob-shape relative h-full w-full overflow-hidden bg-muted">
              <img
                src={profileAsset.url}
                alt={alt}
                loading="eager"
                decoding="async"
                className="h-full w-full scale-[1.04] object-cover"
                style={{ objectPosition: "50% 30%" }}
              />
              {/* pulls the photo's colours toward the portfolio palette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 mix-blend-soft-light"
              />
              {/* soft inner vignette + hairline so the edge reads crisply */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow:
                    "inset 0 0 46px 8px color-mix(in oklab, var(--background) 78%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
