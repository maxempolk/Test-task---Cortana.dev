import React from "react";

interface ProfileEditErrorProps {
  error: string | null;
}

export function ProfileEditError({ error }: ProfileEditErrorProps) {
  if (!error) return null;

  return (
    <div className="text-destructive text-sm" role="alert">
      {error}
    </div>
  );
}
