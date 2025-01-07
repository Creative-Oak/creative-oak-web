import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "../../icons/Icons.tsx";

const Footer = () => {
  return (
    <footer className="[&_a]:underline [&_a]:decoration-transparent [&_a]:transition-all [&_a]:duration-300 [&_a:hover]:decoration-inherit">
      <div class="container py-8 px-2 ">
        <div class="flex flex-col lg:flex-row  p-12 border-2 gap-12  border-brand-black shadow-custom-black">
          <div class="flex flex-col flex-grow">
            <a href="/">
              <img class="w-20" width={150} src="/images/logo.svg" />
            </a>
            <div class="max-w-md pt-6">
              <h4 class="font-bold">Addresse</h4>
              <p>Langelandsgade 62 St</p>
              <p>8000 Aarhus C</p>
            </div>

            <div class="max-w-md pt-6">
              <h4 class="font-bold">Kontakt</h4>
              <p>CVR: 44912791</p>
              <p>Creative Oak ApS</p>
              <p>+45 53 53 42 90</p>

              <a href="mailto:hej@creativeoak.dk">hej@creativeoak.dk</a>
            </div>

            <div class="flex h-6 mt-4 fill-brand-black space-x-4">
              <a
                href="#"
                class="h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                class="h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                class="h-full fill-brand-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
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
                <a href="#">Køb Hjemmeside</a>
              </li>
              <li>
                <a href="#">AI Kursus</a>
              </li>
              <li>
                <a href="#">Chatbots</a>
              </li>
              <li>
                <a href="#">AI & digitale services</a>
              </li>
              <li>
                <a href="#">Hjemmesider Priser</a>
              </li>
              <li>
                <a href="#">Video- og fotoproduktion</a>
              </li>
              <li>
                <a href="#">Visuel identitet</a>
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="space-y-4">
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Kontakt</a>
              </li>
              <li>
                <a href="#">Om os</a>
              </li>
              <li>
                <a href="#">Artikler</a>
              </li>
              <li>
                <a href="https://www.newsletter.creativeoak.dk/subscribe" target="_blank">Nyhedsbrev</a>
              </li>
            </ul>
          </div>
        
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
