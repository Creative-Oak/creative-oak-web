import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "../../icons/Icons.tsx";

const Footer = () => {
  return (
    <footer className="[&_a]:underline [&_a]:decoration-transparent [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:decoration-inherit">
      <div class="container py-8">
        <div class="flex flex-col lg:flex-row  p-4 md:p-12 border-2 gap-12  border-brand-black shadow-custom-black">
          <div class="flex flex-col flex-grow">
            <a href="/">
              <img class="w-20" width={150} src="/images/logo.svg" />
            </a>
            <div class="max-w-md pt-6">
              <p class="font-bold">Addresse</p>
              <p>Langelandsgade 62 St</p>
              <p>8000 Aarhus C</p>
            </div>

            <div class="max-w-md pt-6">
              <p class="font-bold">Kontakt</p>
              <p>CVR: 44912791</p>
              <p>Creative Oak ApS</p>
              <p>+45 53 53 42 90</p>

              <a href="mailto:hej@creativeoak.dk">hej@creativeoak.dk</a>
            </div>

            <div class="flex h-6 mt-4 fill-brand-black space-x-4">
              <a
                href="https://www.instagram.com/creativeoakco"
                class="h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/98248943"
                class="h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>

              <a
                href="https://www.youtube.com/@CreativeOak"
                class="h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon />
              </a>
            </div>

            <ul class="footer-social">
              <li>
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="space-y-4">
              <li>
                <a href="/koeb-hjemmeside">Køb Hjemmeside</a>
              </li>
              <li>
                <a href="/ai-kursus">AI Kursus</a>
              </li>
              <li>
                <a href="/ai-chatbots">Chatbots</a>
              </li>
              <li>
                <a href="/kunstig-intelligens-og-digital-udvikling">
                  AI & digitale services
                </a>
              </li>
              <li>
                <a href="/hjemmeside-priser">Hjemmesider Priser</a>
              </li>
              <li>
                <a href="/foto-video">Video- og fotoproduktion</a>
              </li>
              <li>
                <a href="/visuel-identitet">Visuel identitet</a>
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="space-y-4">
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a href="/kontakt">Kontakt</a>
              </li>
              <li>
                <a href="/om-os">Om os</a>
              </li>
              <li>
                <a href="/artikler">Artikler</a>
              </li>
              <li>
              <a class="ml-onclick-form" href="javascript:void(0)" onClick="ml('show', 'PthkKc', true)">Nyhedsbrev</a>
              </li>
              <li>
                <a href="/privatliv">Privatlivspolitik</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
