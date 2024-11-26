import { patchSubscriber, getSubById } from "@/lib/supabase";
import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";

async function page({ params }) {
  const { id } = await params;
  const subscriber = await getSubById(id);

  console.log("subscriberen", subscriber);

  async function updateSubscriberData(formData) {
    "use server";
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    await patchSubscriber(data);
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <form action={updateSubscriberData}>
        <div className="grid gap-3 bg-blue-950 p-3 w-[15rem] rounded-md">
          <div className="grid gap-1">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input className="rounded-sm h-9 text-black" type="text" id="name" name="name" defaultValue={subscriber.name} />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">
              <strong>E-mail</strong>
            </label>
            <input className="rounded-sm h-9" type="email" id="email" name="email" defaultValue={subscriber.email} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-white text-blue-600 py-2 rounded-sm" type="delete">
              Delete
            </button>
            <button className="bg-blue-800 py-2 rounded-sm" type="update">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default page;

/*TODO:
  - Hent subscriber med id fra params
  - Lav en formular med input for name og email med "defaultValue" sat til subscriberens nuværende værdier
  - Lav en funktion med "use server" som køres fra en action på formen
  - Funktionen modtager automatisk "formData" som argument
  - Opret et objekt med name og email fra formData; fx 'email: formData.get("email")'
  importer din PATCH-funktion fra supabase og kør den med objektet som argument
  - Brug revalidatePath("/") til at genindlæse siden, hvor du viser alle subscribers
  - Brug redirect("/") til at sende brugeren tilbage til forsiden
  */
