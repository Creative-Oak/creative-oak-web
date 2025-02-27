// routes/api/submit-form.ts
import { Handlers } from "$fresh/server.ts";

// Konstanter for gruppeID'er
const HENVENDELSE_GROUP_ID = "147480315867170744";
const NYHEDSBREV_GROUP_ID = "145582573929629597";

// Hent API-nøgle fra miljøvariabel
const MAILERLITE_API_KEY = Deno.env.get("MAILERLITE_API_KEY") || "";

export const handler: Handlers = {
  async POST(req) {
    try {
      const formData = await req.json();
      const { navn, email, beskrivelse, nyhedsbrev } = formData;
      
      // Validering
      if (!email || !navn || !beskrivelse) {
        return new Response(JSON.stringify({ success: false, message: "Manglende påkrævede felter" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      
      // Opret grupper baseret på brugerens valg
      const groups = [HENVENDELSE_GROUP_ID];
      if (nyhedsbrev) {
        groups.push(NYHEDSBREV_GROUP_ID);
      }
      
      // Data til MailerLite
      const subscriberData = {
        email,
        fields: {
          name: navn,
          beskrivelse
        },
        groups
      };
      
      // Send til MailerLite
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`
        },
        body: JSON.stringify(subscriberData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("MailerLite API fejl:", response.status, errorText);
        return new Response(JSON.stringify({ success: false, message: "Fejl ved kommunikation med MailerLite" }), { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      
      const result = await response.json();
      return new Response(JSON.stringify({ success: true, data: result }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Server fejl:", error);
      return new Response(JSON.stringify({ success: false, message: "Serverfejl" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};