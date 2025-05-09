const ContactSection = () => {
  return (
    <section class="pb-10">
      <div class="max-w-2xl mx-auto px-4">
        <h2 class="text-center text-2xl font-bold mb-6">Contact us</h2>
        <form
          action="/api/mail"
          method="POST"
          class="bg-white p-6 border-2 border-brand-black hover:shadow-custom-black transition-shadow"
        >
          <div class="mb-4">
            <label for="name" class="block text-brand-black mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full border border-brand-black-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="Your name"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block   text-brand-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full border border-brand-black-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="hello@example.com"
              required
            />
          </div>
          <div class="mb-4">
            <label for="message" class="block text-brand-black mb-2">
              Besked
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              class="w-full border border-brand-black-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="Your message here..."
              required
            >
            </textarea>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="py-2 px-4 border border-brand-black hover:shadow-custom-black-400 transition-shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
