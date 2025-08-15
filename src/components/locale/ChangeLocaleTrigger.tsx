"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ukr', name: 'Українська', flag: '🇺🇦' }
];

function ChangeLocaleTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentLocale = useLocale();

  const changeLocale = (localeCode: string) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `NEXT_LOCALE=${localeCode}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    
    setIsOpen(false);
    
    router.refresh();
  };

  const currentLocaleData = locales.find(locale => locale.code === currentLocale);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
        aria-label="Change language"
      >
        <span className="hidden sm:inline">{currentLocaleData?.flag}</span>
        <span className="hidden md:inline">{currentLocaleData?.name}</span>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 z-20 min-w-[160px] rounded-md border bg-background shadow-lg">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => changeLocale(locale.code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                  currentLocale === locale.code 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{locale.flag}</span>
                  <span>{locale.name}</span>
                  {currentLocale === locale.code && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ChangeLocaleTrigger;