import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

function DarkModeButton({ setDarkMode, darkMode }) {
  return (
    <button
      className="group flex items-center justify-between w-24 px-1 py-1 bg-gray-400 border-2 border-slate-600 rounded-full "
      onClick={() => setDarkMode(!darkMode)}
    >
      <span
        className={`w-8 h-8 bg-white rounded-full flex items-center justify-center transform transition-transform duration-300 ${
          darkMode ? "translate-x-12" : "translate-x-1"
        }`}
      >
        {darkMode ? (
          <MoonIcon className="w-6 h-6 text-gray-700" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        )}
      </span>
    </button>
  );
}

export default DarkModeButton;
