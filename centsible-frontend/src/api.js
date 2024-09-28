const BASE_URL = import.meta.env.BASE_URL;

async function sendBotMessage(input){
    const res = await feitch(BASE_URL + "/userMessage", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
    });
    const data= await res.json();

    if (!res.ok) {
        return Promise.reject({ status: res.status, data });
      }
      return data;

}