import { JSX } from "preact/jsx-runtime";

interface ListElementProps {
  icon: JSX.Element;

  title: string;
  list: string[];
}

const ListElement = (props: ListElementProps) => {
  return (
    <div className="p-6">
      <div className=" mb-4">
        <div class="w-8 mb-2">
          {props.icon}
        </div>
        <h3 className="text-xl font-semibold font-lexend">
          {props.title}
        </h3>
      </div>
      <ul className="space-y-2 text-gray-700">
        {props.list.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="text-brand-blue mt-0.5">✓</span>{" "}
            {/* Checkmark icon */}
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListElement;
