import React from "react";

interface AuthFormErrorProps {
  error: string | null;
}

export function AuthFormError({ error }: AuthFormErrorProps) {
  if (!error) return null;

  return (
    <div className="text-sm bg-destructive/10 text-destructive border border-destructive/30 rounded-md p-3">
      {error}
    </div>
  );
}
