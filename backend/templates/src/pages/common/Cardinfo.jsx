import tecnicas from "../../tecnicas_cocina.json";

function CardInfo({ darkMode, cantidad }) {
  return (
    <>
      {tecnicas.slice(0, cantidad).map((tecnica) => (
        <div
          key={tecnica.id}
          className={`rounded-2xl border-4 shadow-md p-4 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-slate-300 text-black"
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">{tecnica.nombre}</h2>
          <p className="mb-4">{tecnica.descripcion}</p>
          <p>
            <strong>Ejemplo:</strong> {tecnica.ejemplo}
          </p>
        </div>
      ))}
    </>
  );
}

export default CardInfo;
