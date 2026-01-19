export const formatUSD = (value) => {
    const num = typeof value === "string" ? Number(value) : value;
    if (Number.isNaN(num)) return "$0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      useGrouping: false,
    }).format(num);
  };