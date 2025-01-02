// routes/_app.tsx
import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Navbar from "../components/sections/UtiliySections/NavbarSection.tsx";
import { State } from "../types/navbarItems.ts";

export default function App({ Component, state }: AppProps<unknown, State>) {
  return (
    <html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Creative Oak</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <body class="text-brand-black">
        <Navbar navigation={state.navigation} />
        <div>
          <Component />
        </div>
      </body>
    </html>
  );
}
