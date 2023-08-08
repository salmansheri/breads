import AccountProfile from "@/components/forms/account-profile";
import { currentUser } from "@clerk/nextjs";

export default async function OnboardingPage() {
  const user = await currentUser();
  const userInfo = {};
  const userData = {
    id: user?.id,
    objectId: userInfo?.id,
    username: userInfo?.username || user?.firstName,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="text-black">
      <h1 className="head-text text-light-1">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-1">
        Complete Your Profie now to use Breads
      </p>
      <section className="mt-9  p-10 w-[80vh] bg-dark-2 text-light-1">
        <AccountProfile user={userData} action="Continue" />
      </section>
    </main>
  );
}
