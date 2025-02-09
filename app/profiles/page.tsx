
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import {ProfileCard} from "./profile-card";


export default async function profileList() {
  // Create supabase server component client and obtain user session from stored cookie
   const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const { data: profile } = await supabase.from("profiles").select("*").order("id", { ascending: false });
  console.log("Profiles Data:")


  return (
    <>


      <div className="flex flex-wrap justify-center">
        {profile?.map((profile) => <ProfileCard profile={profile} key={profile.id}/>)}
      </div>
    </>
  );
}




