import { useState } from "preact/hooks";

export default function PromoForm() {
  const [formData, setFormData] = useState({
    navn: "",
    email: "",
    beskrivelse: "",
    nyhedsbrev: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null,
  );

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const value = target.type === "checkbox"
      ? (target as HTMLInputElement).checked
      : target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data til vores eget API endpoint
      const response = await fetch("/api/group-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API fejl: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Ukendt fejl");
      }

      // Nulstil formularen
      setFormData({
        navn: "",
        email: "",
        beskrivelse: "",
        nyhedsbrev: false,
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error("Fejl ved indsendelse:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);

      // Nulstil status efter 5 sekunder
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div class="max-w-2xl mx-auto w-full bg-white dark:bg-gray-800 p-8  border-solid border-2 border-brand-black-900 shadow-custom-black-400">
      {submitStatus === "success"
        ? (
          <div
            class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
            role="alert"
          >
            <p class="font-bold">Tak for din henvendelse!</p>
            <p>Vi vender tilbage til dig hurtigst muligt.</p>
            {formData.nyhedsbrev && <p>Du er nu tilmeldt vores nyhedsbrev.</p>}
          </div>
        )
        : submitStatus === "error"
        ? (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            role="alert"
          >
            <p class="font-bold">Der opstod en fejl!</p>
            <p>
              Prøv venligst igen senere, eller kontakt os direkte på
              hej@creativeoak.dk.
            </p>
          </div>
        )
        : null}

      <form onSubmit={handleSubmit} class="space-y-6">
        <div>
          <label
            htmlFor="navn"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Navn
          </label>
          <input
            type="text"
            id="navn"
            name="navn"
            value={formData.navn}
            onChange={handleChange}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="beskrivelse"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Beskrivelse
          </label>
          <textarea
            id="beskrivelse"
            name="beskrivelse"
            placeholder={"Beskriv, hvordan du gerne vil arbejde med grøn omstilling."}
            value={formData.beskrivelse}
            onChange={handleChange}
            required
            rows={5}
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
          </textarea>
        </div>

        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="nyhedsbrev"
              name="nyhedsbrev"
              type="checkbox"
              checked={formData.nyhedsbrev}
              onChange={handleChange}
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div class="ml-2 text-sm">
            <label
              htmlFor="nyhedsbrev"
              class="font-medium  text-gray-700 dark:text-gray-300"
            >
              Ja tak, jeg vil også gerne modtage nyhedsbrev
            </label>
            <p class="text-gray-500 dark:text-gray-400">
              Du kan til enhver tid afmelde dig igen.
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full px-6 py-3 bg-brand-blue text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sender..." : "Send besked"}
          </button>
        </div>
      </form>

      <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Du kan også kontakte os direkte på:</p>
        <p class="mt-1">
          <a href="tel:+4553534290" class="text-brand-blue hover:underline">
            +45 53 53 42 90
          </a>{" "}
          eller{" "}
          <a
            href="mailto:hej@creativeoak.dk"
            class="text-brand-blue hover:underline"
          >
            hej@creativeoak.dk
          </a>
        </p>
      </div>
    </div>
  );
}
