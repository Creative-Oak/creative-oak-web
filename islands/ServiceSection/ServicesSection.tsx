import { useState } from "preact/hooks";

const ServiceSection = () => {
    // Initialize with the first service ID as default
    const [activeService, setActiveService] = useState<string>("webdev");
    
    const services = [
        {
            id: "koeb-hjemmeside",
            title: "Creative Communications",
            image: "/images/services/webdev.avif"
        },
        {
            id: "ai-kursus",
            title: "Digital Experiences & Innovation",
            image: "/images/services/courseai.avif"
        },
        {
            id: "articles/baeredygtig-hjemmeside",
            title: "AI Consulting & AI Transformation",
            image: "/images/services/susweb.avif"
        },
        {
            id: "visuel-identitet",
            title: "E-Commerce & Digital Marketing",
            image: "/images/services/graphic.webp"
        }
    ];

    return (
        <section class="bg-white py-10 md:py-20">
            <div class="container mx-auto px-4">
                <p class="text-brand-black mb-6 md:mb-8 max-w-xl"> 
         We are both consultants and digital craftsmen. With a sharp blend of branding, user experience, and programmatic expertise, we create solutions that truly make a difference for our clients – and stand the test of time.
                </p>
                <a href="/om-os">Learn more about us</a>
                
                <div class="flex flex-col md:flex-row gap-10 justify-center items-center lg:gap-24">
                    {/* List of services - works on both mobile and desktop */}
                    <div class="flex flex-col gap-6 md:gap-12 w-full md:w-1/2">
                        {services.map((service) => (
                            <p
                                key={service.id}
                               
                                class={`text-2xl md:text-4xl font-bold transition-all max-w-xl duration-300 ${
                                    activeService === service.id
                                        ? "text-brand-black"
                                        : "text-brand-black-400 hover:text-brand-black"
                                }`}
                                onMouseEnter={() => setActiveService(service.id)}
                                onClick={() => setActiveService(service.id)}
                                onTouchStart={() => setActiveService(service.id)}
                                /* Removed the onMouseLeave handler to keep the last hovered item active */
                            >
                                {service.title}
                            </p>
                        ))}
                    </div>
                    
                    {/* Image only visible on desktop */}
                    <div class="hidden md:block md:w-1/2 h-96 lg:h-[500px] overflow-hidden border-2 border-brand-black shadow-custom-blackitems-center justify-center bg-gray-100">
                        <img
                            src={services.find(s => s.id === activeService)?.image || services[0].image}
                            alt={services.find(s => s.id === activeService)?.title || services[0].title}
                            class="w-full h-full object-cover transition-all duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;