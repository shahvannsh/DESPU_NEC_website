import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Users2, GraduationCap, Network, ArrowRight } from "lucide-react";
import { EASE } from "../lib/motion";
import { startup, type StartupPillar } from "../data/startup";
import ProductStageTracker from "./ProductStageTracker";

const ICONS: Record<StartupPillar["icon"], typeof Target> = {
  graduation: GraduationCap,
  network: Network,
  target: Target,
  users: Users2,
};

export default function WhatWereBuilding() {
  return (
    <section className="relative bg-white text-neutral-900 dark:bg-base-950 dark:text-white px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3054ff] dark:text-accent-cyan">
            {startup.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-neutral-900 dark:text-white sm:text-4xl">
            {startup.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-white/55 sm:text-base">
            {startup.summary}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {startup.pillars.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                className="glass flex gap-4 rounded-2xl p-6 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent-cyan">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-white/55">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How it works — lightweight process strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="glass mt-6 rounded-2xl p-6 sm:p-8 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10"
        >
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40">
            How It Works
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {startup.steps.map((s, i) => (
              <div key={s.label} className="relative flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-cyan/40 text-[11px] font-semibold text-accent-cyan">
                    {i + 1}
                  </span>
                  <span className="font-display text-sm font-semibold text-neutral-900 dark:text-white">
                    {s.label}
                  </span>
                </div>
                <p className="pl-8 text-xs leading-relaxed text-neutral-600 dark:text-white/50">{s.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Partner / sponsor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02] p-6 text-center sm:flex-row sm:text-left"
        >
          <p className="text-sm text-neutral-700 dark:text-white/60">{startup.partnerCta.text}</p>
          <Link
            to={startup.partnerCta.linkHref}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 dark:border-white/15 px-5 py-2.5 text-sm font-medium text-neutral-900 dark:text-white transition-colors hover:border-accent-cyan/50"
          >
            {startup.partnerCta.linkLabel}
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <ProductStageTracker />
      </div>
    </section>
  );
}
