const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isHoneypot(value: unknown) {
  return String(value ?? "").trim().length > 0;
}

export function clean(value: unknown, max = 2000) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

export function validEmail(value: string) {
  return EMAIL_RE.test(value) && value.length <= 120;
}

export function errorResponse(message: string, status: number) {
  return { ok: false as const, error: message, status };
}
