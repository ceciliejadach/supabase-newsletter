import { postSubscribers } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

async function Form() {
  async function send(formData) {
    "use server";
    const data = {
      name: formData.get("name"), //name refererer til name="name" nede i input
      email: formData.get("email"), //email refererer til name="email" nede i input
    };
    await postSubscribers(data); //kører funktionen der hedder postSubscribers

    revalidatePath("/newsletter");
  }
  return (
    // action på form modtager det der hedder formData
    <form action={send} className="grid place-content-center h-[70vh]">
      <h1 className="text-4xl mb-5">
        <strong>Newsletter</strong>
      </h1>
      <div className="grid gap-3 bg-blue-950 p-3 w-[15rem] rounded-md">
        <div className="grid gap-1">
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <input className="rounded-sm h-9" type="text" id="name" name="name" />
        </div>
        <div className="grid gap-1">
          <label htmlFor="email">
            <strong>E-mail</strong>
          </label>
          <input className="rounded-sm h-9" type="email" id="email" name="email" />
        </div>
        <button className="bg-blue-800 py-2 rounded-sm" type="submit">
          Subscribe
        </button>
      </div>
    </form>
  );
}

export default Form;
