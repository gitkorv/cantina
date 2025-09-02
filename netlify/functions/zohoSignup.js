// zohoSignup.js

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const payload = {
      data: [
        {
          Email: data.email,
          First_Name: data.firstName,
          Last_Name: data.lastName,
        },
      ],
    };

    const response = await fetch(
      "https://campaigns.zoho.com/api/v1/lists/248828000000037021/contacts", // 👈 replace <LIST_ID>
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${process.env.ZOHO_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const text = await response.text(); // get raw text
    console.log("Zoho response status:", response.status);
    console.log("Zoho response body:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { raw: text };
    }

    return {
      statusCode: response.status,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}



