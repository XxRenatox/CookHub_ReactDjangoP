import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const tiers = [
  {
    name: 'Plan Gratis',
    id: 'tier-free',
    href: '/Registro',
    priceMonthly: '$0',
    description: "Acceso básico a las recetas.",
    features: [
      'Acceso limitado a algunas recetas',
      'Sin acceso a la base de datos completa',
      'Soporte básico',
    ],
    featured: false,
  },
  {
    name: 'Plan Premium',
    id: 'tier-premium',
    href: '/FormularioSubscripcion',
    priceMonthly: '$99',
    description: 'Para los apasionados, incluye soporte 24/7 y más.',
    features: [
      'Acceso a todas las recetas',
      'Posibilidad de crear tus propias recetas',
      'Acceso ilimitado a la base de datos de recetas',
      'Novedades semanales',
      'Soporte 24/7',
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Navbar options={[{}]} darkMode={darkMode} setDarkMode={setDarkMode} />
      <div
        className={classNames(
          darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900',
          'relative isolate px-6 py-24 sm:py-32 lg:px-8'
        )}
      >
        <div aria-hidden="true" className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-indigo-600">Precios</h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
            Elige el plan adecuado para ti
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? darkMode
                    ? 'relative bg-gray-800 shadow-2xl'
                    : 'relative bg-gray-900 shadow-2xl'
                  : darkMode
                  ? 'bg-gray-700 sm:mx-8 lg:mx-0'
                  : 'bg-white/60 sm:mx-8 lg:mx-0',
                tier.featured
                  ? ''
                  : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                  : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                'rounded-3xl p-8 ring-1 sm:p-10',
                darkMode ? 'ring-gray-700' : 'ring-gray-900/10'
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                  'text-base font-semibold'
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : darkMode ? 'text-gray-100' : 'text-gray-900',
                    'text-5xl font-semibold tracking-tight'
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? 'text-gray-400' : darkMode ? 'text-gray-400' : 'text-gray-500',
                    'text-base'
                  )}
                >
                  /mes
                </span>
              </p>
              <p className={classNames(tier.featured ? 'text-gray-300' : darkMode ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base')}>
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-gray-300' : darkMode ? 'text-gray-300' : 'text-gray-600',
                  'mt-8 space-y-3 text-sm sm:mt-10'
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-[#019863] text-white shadow-sm hover:bg-green-600 focus-visible:outline-[#019863]'
                    : 'text-[#019863] ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-[#019863]',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
                )}
              >
                {tier.featured ? 'Empezar ahora' : 'Registrarse'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}