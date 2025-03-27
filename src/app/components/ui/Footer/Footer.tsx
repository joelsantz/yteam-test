import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-[#0C0C0C] text-white py-20">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row justify-between px-6 gap-10 md:gap-0 items-center md:items-start">
        
        {/* Logo y Careers */}
        <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
          <img src="/logo.svg" alt="Yteam Logo" className="h-12" />
          <p className="font-sans text-sm">Careers</p>
          {/* Copyright alineado debajo del logo */}
          <p className="font-sans text-xs text-gray-400 mt-10">
            © 2025 yteam, Inc. All rights reserved.
          </p>
        </div>

        {/* Contacto */}
        <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
          <h3 className="font-title text-white font-semibold">Contact us</h3>
          <p className="font-sans text-sm">talent@yteam.io</p>
        </div>

        {/* Redes Sociales */}
        <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
          <h3 className="font-title text-white font-semibold">Find us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.linkedin.com/company/yteam-io/" aria-label="LinkedIn" target="_blank">
              <FaLinkedin className="text-white text-2xl hover:opacity-80" />
            </a>
            <a href="https://x.com/yteam_io" aria-label="X (Twitter)" target="_blank">
              <FaXTwitter className="text-white text-2xl hover:opacity-80" />
            </a>
            <a href="https://www.instagram.com/yteam.io/" aria-label="Instagram" target="_blank">
              <FaInstagram className="text-white text-2xl hover:opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


