import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";
import "https://deno.land/std@0.205.0/dotenv/load.ts";

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
                    username: Deno.env.get("SMTP_USERNAME") || "", // Load from env
                    password: Deno.env.get("SMTP_PASSWORD") || "", // Load from env
                },
            },
        });

        await client.send({
            from: `"Creative Oak Kontaktformular" <${Deno.env.get("SMTP_USERNAME")}>`,
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
