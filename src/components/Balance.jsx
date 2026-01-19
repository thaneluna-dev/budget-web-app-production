import { formatUSD } from "../Shared/FormatUSD.jsx";
export default function Balance({userEmail}) {

  return (
    <div className="font-bold md:text-lg text-gray-800 md:bg-white md:border md:border-gray-300 md:p-4 md:rounded-lg md:shadow md:p-6 md:row-span-1 bg-white border-gray-300 rounded-lg shadow p-6 mb-6">
      <div className="md:font-semibold mb-10 text-base">Balance</div>
      <div className="text-gray-800 text-2xl">{formatUSD(0)}</div>
      <div className="text-gray-500 md:font-medium text-sm">This month</div>
    </div>
  );
}
