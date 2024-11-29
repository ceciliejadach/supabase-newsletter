import { getSubscribers } from "@/lib/supabase";
import Form from "@/components/Form";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

//når man skriver async, så ved man, at man er på serveren
export default async function Home() {
  const subscribers = await getSubscribers();

  return (
    <div className="max-w-screen-xl mx-auto">
      <Form />
      {/* <ul className="flex flex-wrap gap-4 mt-10">
        {subscribers.map((subscribe) => (
          <li className="p-4 bg-white shadow-md rounded flex data-[updated='true']:outline-green-600" key={subscribe.id}>
            <Link href={`/update/${subscribe.id}`} className="flex items-center gap-5">
              <p>
                {subscribe.name} - {subscribe.email}
              </p>
              <IoIosArrowForward />
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
