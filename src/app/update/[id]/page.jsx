//importer din PATCH-funktion fra supabase og kør den med objektet som argument
import { getSubById, patchSubscriber, deleteSubscriber } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdatePage({ params }) {
  //Hent subscriber med id fra params
  const { id } = await params;
  const subscriber = await getSubById(id);

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
    await deleteSubscriber(id);
    //Brug revalidatePath("/") til at genindlæse siden, hvor du viser alle subscribers
    revalidatePath("/");
    //Brug redirect("/") til at sende brugeren tilbage til forsiden
    redirect("/");
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-3xl text-center mb-16 mt-10">Opdate or delete subscriber</h1>
      {/* Lav en formular med input for name og email med "defaultValue" sat til subscriberens nuværende værdier */}
      <form action={updateSubscriber} className="grid gap-4 max-w-screen-sm mx-auto">
        <input type="text" name="name" defaultValue={subscriber.name} className="text-black border rounded p-2" required />
        <input type="email" name="email" defaultValue={subscriber.email} className="text-black border rounded p-2" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Opdater
        </button>
      </form>
      {/* Form til sletning */}
      <form action={removeSubscriber} className="grid gap-4 max-w-screen-sm mx-auto mt-2">
        <button type="submit" className="bg-red-600 text-white p-2 rounded">
          Slet
        </button>
      </form>
    </div>
  );
}
