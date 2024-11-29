"use server";

import { postSubscribers } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { wait } from "@/app/utils";

export async function send(prev, formData) {
  const data = {
    name: formData.get("name"), //name refererer til name="name" nede i input
    email: formData.get("email"), //email refererer til name="email" nede i input
  };

  const errors = {};

  if (!data.name) {
    errors.name = "Name is required";
  }

  if (!data.email.includes("@")) {
    errors.email = "Enter valid email";
  }

  //   if (Object.keys(errors))

  await postSubscribers(data); //kører funktionen der hedder postSubscribers

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  await wait(1000);

  revalidatePath("/newsletter");
}
