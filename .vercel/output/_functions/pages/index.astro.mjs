import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_ZG_env5N.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DiJdqewj.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "P\xE1gina Inicial" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mb-12"> <h2 class="text-3xl font-bold mb-6 text-primary">Sobre o Curso</h2> <p class="mb-6 text-muted-foreground">
O curso de AWS da Escola da Nuvem é uma oportunidade incrível para aprender 
            e se desenvolver na área de tecnologia. Junte-se a nós e venha transformar 
            o mundo com a tecnologia.
</p> <div class="flex justify-center"> <a href="/curso" class="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
Explorar o Curso
</a> </div> </section> <section class="mb-12"> <h2 class="text-3xl font-bold mb-6 text-primary">Módulos do Curso</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${[
    { title: "Fundamentos AWS", icon: "fa-cloud" },
    { title: "Computa\xE7\xE3o", icon: "fa-server" },
    { title: "Armazenamento", icon: "fa-database" },
    { title: "Redes", icon: "fa-network-wired" },
    { title: "Seguran\xE7a", icon: "fa-shield-alt" },
    { title: "Projetos Pr\xE1ticos", icon: "fa-code" }
  ].map((module) => renderTemplate`<div class="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"> <i${addAttribute(`fas ${module.icon} text-3xl text-primary mb-4`, "class")}></i> <h3 class="text-xl font-semibold mb-2">${module.title}</h3> <a${addAttribute(`/modulos/${module.title.toLowerCase().replace(" ", "-")}`, "href")} class="text-primary hover:text-primary/80 transition-colors duration-300">
Saiba mais →
</a> </div>`)} </div> </section> <section class="mb-12"> <h2 class="text-3xl font-bold mb-6 text-primary">Redes Sociais</h2> <ul class="flex justify-center space-x-6 mb-6"> <li> <a href="https://www.instagram.com/escola_da_nuvem/" target="_blank" class="text-primary hover:text-primary/80 transition-colors duration-300"> <i class="fab fa-instagram text-3xl"></i> </a> </li> <li> <a href="https://www.facebook.com/EscolaDaNuvemOficial" target="_blank" class="text-primary hover:text-primary/80 transition-colors duration-300"> <i class="fab fa-facebook-f text-3xl"></i> </a> </li> <li> <a href="https://www.youtube.com/@escoladanuvem" target="_blank" class="text-primary hover:text-primary/80 transition-colors duration-300"> <i class="fab fa-youtube text-3xl"></i> </a> </li> <li> <a href="https://www.linkedin.com/school/escola-da-nuvem/" target="_blank" class="text-primary hover:text-primary/80 transition-colors duration-300"> <i class="fab fa-linkedin-in text-3xl"></i> </a> </li> </ul> </section> ` })}`;
}, "C:/Users/Eduardo/Desktop/ProjetoEscolaDaNuvel/my-aws-docs/src/pages/index.astro", undefined);

const $$file = "C:/Users/Eduardo/Desktop/ProjetoEscolaDaNuvel/my-aws-docs/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
