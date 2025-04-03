
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
    'index.csr.html': {size: 23575, hash: '0db470cbf3511ddc8f0bce9b54f20d858066d54d1e7900931fbb334c7d759d3f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17149, hash: '07f00265a39a295b6376bedb6bf9d9d28fcbc37b9bc3714869c4e7e1cf3a4e92', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'sobre/index.html': {size: 58773, hash: 'aad50da89fef552363afc4d7bea62ec08837c9fdeb4db30b4edd4521801641f4', text: () => import('./assets-chunks/sobre_index_html.mjs').then(m => m.default)},
    'index.html': {size: 54176, hash: 'caaf1ba17410c1dfac614387a886503dbd7c789624ed1dcfdab5481a5fdc7e4d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 58651, hash: 'ac4248bce7185c2f1cabcc37128d3b8b7116e0a153f74fc8091bf62227b2a688', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)},
    'projetos/index.html': {size: 196650, hash: '9105e8390deb11e670efa200a804f6851e053479065e77c0fd5bf7bb18e66c06', text: () => import('./assets-chunks/projetos_index_html.mjs').then(m => m.default)},
    'styles-WNKDDIZJ.css': {size: 6979, hash: 'AsSxQJi0uyE', text: () => import('./assets-chunks/styles-WNKDDIZJ_css.mjs').then(m => m.default)}
  },
};
