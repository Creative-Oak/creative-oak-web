import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";

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
        const client = new SMTPClient({
            connection: {
                hostname: "smtp.gmail.com",
                port: 465,
                tls: true,
                auth: {
                    username: "***REMOVED***", // Your Workspace email
                    password: "***REMOVED***", // App Password if 2FA enabled
                },
            },
        });

        await client.send({
            from: `"Creative Oak Kontaktformular" <***REMOVED***>`,
            to: "hej@creativeoak.dk", // Change to your recipient email
            subject: `New website contact from ${name}`,
            content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        await client.close();

        return new Response(null, {
            status: 303,
            headers: { Location: "/tak" },
        });
    } catch (err) {
        console.error("Error sending email:", err);
        return new Response("Failed to send email", { status: 500 });
    }
};
