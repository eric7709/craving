export function formatRelativeDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  // Case 1: Just now
  if (diffMinutes < 1) {
    return "just now";
  }

  // Case 2: Minutes ago
  if (diffMinutes < 60) {
    return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  }

  // Case 3: Today
  if (isToday) {
    return `Today ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  // Case 4: Yesterday
  if (isYesterday) {
    return `Yesterday ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  // Case 5: Fallback — older dates
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
