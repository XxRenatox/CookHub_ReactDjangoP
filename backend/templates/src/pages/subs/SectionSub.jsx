import { CheckIcon } from "@heroicons/react/24/outline";

function CustomSection({ title, price, discount, options, buttonLabel, description }) {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mt-8 w-96 hover:scale-110 duration-200 hover:border-4 hover:border-indigo-600">
      <header className="text-center">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-slate-600">{title}</h2>
          {title === "Plan Avanzado" && (
            <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-full">
              Más popular
            </span>
          )}
        </div>
        <p className="text-gray-500 mt-2">{description}.</p>
      </header>
      <main className="mt-6">
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-4xl font-extrabold text-gray-900">${price}</span>
          <span className="text-gray-500">/mensual</span>
        </div>
        <div className="text-xl mt-2 text-center text-gray-400">
            <span className="line-through">${price + discount}</span>
            <span className="ml-2 text-red-600 font-semibold">¡Oferta!</span>
          </div>
        <button className="mt-8 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 ">
          {buttonLabel}
        </button>
        <ul className="mt-8 space-y-3">
          {options.map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon className="h-6 w-6 text-blue-600" />
              <span className="ml-3 text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}

export default CustomSection;
