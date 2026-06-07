import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../hooks/useUser.js';
import { useSession } from '../hooks/useSession.js';

export interface UserButtonProps {
  /** Called after sign out completes */
  onSignOut?: () => void;
  className?: string;
}

/** Avatar button with a dropdown showing the user's email and a sign-out option. */
export function UserButton({ onSignOut, className }: UserButtonProps) {
  const { user, isLoading } = useUser();
  const { signOut } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (isLoading) return null;
  if (!user) return null;

  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((n) => n![0]!.toUpperCase())
    .join('') || user.email[0]!.toUpperCase();

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    onSignOut?.();
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }} className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        title={user.email}
      >
        {initials}
      </button>

      {open && (
        <div role="menu">
          <div>
            {user.firstName && user.lastName && (
              <p>{`${user.firstName} ${user.lastName}`}</p>
            )}
            <p>{user.email}</p>
          </div>
          <hr />
          <button type="button" role="menuitem" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
