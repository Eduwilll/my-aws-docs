import { c as createComponent, r as renderTemplate, a as renderComponent, d as renderSlot, e as renderHead, f as createAstro } from './astro/server_ZG_env5N.mjs';
import 'kleur/colors';
/* empty css                         */
import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Moon, Sun, Linkedin, Twitter, Github, Cloud } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme || "light");
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme, mounted]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  if (!mounted) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "p-2 rounded-full text-primary transition-colors",
      "aria-label": "Toggle Theme",
      children: theme === "light" ? /* @__PURE__ */ jsx(Moon, {}) : /* @__PURE__ */ jsx(Sun, {})
    }
  );
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="pt-BR"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', ' - Curso AWS</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"><script>\n            // Prevents flickering on page load\n            const theme = localStorage.getItem("theme") || "light";\n            if (theme === "dark") {\n                document.documentElement.classList.add("dark");\n            }\n        <\/script>', '</head> <body class="bg-background text-foreground"> <header class="bg-secondary py-6 px-4 sm:px-8 md:px-12 lg:px-16 shadow-md"> <div class="max-w-screen-lg mx-auto flex justify-between items-center"> <div class="flex items-center space-x-4"> ', ' <h1 class="text-2xl font-bold">Escola da Nuvem</h1> </div> <nav class="flex items-center space-x-4"> <ul class="flex space-x-6 mr-4"> <li> <a href="/" class="hover:text-primary transition-colors">In\xEDcio</a> </li> <li> <a href="/docs" class="hover:text-primary transition-colors">Docs</a> </li> <li> <a href="/simulador" class="hover:text-primary transition-colors">Simulador</a> </li> <li> <a href="/about" class="hover:text-primary transition-colors">Sobre</a> </li> </ul> ', ' <a href="https://github.com/Eduwilll/my-aws-docs" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors" aria-label="Reposit\xF3rio do GitHub"> ', ' </a> </nav> </div> </header> <main class="max-w-screen-lg mx-auto py-12 px-4 sm:px-8 md:px-12 lg:px-16"> ', ' </main> <footer class="bg-secondary py-6 px-4 sm:px-8 md:px-12 lg:px-16 text-center"> <div class="max-w-screen-lg mx-auto"> <div class="flex justify-center space-x-6 mb-4"> <a href="https://github.com/Eduwilll/my-aws-docs" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors"> ', ' </a> <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors"> ', ' </a> <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors"> ', ' </a> </div> <p class="text-muted-foreground">&copy; 2024 Eduwilll. Todos os direitos reservados.</p> <p class="text-muted-foreground mt-2"> <a href="/terms" class="hover:text-primary transition-colors">\nTermos de Servi\xE7o\n</a> <span class="mx-2">|</span> <a href="/privacy" class="hover:text-primary transition-colors">\nPol\xEDtica de Privacidade\n</a> </p> </div> </footer> </body></html>'])), title, renderHead(), renderComponent($$result, "Cloud", Cloud, { "size": 48, "color": "#0B64F4" }), renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Eduardo/Desktop/ProjetoEscolaDaNuvel/my-aws-docs/src/components/ThemeToggle", "client:component-export": "default" }), renderComponent($$result, "Github", Github, { "className": "w-5 h-5" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Github", Github, {}), renderComponent($$result, "Twitter", Twitter, {}), renderComponent($$result, "Linkedin", Linkedin, {}));
}, "C:/Users/Eduardo/Desktop/ProjetoEscolaDaNuvel/my-aws-docs/src/layouts/BaseLayout.astro", undefined);

export { $$BaseLayout as $ };
