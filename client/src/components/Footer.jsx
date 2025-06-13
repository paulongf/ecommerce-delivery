import React from 'react';
import { assets, footerLinks } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-600">
        {/* Logo e descrição */}
        <div className="max-w-md">
          <img className="w-28 md:w-32" src={assets.logo} alt="PrebuiltUI logo" />
          <p className="mt-6 text-sm leading-relaxed">
            We deliver fresh groceries and snacks straight to your door.
            Trusted by thousands, we aim to make your shopping experience
            simple and affordable.
          </p>
        </div>

        {/* Navegação de links */}
        <nav className="flex flex-wrap justify-between w-full md:w-[50%] gap-8" aria-label="Footer navigation">
          {footerLinks.map((section, index) => (
            <div key={section.title || index} className="min-w-[120px]">
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={link.url || i}>
                    <a
                      href={link.url}
                      className="hover:underline transition-colors hover:text-primary"
                      aria-label={link.text}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Direitos autorais */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © {new Date().getFullYear()} PrebuiltUI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
