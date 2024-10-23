import React, {useState} from "react";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import CustomSection from "./SectionSub";

function Subscriptions() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        options={[
          { title: "Inicio", href: "/" },
          { title: "Contacto", href: "#info" },
        ]}
      />

      <main className="bg-gradient-to-tr from-slate-800 via-gray-700 to-slate-700 w-full min-h-screen flex items-center pt-20">
        <div className="flex flex-col justify-center items-center w-full space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <CustomSection
              title="Plan Básico"
              description="Para quienes buscan recetas sin complicaciones."
              price={4990}
              discount={3000}
              options={[
                "Acceso a todas las recetas.",
                "Acceso ilimitado a la base de datos de recetas.",
                "Soporte básico por correo electrónico.",
              ]}
              buttonLabel="Comprar Plan"
            />

            <CustomSection
              title="Plan Avanzado"
              description="Incluye recetas exclusivas y soporte prioritario."
              price={7990}
              discount={4000}
              options={[
                "Acceso a todas las recetas y recetas exclusivas.",
                "Acceso ilimitado a la base de datos de recetas.",
                "Novedades semanales.",
                "Soporte prioritario por correo electrónico.",
              ]}
              buttonLabel="Comprar Plan"
            />

            <CustomSection
              title="Plan Premium"
              description="Para los apasionados, incluye soporte 24/7 y más."
              price={9990}
              discount={5000}
              options={[
                "Acceso a todas las recetas y posibilidad de crear tus propias recetas.",
                "Acceso ilimitado a la base de datos de recetas.",
                "Crea y comparte tus propias recetas.",
                "Soporte 24/7.",
              ]}
              buttonLabel="Comprar Plan"
            />
          </div>
        </div>
      </main>

      <div id="info">
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

export default Subscriptions;
