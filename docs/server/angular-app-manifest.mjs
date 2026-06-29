
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
    'index.csr.html': {size: 695, hash: 'a9ae50c01f31eeb32fbd08f88f79cb67ad0d49077a2e4e5e70857874a8a1bcfa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1235, hash: 'b92bd13383099528aaa17c5a93c040940eda2cc837127c962845e0a73896a854', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'sobre/index.html': {size: 21875, hash: '3d20f145b8c9518ce918316a2bd8733526f5065978b2d8a06c1bb4519d96dce6', text: () => import('./assets-chunks/sobre_index_html.mjs').then(m => m.default)},
    'projetos/index.html': {size: 14768, hash: '51669d81ad0dfe03d8d3b3cd4819df57e495be763f5c147ed3138d2979dc42c3', text: () => import('./assets-chunks/projetos_index_html.mjs').then(m => m.default)},
    'index.html': {size: 49326, hash: '33e1c28ee2f00dc3af94562c28bb47b818f26feddef430a5279eedf458505fe0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'contato/index.html': {size: 20999, hash: '013623af80cccfd9397d4cf2a7658cbdd3a635ba5a512ba0796d24352b3c59c4', text: () => import('./assets-chunks/contato_index_html.mjs').then(m => m.default)}
  },
};
