import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative bg-base-950 px-6 py-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="glass mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center"
      >
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Want to Know the Minds Behind DESPU?
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#team"
            className="rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-7 py-3 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
          >
            Meet the Team →
          </a>
          <a
            href="#journey"
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            Follow Our Journey
          </a>
        </div>
      </motion.div>
    </section>
  );
}
