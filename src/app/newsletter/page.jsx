import { getSubscribers } from "@/lib/supabase";
import Form from "../components/Form";
import Link from "next/link";

//når man skriver async, så ved man, at man er på serveren
async function page() {
  const subscribers = await getSubscribers();
  // const { id } = subscribers;

  return (
    <div>
      <Form />
      <ul className="flex flex-wrap gap-4">
        {subscribers.map((subscribe) => (
          <Link href={`/update/${id}`}>
            <li className="bg-white text-slate-800 h-20 p-2 rounded-sm" key={subscribe.id}>
              {subscribe.name} - {subscribe.email}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default page;
