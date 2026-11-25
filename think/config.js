// Page configuration read by app.js (see the shape documented there).
// Kept out of the HTML so the Content-Security-Policy can be script-src 'self'.
window.SITE_CONFIG = {
  tool: 'think',
  tabs: ['home', 'concepts', 'install', 'docs'],
  githubUrl: 'https://github.com/OpenThinkAi/think-cli',
  npmPackage: '@openthink/think',
  sidebar: {
    home: {
      groups: [
        { label: 'overview', items: [
          { label: 'one mind, many workers', href: '#demo' },
          { label: 'alignment, in practice', href: '#why' },
          { label: 'get started', href: '#next' },
        ]},
        { label: 'jump to', items: [
          { label: 'concepts', tab: 'concepts' },
          { label: 'install', tab: 'install' },
          { label: 'docs', tab: 'docs' },
        ]},
        { label: 'links', items: [
          { label: 'github', href: 'https://github.com/OpenThinkAi/think-cli', external: true },
          { label: 'npm', href: 'https://www.npmjs.com/package/@openthink/think', external: true },
        ]},
      ],
    },
    concepts: {
      groups: [
        { label: 'concepts', items: [
          { label: '01 memories',         href: '#c1' },
          { label: '02 retros',           href: '#c2' },
          { label: '03 cortex',           href: '#c3' },
          { label: '04 recall',           href: '#c4' },
          { label: '05 vector embedding', href: '#c5' },
          { label: '06 cloud',            href: '#c6' },
        ]},
        { label: 'design', items: [
          { label: 'architecture', href: '#arch' },
        ]},
      ],
    },
    install: {
      groups: [
        { label: 'steps', items: [
          { label: '1. install & init', href: '#s1' },
          { label: '2. create cortex',  href: '#s2' },
          { label: '3. use it',         href: '#s3' },
        ]},
      ],
    },
    docs: {
      groups: [
        { label: 'reference', items: [
          { label: 'all commands', href: '#commands' },
          { label: 'where things live', href: '#files' },
        ]},
        { label: 'links', items: [
          { label: 'github', href: 'https://github.com/OpenThinkAi/think-cli', external: true },
          { label: 'npm', href: 'https://www.npmjs.com/package/@openthink/think', external: true },
          { label: 'architecture', href: 'https://github.com/OpenThinkAi/think-cli/blob/main/docs/architecture.md', external: true },
          { label: 'issues', href: 'https://github.com/OpenThinkAi/think-cli/issues', external: true },
        ]},
      ],
    },
  },
};
