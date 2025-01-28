import PrimaryButton from "../../other/PrimaryButton.tsx";

interface CTAProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

const CTASection = (props: CTAProps) => {
    return (
        <section>
            <div class="container py-8 ">
                <div class="text-center w-fit mx-auto p-6 md:p-10 border-2 border-brand-black shadow-custom-black flex flex-col gap-6 ">
                    <h2 class="text-lg md:text-4xl max-w-lg font-bold font-lexend">{props.title}</h2>
                    <p class="text-md  max-w-lg font-poppins">{props.description}</p>
                    <div class="flex justify-center">
                        <PrimaryButton href={props.buttonLink} text={props.buttonText} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;