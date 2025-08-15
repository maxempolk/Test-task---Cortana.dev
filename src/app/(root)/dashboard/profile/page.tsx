"use client";
import { UserContext, UserContextType } from '@/app/UserProvider';
import React, { useContext } from 'react'
import ProfileEditButton from './components/ProfileEditButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import ProfileFields from './components/ProfileFields';

function OwnProfilePage() {
  const { user } = useContext(UserContext) as UserContextType;
  const t = useTranslations("Profile");

  if(!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-screen-md px-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <ProfileEditButton />
        </CardHeader>
        <CardContent className="space-y-6">
          <ProfileFields user={user} />
        </CardContent>
      </Card>
    </div>
  )
}

export default OwnProfilePage