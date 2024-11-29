const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  apikey: key,
};

export async function getSubscribers() {
  let response = await fetch("https://sddebowanoanfoafukif.supabase.co/rest/v1/subscriptions", {
    headers: {
      apikey: key,
    },
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
  let response = await fetch(`${url}?id=eq.${id}`, {
    method: "GET",
    headers: headersList,
  });
  let data = await response.json();
  return data;
  // return data[0];//returnerer det første objekt i arrayet - gør at man kan se name og email i inputfelter
}

export async function patchSubscriber(id, subData) {
  let response = await fetch(`${url}?id=eq.${id}`, {
    method: "PATCH",
    headers: headersList,
    body: JSON.stringify(subData),
  });
  return await response.json();
}

export async function deleteSubscriber(id) {
  let response = await fetch(`${url}?id=eq.${id}`, {
    method: "DELETE",
    headers: headersList,
  });
  return await response.json();
}
