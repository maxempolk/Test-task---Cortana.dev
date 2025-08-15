import React from 'react'
import { getUser } from '@/actions/user';
import { Card, CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import ProfileFields from '../components/ProfileFields';
import { getTranslations } from 'next-intl/server';

async function AnotherProfilePage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const user = await getUser(id);
  const t = await getTranslations("Profile");

  if (!user) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">{t("notFound")}</div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-screen-md px-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ProfileFields user={user} />
        </CardContent>
      </Card>
    </div>
  )
}

export default AnotherProfilePage