import type { ComponentType } from "react";

interface EmptyStateProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 p-3.5 mb-4 text-black/70 dark:text-white/70">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-sans text-lg font-semibold text-neutral-900 dark:text-white">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 font-sans text-sm text-black/50 dark:text-white/50 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6">
          {action.href ? (
            <a
              href={action.href}
              className="inline-flex items-center rounded-full bg-black text-white dark:bg-white dark:!text-black px-5 py-2 text-sm font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              {action.label}
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center rounded-full bg-black text-white dark:bg-white dark:!text-black px-5 py-2 text-sm font-semibold hover:opacity-90 transition-all shadow-sm cursor-pointer"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
