export default function ErrorModal() {
  return (
    <alert
      className="md:bg-transparent md:border-0 bg-opacity-100 md:justify-self-center md:items-center md:flex"
    >
      <div
        className={`md:bg-white md:rounded-lg md:shadow-lg md:w-600 md:max-w-lg max-w-xs`}
      >
        <div className="m-6 md:flex justify-between">
          <h2 className="text-xl font-bold text-black flex place-items-end text-red-500 ">
            A budget must be created before adding expenses!
          </h2>
        </div>
      </div>
    </alert>
  );
}
