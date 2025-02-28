import { JSX } from "preact/jsx-runtime";
import PrimaryButton from "../../other/PrimaryButton.tsx";
import SecondaryButton from "../../other/SecondayButton.tsx";

interface CTA2Props {

    text: JSX.Element;
    buttonText: string;
    buttonLink: string;
    secondButtonText: string;
    secondButtonLink: string;

}

const CTASection2 = (props: CTA2Props) => {
    return (
        <section>
            <div class="container py-16 ">
            
                    <div class="text-md  max-w-lg font-poppins">{props.text}</div>
                    <div class="mt-8 flex gap-4">
                        <PrimaryButton href={props.buttonLink} text={props.buttonText} />
                        <SecondaryButton href={props.secondButtonLink} text={props.secondButtonText} />
                    </div>
                </div>
    
        </section>
    );
}

export default CTASection2;