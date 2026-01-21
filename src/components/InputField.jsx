import { createBudget } from "../../configs/actions";
import { formatUSD } from "../Shared/FormatUSD";

export default function InputField({
  item,
  handleInputChange,
  setValue,
  value,
}) {
  const blockNumbers = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const blockNumbersOnPaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (/\d/.test(pasted)) {
      e.preventDefault();
    }
  };
  return (
    <div className="px-8 pb-5">
      <label className="block mb-1 font-semibold text-black pb-5">
        {item.label}
      </label>
      {item.fieldtype === "currency" && (
        <div className="relative">
          <span className="absolute left-2 top-2 text-gray-500">$</span>
          <input
            type={item.fieldtype}
            key={item.name}
            required={item.required}
            className="p-2 w-full mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-black text-black pl-8"
            onChange={(e) => handleInputChange(item.name, e.target.value)}
            placeholder="0.00"
          />
        </div>
      )}
      {item.fieldtype !== "currency" && (
        <input
          type={item.fieldtype}
          key={item.name}
          required={item.required}
          className="p-2 w-full mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-black text-black"
          onChange={(e) => handleInputChange(item.name, e.target.value)}
          onKeyDown={blockNumbers}
          onPaste={blockNumbersOnPaste}
        />
      )}
      <input
        type="hidden"
        name={item.name}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
      />
    </div>
  );
}
