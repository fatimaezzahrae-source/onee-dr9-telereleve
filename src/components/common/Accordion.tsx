import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string | number;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<Set<string | number>>(() => {
    const initial = new Set<string | number>();
    items.forEach(item => {
      if (item.defaultOpen) initial.add(item.id);
    });
    return initial;
  });

  const toggle = (id: string | number) => {
    setOpenIds(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map(item => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`border rounded-xl transition-colors overflow-hidden ${
              isOpen
                ? 'border-onee-300 dark:border-onee-800 bg-white dark:bg-slate-900 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-onee-500"
              aria-expanded={isOpen}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                    {item.title}
                  </span>
                  {item.badge}
                </div>
                {item.subtitle && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {item.subtitle}
                  </div>
                )}
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'transform rotate-180 text-onee-600 dark:text-onee-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in-50 duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
