import { redirect } from "next/navigation";
import { Book } from "@/features/book";
import { toAdventure } from "@/features/book/data";

export const metadata = {
  title: "Your Adventure Book",
};

export default async function Page({ searchParams }) {
  const adventure = toAdventure(await searchParams);

  if (!adventure.characterName) {
    redirect("/create");
  }

  return <Book.Page adventure={adventure} />;
}
