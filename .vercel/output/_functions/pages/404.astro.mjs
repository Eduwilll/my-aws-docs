import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_ZG_env5N.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DiJdqewj.mjs';
import { Home } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "P\xE1gina n\xE3o encontrada" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col items-center justify-center flex-grow text-center px-4"> <div class="max-w-2xl mx-auto"> <img src="/src/assets/undraw_quiet-street_v45k.svg" alt="Ilustração 404" class="w-84 h-64 mx-auto mb-8"> <!-- Título --> <h1 class="text-6xl font-bold text-primary mb-4">404</h1> <!-- Mensagem --> <p class="text-2xl text-muted-foreground mb-8">
Oops! A página que você está procurando não foi encontrada ou está sendo trabalhada neste momento.
</p> <!-- Botão de voltar --> <a href="/" class="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"> ${renderComponent($$result2, "Home", Home, {})}
Voltar à página inicial
</a> </div> </main> ` })}`;
}, "C:/Users/Eduardo/Desktop/ProjetoEscolaDaNuvel/my-aws-docs/src/pages/404.astro", undefined);

const $$file = "C:/Users/Eduardo/Desktop/ProjetoEscolaDaNuvel/my-aws-docs/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
