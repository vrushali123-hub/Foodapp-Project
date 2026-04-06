import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] to-[#111827] text-gray-300">

      <div className="max-w-screen-2xl mx-auto xl:px-24 px-6 py-16 
      grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo section */}
        <div>
          <img 
            src="/images/logo.png"
            alt="logo"
            className="w-16 bg-white p-1 rounded"
          />

          <p className="mt-4 text-gray-400 w-48">
            FoodApp <br/>
            Providing reliable tech and food since 1992
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-gray-400 uppercase text-sm mb-4">
            Services
          </h3>

          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">
              Branding
            </li>

            <li className="hover:text-white cursor-pointer">
              Design
            </li>

            <li className="hover:text-white cursor-pointer">
              Marketing
            </li>

            <li className="hover:text-white cursor-pointer">
              Advertisement
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-gray-400 uppercase text-sm mb-4">
            Company
          </h3>

          <ul className="space-y-2">

            <li className="hover:text-white cursor-pointer">
              About us
            </li>

            <li className="hover:text-white cursor-pointer">
              Contact
            </li>

            <li className="hover:text-white cursor-pointer">
              Jobs
            </li>

            <li className="hover:text-white cursor-pointer">
              Press kit
            </li>

          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-gray-400 uppercase text-sm mb-4">
            Legal
          </h3>

          <ul className="space-y-2">

            <li className="hover:text-white cursor-pointer">
              Terms of use
            </li>

            <li className="hover:text-white cursor-pointer">
              Privacy policy
            </li>

            <li className="hover:text-white cursor-pointer">
              Cookie policy
            </li>

          </ul>

        </div>

      </div>
     
<aside className="border-t border-gray-700 py-6 flex justify-center text-center">
  <p className="text-gray-400">
    Copyright © 2026 - All right reserved by FoodApp Ltd
  </p>
</aside>




    </footer>
  );
};

export default Footer;