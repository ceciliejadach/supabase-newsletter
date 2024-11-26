const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  apikey: key,
  Prefer: "return=representation",
};

export async function getSubscribers() {
  let response = await fetch(url, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

export async function postSubscribers(subdata) {
  let response = await fetch(url, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(subdata),
  });

  let data = await response.json();
  return data;
}

export async function getSubById(id) {
  const url = `https://sddebowanoanfoafukif.supabase.co/rest/v1/subscriptions?id=eq.${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  console.log("Hentet subscriber data", data);
  return data;
}

export async function patchSubscriber(subscriberData) {
  const { id, name, email } = subscriberData; // Destrukturering af data for nem adgang
  const url = `https://sddebowanoanfoafukif.supabase.co/rest/v1/subscriptions?id=eq.${id}`; // Antaget API endpoint for opdatering af abonnent

  let response = await fetch(url, {
    method: "PATCH",
    headers: headersList,
    body: JSON.stringify({ name, email }), // Send de opdaterede data
  });

  let data = await response.json();
  return data;
}
