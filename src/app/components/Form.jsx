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
    <form action={send} className="max-w-md mx-auto p-4 bg-white shadow-md rounded mt-10">
      <h1 className="text-4xl mb-5">
        <strong>Newsletter</strong>
      </h1>
      <div className="">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            <strong>Name</strong>
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded" type="text" id="name" name="name" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            <strong>E-mail</strong>
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded" type="email" id="email" name="email" />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">
          Subscribe
        </button>
      </div>
    </form>
  );
}

export default Form;
