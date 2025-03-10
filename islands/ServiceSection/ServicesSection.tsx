import { useEffect, useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import PrimaryButton from "../../components/other/PrimaryButton.tsx";

export default function ServiceSection() {
  const defaultService = "hjemmeside-webdesign";
  const [activeService, setActiveService] = useState<string>(
    IS_BROWSER ? defaultService : defaultService,
  );

  const services = [
    {
      id: "hjemmeside-webdesign",
      title: "Hjemmeside & Webdesign",
      description:
        "Vi skaber brugervenlige og miljøvenlige hjemmesider der konverterer besøgende til kunder. Vores fokus på bæredygtigt design sikrer hurtige, effektive sites med lavt CO2-aftryk.",
      image: "/images/services/webdev.avif",
    },
    {
      id: "ai-digitale-loesninger",
      title: "AI & Digitale Løsninger",
      description:
        "Vi hjælper din virksomhed med at implementere skræddersyede AI-løsninger, fra chatbots og automatisering til dataanalyse og beslutningsstøtteværktøjer.",
      image: "/images/services/courseai.avif",
    },
    {
      id: "branding-design",
      title: "Branding & Design",
      description:
        "Vi udvikler unikke visuelle identiteter og grafiske elementer, der formidler din virksomheds værdier og skaber genkendelighed på tværs af alle platforme.",
      image: "/images/services/graphic.webp",
    },
    {
      id: "foto-video",
      title: "Foto- og Videoproduktion",
      description:
        "Professionel foto- og videoproduktion til markedsføring, sociale medier og SoMe. Vi skaber visuelt indhold der fanger opmærksomheden og fortæller din historie.",
      image: "/images/services/foto-video.avif",
    },
  ];

  // Get active service data
  const activeServiceData = services.find((s) => s.id === activeService) ||
    services[0];

  // Refs for the container and tabs
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleTabClick = (serviceId: string) => {
    setActiveService(serviceId);
  };

  // Helper function to update CSS variables for the pseudo-element mask
  const updatePseudoElementCSS = () => {
    const containerEl = containerRef.current;
    const activeTabEl = tabRefs.current[activeService];
    if (containerEl && activeTabEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const tabRect = activeTabEl.getBoundingClientRect();
      const borderWidth = 2; // active tab's border width on each side
      const left = tabRect.left - containerRect.left;
      const width = tabRect.width - 2 * borderWidth;
      containerEl.style.setProperty("--active-tab-left", `${left}px`);
      containerEl.style.setProperty("--active-tab-width", `${width}px`);
    }
  };

  // Update CSS on active service change
  useEffect(() => {
    updatePseudoElementCSS();
  }, [activeService]);

  // Listen for globalThis resize events and update CSS accordingly
  useEffect(() => {
    globalThis.addEventListener("resize", updatePseudoElementCSS);
    return () =>
      globalThis.removeEventListener("resize", updatePseudoElementCSS);
  }, [activeService]);

  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container mx-auto px-4">
        <p className="text-brand-black text-center text-sm uppercase tracking-wider mb-8">
          Services vi tilbyder
        </p>
        <div className="max-w-7xl mx-auto relative">
          {/* Tabs navigation */}
          <div className="flex tabs-container">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (tabRefs.current[service.id] = el)}
                onClick={() => handleTabClick(service.id)}
                onMouseEnter={() => setActiveService(service.id)}
                className={`
                  tab px-4 py-3 text-center cursor-pointer flex items-center justify-center
                  ${index > 0 ? "ml-4" : ""}
                  ${
                  activeService === service.id
                    ? "bg-white font-medium"
                    : "bg-gray-100 hover:bg-gray-100"
                }
                `}
                style={{
                  minWidth: "120px",
                  flex: "1 1 0",
                  border: "1px solid #000",
                  ...(activeService === service.id
                    ? {
                      position: "relative",
                      zIndex: 1,
                      marginBottom: "-1px",
                      boxShadow: "4px 4px 0 0 #333740",
                    }
                    : {
                      boxShadow: "none",
                    }),
                }}
              >
                <h3 className="text-sm md:text-base truncate">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Content container with pseudo-element mask */}
          <div
            ref={containerRef}
            className="content-container shadow-custom-black"
            style={{
              border: "1px solid #000",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className="p-6 md:p-8 bg-white">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Text content */}
                <div className="w-full md:w-1/2">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">
                    {activeServiceData.title}
                  </h2>
                  <p className="text-base text-brand-black-600 mb-6">
                    {activeServiceData.description}
                  </p>
                  <PrimaryButton
                    href={`/${activeServiceData.id}`}
                    text="Læs mere"
                  />
                </div>
                {/* Image content */}
                <div className="w-full md:w-1/2 aspect-video overflow-hidden border border-brand-black">
                  <img
                    src={activeServiceData.image}
                    alt={activeServiceData.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CSS for desktop pseudo-element mask and mobile adjustments */}
          <style jsx>
            {`
            /* Desktop pseudo-element mask for active tab */
            .content-container::before {
              content: "";
              position: absolute;
              top: -2px;
              left: var(--active-tab-left, 0);
              width: var(--active-tab-width, 120px);
              height: 2px;
              background: white;
              z-index: 3;
            }
            @media (max-width: 640px) {
              /* Hide the desktop pseudo-element mask on mobile */
              .content-container::before {
                display: none;
              }
              /* Detach tabs from the container and allow wrapping */
              .tabs-container {
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
              }
              /* Smaller tab styling with max width of 40% (2/5 of the container) */
              .tab {
                flex: 1 1 auto;
                min-width: 80px;
                max-width: 40%;
                padding: 0.5rem;
                border: 1px solid #000;
                box-shadow: none;
                margin: 0;
              }
              .tab.bg-white {
                background: #fff;
              }
              .tab.bg-gray-100 {
                background: #f3f4f6;
              }
              .tab h3 {
                font-size: 0.75rem;
                white-space: normal;
                text-align: center;
              }
            }
          `}
          </style>
        </div>
      </div>
    </section>
  );
}
