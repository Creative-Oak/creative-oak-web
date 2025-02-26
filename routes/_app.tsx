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

        {/* <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        /> */}
       <link rel="stylesheet" href="/fonts.css" />
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="CreativeOak" />
        <link rel="manifest" href="/site.webmanifest" />
        <script src="/mailerLite-global.js" defer></script>
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
