
export const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return new Response("All fields are required", { status: 400 });
  }

  try {
    const notionData = {
      parent: {
        database_id: Deno.env.get("NOTION_DATABASE_ID") || "",
      },
      properties: {
        "Navn": {
          title: [
            {
              text: {
                content: name.toString(),
              },
            },
          ],
        },
        "E-mail": {
          email: email.toString(),
        },
        "Andet Info / Lead Mail": {
          rich_text: [
            {
              text: {
                content: message.toString(),
              },
            },
          ],
        },
        "Kender Fra": {
          multi_select: [
            {
              name: "Email",
            },
          ],
        },
      },
    };

    const notionResponse = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("NOTION_API_KEY")}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(notionData),
    });

    if (!notionResponse.ok) {
      const errorDetails = await notionResponse.text();
      console.error("Notion Error Response:", errorDetails);
      throw new Error(
        `Failed to create Notion page: ${notionResponse.statusText}\nDetails: ${errorDetails}`,
      );
    }

    try {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Creative Oak <heine@creativeoak.dk>",
          to: Deno.env.get("NOTIFICATION_GROUP_EMAIL") || "",
          cc: "heine@creativeoak.dk",
          subject: `New website contact from ${name}`,
          text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}

                View in Notion: ${Deno.env.get("NOTION_DATABASE_URL")}
          `,
        }),
      });

      if (!resendResponse.ok) {
        const errorDetails = await resendResponse.text();
        console.error("Resend Error Response:", errorDetails);
        throw new Error(
          `Failed to send email: ${resendResponse.statusText}\nDetails: ${errorDetails}`,
        );
      }

    await resendResponse.json();
    } catch (error) {
      console.error("Error sending email:", error);
      // Continue with the response even if email fails
    }

    return new Response(null, {
      status: 303,
      headers: { Location: "/tak" },
    });
  } catch (err) {
    console.error("Error processing form:", err);
    return new Response("Failed to process form submission", { status: 500 });
  }
};
