'use client';

import { useState } from 'react';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');

  return (
    <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
        aria-label="Email"
      />
      <button
        type="submit"
        className="h-10 rounded-md px-4 text-sm font-semibold text-white transition-colors hover:opacity-90"
        style={{ background: '#FF6B35' }}
      >
        Đăng ký
      </button>
    </form>
  );
}