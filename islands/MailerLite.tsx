// islands/MailerLiteForm.tsx
import { useEffect } from "preact/hooks";

interface MailerLiteFormProps {
  className?: string;
}

export default function MailerLiteForm(
  { className = "" }: MailerLiteFormProps,
) {
  useEffect(() => {
    // Load your static MailerLite script
    const script = document.createElement("script");
    script.src = "/mailerLite.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.querySelector(
        'script[src="/static/mailerLite.js"]',
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return <div class="ml-embedded" data-form="ov4T7x"></div>;
}
