export const refresh = async () => {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      cache: 'no-store',
      credentials: 'include',
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}