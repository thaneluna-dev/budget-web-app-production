export default function BudgetForm({ setBudget, setFormOpen }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    setBudget(e.target.value);
    setFormOpen(false);
  };

  return (
    <div className="md:inline-block md:justify-end md:gap-4 md:items-end">
      <input
        className="border p-2 w-30 mb-4 rounded-md md:text-lg md:self-end md:mb-0"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
      />
    </div>
  );
}
