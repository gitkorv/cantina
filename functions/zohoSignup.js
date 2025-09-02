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
      "https://campaigns.zoho.com/api/v1/lists/248828000000037021/contacts",
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${process.env.ZOHO_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    let result;
    try {
      result = await response.json();
    } catch {
      result = { error: "Zoho returned a non-JSON response" };
    }

    return {
      statusCode: response.status,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}


