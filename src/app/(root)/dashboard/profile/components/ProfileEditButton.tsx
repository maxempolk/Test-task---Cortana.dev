import { Button } from '@/components/ui/button'
import { CardAction } from '@/components/ui/card'
import Link from 'next/link'
import { useTranslations } from 'next-intl';
import React from 'react'

function ProfileEditButton() {
  const t = useTranslations("Profile");

  return (
    <CardAction>
        <Button asChild>
        <Link href={`/dashboard/profile/edit`}>
            {t("edit")}
        </Link>
        </Button>
    </CardAction>
  )
}

export default ProfileEditButton