import React, { useState } from "react";
import { Cloud, Github, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-secondary py-6 px-4 sm:px-8 md:px-12 lg:px-16 shadow-md">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Cloud size={48} color="#0B64F4" />
            <h1 className="text-2xl font-bold">My AWS Docs</h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <ul className="flex space-x-6 mr-4">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="hover:text-primary transition-colors"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="/simulador"
                  className="hover:text-primary transition-colors"
                >
                  Simulador
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Sobre
                </a>
              </li>
            </ul>

            <ThemeToggle client:load />
            <a
              href="https://github.com/Eduwilll/my-aws-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Repositório do GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <a
                  href="/"
                  className="hover:text-primary transition-colors block"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="hover:text-primary transition-colors block"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="/simulador"
                  className="hover:text-primary transition-colors block"
                >
                  Simulador
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors block"
                >
                  Sobre
                </a>
              </li>
            </ul>
            <div className="flex items-center space-x-4 mt-4">
              <ThemeToggle client:load />
              <a
                href="https://github.com/Eduwilll/my-aws-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Repositório do GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
