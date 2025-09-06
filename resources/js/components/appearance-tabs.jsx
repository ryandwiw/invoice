"use client";
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AppearanceToggleTab({ className = '', ...props }) {
  const { appearance, updateAppearance } = useAppearance();

  const tabs = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div
      className={cn(
        'relative inline-flex gap-2 p-1 rounded-xl bg-base-200 shadow-sm',
        className
      )}
      {...props}
    >
      {tabs.map(({ value, icon: Icon, label }) => {
        const isActive = appearance === value;

        return (
          <button
            key={value}
            onClick={() => updateAppearance(value)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300',
              'btn ',
              isActive ? 'btn-primary text-white' : 'btn-ghost'
            )}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 z-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </AnimatePresence>

            <Icon className="relative z-10 w-5 h-5" />
            <span className="relative z-10 text-sm">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
