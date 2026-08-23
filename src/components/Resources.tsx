import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { EASE } from "../lib/motion";
import { resources } from "../data/resources";

export default function Resources() {
  if (resources.length === 0) return null;

  return (
    <section className="relative bg-base-950 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Resources
          </span>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
            Read More
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {resources.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-3 rounded-2xl px-5 py-4 transition-colors hover:border-accent-cyan/30"
            >
              <FileText className="text-accent-cyan" size={18} />
              <div>
                <p className="text-sm font-medium text-white">{r.label}</p>
                {r.description && <p className="text-xs text-white/45">{r.description}</p>}
              </div>
              <ExternalLink size={14} className="ml-2 text-white/30" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
