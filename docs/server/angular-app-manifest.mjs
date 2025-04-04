
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/sobre"
  },
  {
    "renderMode": 2,
    "route": "/projetos"
  },
  {
    "renderMode": 2,
    "route": "/contato"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23627, hash: '309db988302b94fdd2ad4a8e7604edfeca0aee5e52244a164efb9efc942797f9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17201, hash: 'b23e5e3fa0ecc5405de72e82b584184b877ec03e544ea93be3920a69edff6a7f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'sobre/index.html': {size: 58931, hash: '0fb5b54e3a4b334aec13ed39338c91d19c8624942b772c4e795b027ee07a6d11', text: () => import('./assets-chunks/sobre_index_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 58809, hash: '45e8922a544bae68ee441d165ac20108b0f110e8a75760c09076fc14bb89c66e', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)},
    'projetos/index.html': {size: 190530, hash: '2d61ddd6d4786c528c5b8b1d78874f666970ab003deba6ab3cb0d6ca94a9ea36', text: () => import('./assets-chunks/projetos_index_html.mjs').then(m => m.default)},
    'index.html': {size: 178877, hash: '5e47f4dcaad4ffab6de337c9b006a88d84393221db4891acb1e5eac6c5eebd1a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-ADDNBY74.css': {size: 10775, hash: 'haFQUe3ZUjk', text: () => import('./assets-chunks/styles-ADDNBY74_css.mjs').then(m => m.default)}
  },
};
