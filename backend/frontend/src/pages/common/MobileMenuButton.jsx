import { ArrowRightIcon } from "@heroicons/react/24/outline"; 

const MobileMenuButton = ({ setMobileMenuOpen, mobileMenuOpen }) => {
  return (
    <section className="md:hidden flex justify-center text-center mt-4">
      <button
        className="flex items-center rounded-lg px-4 py-2 shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span>Activar Sección de Categorías</span>
        <ArrowRightIcon className="h-6 w-6 ms-2" aria-hidden="true" />
      </button>
    </section>
  );
};

export default MobileMenuButton;