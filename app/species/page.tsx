import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import SpeciesCard from "./species-card";
import {ProfileCard} from "./species-card";


export default async function SpeciesList() {
  // Create supabase server component client and obtain user session from stored cookie
   const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Obtain the ID of the currently signed-in user
   const sessionId = session.user.id;

  const { data: species } = await supabase.from("species").select("*").order("id", { ascending: false });
  const { data: profile } = await supabase.from("profiles").select("*").order("id", { ascending: false });
  console.log("Profiles Data:")


  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>


      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species?.map((species) => <SpeciesCard key={species.id} species={species} userId={sessionId}/>)}
      </div>

      <div>
        {profile?.map((profile) => <ProfileCard key={profile.id} profile={profile}/>)}
      </div>
    </>
  );
}




