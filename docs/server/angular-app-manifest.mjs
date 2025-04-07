
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
    'index.csr.html': {size: 23627, hash: 'b8495840d2277e51ff79dc0c04833765d1d21a2d78ace6040bae89d352b04626', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17201, hash: 'bb06228a2a62cd9c5512216b821f96a657ece6ccf159a0e9e20be166548a2da7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'sobre/index.html': {size: 56648, hash: '37086416fd03819d6c062b2dbdad58b4de78742ad912a3e45e4d89d8ad0efbd7', text: () => import('./assets-chunks/sobre_index_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 60789, hash: '083c8a5ba6e550215dc5fdbe3926726bb2666bdf17477b7ebeaeabe82a1a19c5', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)},
    'index.html': {size: 176167, hash: '5533f12bd7db800f41c8f4068d14ca94db3155186cae9c2afced575d14a658b0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'projetos/index.html': {size: 212606, hash: '17aeae6defb8731f4c7602a32b4f265a1ade14c56de9335a2ac2cb224b84e488', text: () => import('./assets-chunks/projetos_index_html.mjs').then(m => m.default)},
    'styles-ADDNBY74.css': {size: 10775, hash: 'haFQUe3ZUjk', text: () => import('./assets-chunks/styles-ADDNBY74_css.mjs').then(m => m.default)}
  },
};
