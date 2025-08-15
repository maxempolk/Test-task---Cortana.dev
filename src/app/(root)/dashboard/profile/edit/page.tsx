import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { ProfileEditForm } from "./components";

async function ProfileEditPage() {
  const t = await getTranslations("Profile.Form");

  return (
    <div className="mx-auto mt-8 w-full max-w-screen-md px-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileEditPage;