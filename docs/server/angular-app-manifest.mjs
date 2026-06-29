
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
    'index.csr.html': {size: 695, hash: '909a3f40e2128b1de7c14162754278150e77f23f99fd1cdb0da59f61ce0d5000', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1235, hash: '276b9f2075eb79652e7f1dc4b3c00df7a734cd9f78afdc5dc8e393d9f9ea7e73', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 20961, hash: '22757b6ce16c95bf74b656f65b46b1c4e25a6b06009f38803e5cda34921200f7', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)},
    'index.html': {size: 49288, hash: 'c0836e2d407b35dfe441e1c38c504568106acfb072d8add1affe9ba0cf2d90e4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'sobre/index.html': {size: 21837, hash: 'e9023be84c2b520f81c2a45ea88d4f8406263902708f0c0410481c237c08067b', text: () => import('./assets-chunks/sobre_index_html.mjs').then(m => m.default)},
    'projetos/index.html': {size: 14730, hash: 'c58a9793a5a4b9866b2dfbf35e1aa10adf305966361b9ef0a1c7b5162c03601d', text: () => import('./assets-chunks/projetos_index_html.mjs').then(m => m.default)}
  },
};
