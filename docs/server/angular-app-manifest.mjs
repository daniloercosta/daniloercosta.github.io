
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
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
    "renderMode": 0,
    "route": "/projetos/*"
  },
  {
    "renderMode": 2,
    "route": "/contato"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 695, hash: '3e4f74c128929ec5a12f2b51fbe44d680c3a1b8500e1483d618bbdfb1f32121a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1235, hash: '9fb0b4068739bd5d31f983aa25e9161e8bd07143e2711ef1baddb92eb0dc7e60', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projetos/index.html': {size: 14768, hash: '3207fddd86a9d35cdfc96b595a4d64bdfe518ed0a8582ec8afac8f01584c001a', text: () => import('./assets-chunks/projetos_index_html.mjs').then(m => m.default)},
    'index.html': {size: 49326, hash: 'e010474f3f11b405f6eb3e27f03cafb31cf9f3f5c8e5cef0968f9b7de338005d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'sobre/index.html': {size: 21875, hash: 'e89704a884ed7f0f13bb2210a71a77a9d7f20c5a206504df9c6bde261bad8f71', text: () => import('./assets-chunks/sobre_index_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 20999, hash: '9ad714b6ce191098d20ef2e1e4c86ae0788f80764404f6e603672dffcbf71a84', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)}
  },
};
