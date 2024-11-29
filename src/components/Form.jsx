"use client";

import { send } from "@/action";
import SubmitButton from "./SubmitButton";
import { useActionState } from "react";

function Form() {
  const [state, action] = useActionState(send, undefined);

  return (
    // action på form modtager det der hedder formData
    <form action={action} className="max-w-md mx-auto p-4 bg-white shadow-md rounded mt-10">
      <h1 className="text-4xl mb-5">
        <strong>Newsletter</strong>
      </h1>
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            <strong>Name</strong>
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded" type="text" id="name" name="name" required />
          {/* <p>{state?.errors.name}</p> */}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            <strong>E-mail</strong>
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded" type="email" id="email" name="email" required />
          {/* <p>{state?.errors.email}</p> */}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

export default Form;
