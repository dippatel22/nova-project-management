import type { Activity } from '../types/nova';

export function makeActivity(action: string, details: string): Activity {
  return {
    id: crypto.randomUUID(),
    action,
    details,
    user: 'You',
    createdAt: Date.now(),
  };
}
