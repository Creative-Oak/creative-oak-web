interface ContentSection2Props {
    title: string;
    text: {header: string, txt: string}[];
}

const ContentSection2 = (props: ContentSection2Props) => {
    const formatText = (text: string) => {
        // Split the text into segments by **
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // Remove the ** and make the text bold
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="container max-w-4xl py-16 px-2">
            <h2 class="text-3xl font-bold font-lexend">{props.title}</h2>
            <div className="content-section-2__text">
                {props.text.map((el, i) => (
                    <div class="my-8" key={i}>
                        <h3 class="font-bold text-lg">{el.header}</h3>
                        <p class="leading-7 whitespace-pre-line">{formatText(el.txt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentSection2;