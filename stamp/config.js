// Page configuration read by app.js (see the shape documented there).
// Kept out of the HTML so the Content-Security-Policy can be script-src 'self'.
window.SITE_CONFIG = {
  tool: 'stamp',
  tabs: ['home', 'concepts', 'install', 'docs'],
  githubUrl: 'https://github.com/OpenThinkAi/stamp-cli',
  npmPackage: '@openthink/stamp',
  sidebar: {
    home: {
      groups: [
        { label: 'overview', items: [
          { label: 'the review cycle', href: '#cycle' },
          { label: 'backpressure', href: '#why' },
          { label: 'less burden', href: '#split' },
          { label: 'get started', href: '#next' },
        ]},
        { label: 'jump to', items: [
          { label: 'concepts', tab: 'concepts' },
          { label: 'install', tab: 'install' },
          { label: 'docs', tab: 'docs' },
        ]},
        { label: 'links', items: [
          { label: 'github', href: 'https://github.com/OpenThinkAi/stamp-cli', external: true },
          { label: 'npm', href: 'https://www.npmjs.com/package/@openthink/stamp', external: true },
        ]},
      ],
    },
    concepts: {
      groups: [
        { label: 'concepts', items: [
          { label: '01 reviewers',       href: '#c1' },
          { label: '02 attestation',     href: '#c2' },
          { label: '03 the gate',        href: '#c3' },
          { label: '04 verification',    href: '#c4' },
          { label: '05 server-attested', href: '#c5' },
        ]},
        { label: 'deployment shapes', items: [
          { label: 'A server-gated',   href: '#shape-server' },
          { label: 'B github-primary', href: '#shape-github' },
          { label: 'C local-only',     href: '#shape-local' },
        ]},
        { label: 'design', items: [
          { label: 'how it fits together', href: '#arch' },
        ]},
      ],
    },
    install: {
      groups: [
        { label: 'deployment shapes', items: [
          { label: 'A server-gated',   href: '#s1' },
          { label: 'B github-primary', href: '#s2' },
          { label: 'C local-only',     href: '#s3' },
        ]},
      ],
    },
    docs: {
      groups: [
        { label: 'reference', items: [
          { label: 'core commands',     href: '#commands' },
          { label: 'where things live', href: '#files' },
          { label: 'links',             href: '#links' },
        ]},
        { label: 'links', items: [
          { label: 'github', href: 'https://github.com/OpenThinkAi/stamp-cli', external: true },
          { label: 'npm', href: 'https://www.npmjs.com/package/@openthink/stamp', external: true },
          { label: 'design doc', href: 'https://github.com/OpenThinkAi/stamp-cli/blob/main/DESIGN.md', external: true },
          { label: 'issues', href: 'https://github.com/OpenThinkAi/stamp-cli/issues', external: true },
        ]},
      ],
    },
  },
};
