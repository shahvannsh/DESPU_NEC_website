import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, User } from "lucide-react";
import type { TeamMember } from "../data/team";

interface Props {
  member: TeamMember;
  onOpen: () => void;
}

export default function TeamCard({ member, onOpen }: Props) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.button
      ref={cardRef}
      layoutId={`card-${member.id}`}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage:
          "radial-gradient(320px circle at var(--x) var(--y), rgba(34,211,238,0.08), transparent 70%)",
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-colors hover:border-accent-cyan/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
      aria-label={`View profile of ${member.name}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-base-800">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <User size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-950/90 via-base-950/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold text-white transition-transform group-hover:translate-x-0.5">
          {member.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-accent-cyan/80">{member.role}</p>
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/50">
          {member.tagline}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-white/70">
          View Profile
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </motion.button>
  );
}
