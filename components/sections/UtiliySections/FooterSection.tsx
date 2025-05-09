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
              <p class="font-bold">Adress</p>
              <p>Langelandsgade 62 St</p>
              <p>8000 Aarhus C</p>
            </div>

            <div class="max-w-md pt-6">
              <p class="font-bold">Contact</p>
              <p>VAT: DK44912791</p>
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
          <div class="flex  items-center  md:justify-center justify-start">
            <ul class="space-y-6">
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/works">Works</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/articles">Articles</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/testemonials">Testemonials</a>
              </li>
              </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
