"use client";

import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 text-center mt-12">
      <a
        href="https://www.dyad.sh/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors duration-200"
      >
        Made with Dyad
      </a>
    </footer>
  );
};