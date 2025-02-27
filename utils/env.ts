export function getMailerLiteApiKey(): string {
    try {
      return Deno.env.get("MAILERLITE_API_KEY") || "";
    } catch (error) {
      console.error("Error accessing Deno environment:", error);
      return "";
    }
  }