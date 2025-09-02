// zohoSignup.js

// export async function handler(event, context) {
//   const apiKey = process.env.ZOHO_API_KEY; // your Netlify env var name

//   const response = await fetch('https://www.zohoapis.eu/crm/v2/Leads', {
//     method: 'GET', // or POST depending on what you need
//     headers: {
//       Authorization: `Zoho-oauthtoken ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await response.json();

//   return {
//     statusCode: 200,
//     body: JSON.stringify(data),
//   };
// }


import fetch from "node-fetch"; // if using Node 18+, native fetch works

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    // Example fields: email, firstName, lastName
    const payload = {
      data: [
        {
          Email: data.email,
          First_Name: data.firstName,
          Last_Name: data.lastName
        }
      ]
    };

    const response = await fetch("https://campaigns.zoho.com/api/v1/lists/248828000000037021/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Zoho-oauthtoken ${process.env.ZOHO_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

