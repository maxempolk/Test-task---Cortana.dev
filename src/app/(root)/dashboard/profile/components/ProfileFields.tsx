import { User } from '@/auth/types/user';
import { useTranslations } from 'next-intl';
import React from 'react'

interface ProfileFieldsProps {
  user: User;
}

function ProfileFields({ user }: ProfileFieldsProps) {
  const t = useTranslations("Profile");

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
            <div className="text-sm text-muted-foreground">{t("id")}</div>
            <div className="text-base font-medium break-all">{user?.id}</div>
        </div>
        <div>
            <div className="text-sm text-muted-foreground">{t("name")}</div>
            <div className="text-base font-medium">{user?.name}</div>
        </div>
        <div>
            <div className="text-sm text-muted-foreground">{t("email")}</div>
            <div className="text-base font-medium break-all">{user?.email}</div>
        </div>
      </div>
    </>
  )
}

export default ProfileFields