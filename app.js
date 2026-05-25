(() => {
  'use strict';

  // Per-page configuration is set by each HTML page before loading this script,
  // via window.SITE_CONFIG. Shape:
  //   {
  //     tool: 'think' | 'team' | 'stamp' | 'ui-leaf' | 'audit' | null,
  //     tabs: ['home','concepts','install','docs'],
  //     githubUrl: 'https://github.com/...',
  //     npmPackage: '@openthink/think',         // optional, used to fetch latest version
  //     sidebar: { home: {...}, concepts: {...}, ... }
  //   }
  // Pages that don't have tabs (e.g. the suite homepage) can omit `tabs` and
  // `sidebar`; only the keyboard shortcuts and version-pill behavior apply.

  const cfg = window.SITE_CONFIG || {};
  const TABS = cfg.tabs || [];
  const SIDEBAR = cfg.sidebar || {};
  const GITHUB_URL = cfg.githubUrl || 'https://github.com/OpenThinkAi';
  const NPM_PACKAGE = cfg.npmPackage;

  const tabsEl = document.querySelectorAll('.tab');
  const viewsEl = document.querySelectorAll('.view');
  const sidebarNav = document.getElementById('sidebar-nav');
  const helpModal = document.getElementById('help-modal');

  let currentTab = TABS[0] || null;
  let sidebarFocusIndex = -1;

  function renderSidebar(tab) {
    if (!sidebarNav) return;
    const config = SIDEBAR[tab];
    if (!config) { sidebarNav.innerHTML = ''; return; }
    const html = config.groups.map(group => {
      const items = group.items.map((item, i) => {
        const last = i === group.items.length - 1 ? ' last' : '';
        if (item.tab) {
          return `<a href="#" class="nav-link${last}" data-goto="${item.tab}">${item.label}</a>`;
        }
        const ext = item.external ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${item.href}" class="nav-link${last}"${ext}>${item.label}</a>`;
      }).join('');
      return `<div class="group">${group.label}</div>${items}`;
    }).join('');
    sidebarNav.innerHTML = html;
    sidebarFocusIndex = -1;
  }

  function setTab(tab, opts = {}) {
    if (!TABS.includes(tab)) return;
    currentTab = tab;
    tabsEl.forEach(el => el.classList.toggle('active', el.dataset.tab === tab));
    viewsEl.forEach(el => el.classList.toggle('active', el.dataset.view === tab));
    renderSidebar(tab);
    if (opts.updateHash !== false) {
      history.replaceState(null, '', '#' + tab);
    }
    if (opts.scrollTop !== false) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  // Tab clicks
  tabsEl.forEach(tab => {
    tab.addEventListener('click', () => setTab(tab.dataset.tab));
  });

  // Internal navigation links (data-goto)
  document.addEventListener('click', e => {
    const goto = e.target.closest('[data-goto]');
    if (goto) {
      e.preventDefault();
      setTab(goto.dataset.goto);
    }
  });

  // Initial state from hash (only on tabbed pages)
  if (TABS.length) {
    const initialHash = location.hash.slice(1);
    setTab(TABS.includes(initialHash) ? initialHash : TABS[0], { scrollTop: false });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const navLinks = sidebarNav ? sidebarNav.querySelectorAll('.nav-link') : [];

    if (helpModal && !helpModal.hidden) {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault();
        helpModal.hidden = true;
        return;
      }
      return;
    }

    // First letter of each tab triggers tab switch (h, c, i, d for default set).
    if (TABS.length) {
      const match = TABS.find(t => t[0] === e.key);
      if (match) { setTab(match); return; }
    }

    switch (e.key) {
      case 'g':
        if (GITHUB_URL) window.open(GITHUB_URL, '_blank', 'noopener');
        break;
      case '?':
        if (helpModal) helpModal.hidden = false;
        break;
      case 'Escape':
        if (helpModal && !helpModal.hidden) helpModal.hidden = true;
        break;
      case 'ArrowDown':
        if (navLinks.length) {
          e.preventDefault();
          sidebarFocusIndex = Math.min(sidebarFocusIndex + 1, navLinks.length - 1);
          navLinks[sidebarFocusIndex]?.focus();
        }
        break;
      case 'ArrowUp':
        if (navLinks.length) {
          e.preventDefault();
          sidebarFocusIndex = Math.max(sidebarFocusIndex - 1, 0);
          navLinks[sidebarFocusIndex]?.focus();
        }
        break;
    }
  });

  // Modal handlers
  if (helpModal) {
    helpModal.querySelector('.modal-close')?.addEventListener('click', () => {
      helpModal.hidden = true;
    });
    helpModal.addEventListener('click', e => {
      if (e.target === helpModal) helpModal.hidden = true;
    });
  }

  // Hashchange (back/forward)
  window.addEventListener('hashchange', () => {
    if (!TABS.length) return;
    const hash = location.hash.slice(1);
    if (TABS.includes(hash) && hash !== currentTab) {
      setTab(hash, { updateHash: false });
    }
  });

  // Highlight active sidebar item via scroll position
  if (sidebarNav) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarNav.querySelectorAll('.nav-link').forEach(a => {
            a.classList.toggle('current', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('[id]').forEach(el => {
      if (el.closest('.view')) observer.observe(el);
    });
  }

  // Fetch latest published version from npm registry
  if (NPM_PACKAGE) {
    fetch(`https://registry.npmjs.org/${NPM_PACKAGE}/latest`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.version) return;
        const label = 'v' + data.version;
        document.getElementById('version-pill')?.replaceChildren(document.createTextNode(label));
        document.getElementById('version-badge')?.replaceChildren(document.createTextNode(label));
      })
      .catch(() => {});
  }
})();
