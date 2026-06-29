
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
    'index.csr.html': {size: 695, hash: '773470ca9a88b352d040b450604c01b516921645640e1a258ab3b3d182ff4861', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1235, hash: 'eae5146ca77ceb03ed4eda9e9ccfa2f14e3e0f7bda02aa94fed931621b2a9734', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'sobre/index.html': {size: 21837, hash: 'fc34b629422fc0e9735b611aff5d6f6a9448a94293576c8bc84aa4fe0d689c3c', text: () => import('./assets-chunks/sobre_index_html.mjs').then(m => m.default)},
    'projetos/index.html': {size: 14730, hash: 'eb6a664add5e9955ec13acc3dc5f3517545df25f9a18277f5c8f697b8c2adddb', text: () => import('./assets-chunks/projetos_index_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 20961, hash: '4a0f4ea4f5ab1b48a54cc4ba580c0e59592bdea50a5057ed8d4216cebb24875c', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)},
    'index.html': {size: 49288, hash: 'fa12d9270d04cf231b7b978d45611379a82e17b170e9174211cf5fc2949d0650', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}
  },
};
