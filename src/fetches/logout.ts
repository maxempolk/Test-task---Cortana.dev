const logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to logout");
  }

  return res.json();
};

export { logout };