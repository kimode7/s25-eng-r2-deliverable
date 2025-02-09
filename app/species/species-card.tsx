"use client";
/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/
import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
type Species = Database["public"]["Tables"]["species"]["Row"];
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];




import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateSpeciesDialog } from "./add-species-dialog";


export default function SpeciesCard({ species, userId}: { species: Species; userId: string  }) {

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Replace the button with the detailed view dialog. */}
      <LearnMoreDialogue species={species}/>

      {userId === species.author && <UpdateSpeciesDialog species={species} />}


    </div>
  );
}






export function LearnMoreDialogue({ species }: { species: Species }) {

  // Control open/closed state of the dialog
  const [open, setOpen] = useState<boolean>(false);


  return (

    <Dialog open={open} onOpenChange={setOpen}>
        <Button className="mt-3 w-full"  onClick={() => setOpen(true)}>Learn More</Button>

      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>
            <div className="text-center">
            {species.common_name}
            </div>
            </DialogTitle>

        </DialogHeader>
        <div>


        <table>
        <thead >
        <tr>
        <th className="p-4 border border-gray-300 text-left">Common Name</th>
          <th className="p-4 border border-gray-300 text-left">Scientific Name</th>
          <th className="p-4 border border-gray-300 text-left">Kingdom</th>
          <th className="p-4 border border-gray-300 text-left">Description</th>
          <th className="p-4 border border-gray-300 text-left">Population</th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <td className="p-4 border border-gray-300">{species.common_name}</td>
          <td className="p-4 border border-gray-300">{species.scientific_name}</td>
          <td className="p-4 border border-gray-300">{species.kingdom}</td>
          <td className="p-4 border border-gray-300">{species.description}</td>
          <td className="p-4 border border-gray-300">{species.total_population}</td>
        </tr>
      </tbody>
    </table>
            </div>
              <div>
                <DialogClose asChild>
                </DialogClose>
              </div>
      </DialogContent>
    </Dialog>
  );
}






export function ProfileCard({profile}: { profile: Profiles}) {

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">

      <h3 className="mt-3 text-2xl font-semibold">{profile.display_name}</h3>
      <p>{profile.biography ? profile.biography.slice(0, 150).trim() + "..." : ""}</p>

    </div>
  );
}
