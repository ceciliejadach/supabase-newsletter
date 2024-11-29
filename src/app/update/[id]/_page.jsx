//importer din PATCH-funktion fra supabase og kør den med objektet som argument
import { getSubById, patchSubscriber, deleteSubscriber } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdatePage({ params }) {
  //Hent subscriber med id fra params
  const { id } = await params;
  const [{ name, email }] = await getSubById(id);

  //alternativ løsning til at få hentet name og email fra subscriber ind i inputfeltene
  // const subscriber = await getSubById(id);
  // const obj = subs[0];
  // const name = obj.name;
  // const email = obj.email;

  //Lav en funktion med "use server" som køres fra en action på formen
  //Funktionen modtager automatisk "formData" som argument
  async function updateSubscriber(formData) {
    "use server";
    // Opret et objekt med name og email fra formData; fx 'email: formData.get("email")'
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    await patchSubscriber(id, data);
    //Brug revalidatePath("/") til at genindlæse siden, hvor du viser alle subscribers
    revalidatePath("/");
    //Brug redirect("/") til at sende brugeren tilbage til forsiden
    redirect("/");
  }

  async function removeSubscriber() {
    "use server";
    //funktion beskrevet i supabase.js
    await deleteSubscriber(id);
    //Brug revalidatePath("/") til at genindlæse siden, hvor du viser alle subscribers
    revalidatePath("/");
    //Brug redirect("/") til at sende brugeren tilbage til forsiden
    redirect("/");
  }

  // if(data.email === email && data.name === data) {
  //   redirect("/")
  // } else {

  // }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-3xl text-center mb-16 mt-10">Opdate or delete subscriber</h1>
      {/* Lav en formular med input for name og email med "defaultValue" sat til subscriberens nuværende værdier */}
      <form action={updateSubscriber} className="grid gap-4 max-w-sm mx-auto">
        <input type="text" name="name" defaultValue={name} required className="text-black border rounded p-2" />
        <input type="email" name="email" defaultValue={email} required className="text-black border rounded p-2" />
        <div className="grid grid-cols-2 gap-2">
          <button formAction={removeSubscriber} type="submit" className="bg-red-600 text-white p-2 rounded">
            Slet
          </button>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Opdater
          </button>
        </div>
      </form>
    </div>
  );
}
