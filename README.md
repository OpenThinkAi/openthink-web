# openthink-web

The marketing & docs site for the [OpenThinkAi](https://github.com/OpenThinkAi) tool suite, served at [openthink.dev](https://openthink.dev).

## Structure

```
/                  suite homepage (overview + tool grid)
/think/            @openthink/think    — memory for AI agents
/team/             @openthink/team     — role-pipeline ticket pump
/stamp/            @openthink/stamp    — local headless code review
/ui-leaf/          @openthink/ui-leaf  — bring-your-own-view CLI runtime
/audit/            @openthink/audit    — whole-codebase audits (oaudit, Rust)
/dispatch/         @openthink/dispatch — GitHub triage router
```

Every page shares `style.css` and `app.js` from the root. Each tool page declares
its config inline as `window.SITE_CONFIG` (tool, tabs, sidebar, github URL, npm
package) before loading `app.js`.

The suite bar (top of every page) is the cross-tool nav. The tabbar (per-tool
pages only) is the in-tool nav.

## Local preview

```sh
cd openthink-web
python3 -m http.server 8080
# then visit http://localhost:8080
```

Root-relative paths (`/style.css`, `/think/`, etc) require a proper HTTP server —
opening `index.html` directly via `file://` won't resolve them.

## Status

| Page         | State                                                    |
| ------------ | -------------------------------------------------------- |
| `/`          | Homepage drafted                                          |
| `/think/`    | Full page drafted (concepts rewrite + library tier)       |
| `/team/`     | Placeholder — needs concepts/install/docs pass            |
| `/stamp/`    | Placeholder — needs concepts/install/docs pass            |
| `/ui-leaf/`  | Placeholder — needs concepts/install/docs pass            |
| `/audit/`    | Placeholder — needs concepts/install/docs pass            |
| `/dispatch/` | Placeholder — needs concepts/install/docs pass            |

## Cutover

The CNAME for `openthink.dev` currently points at `OpenThinkAi/think-cli` (served
from `think-cli/docs/`). When this site is ready:

1. Push this repo to `OpenThinkAi/openthink-web`.
2. Add a `CNAME` file containing `openthink.dev`.
3. Enable GitHub Pages on the `main` branch.
4. Update DNS / verify the new site renders at the Pages URL.
5. Remove `docs/` from `OpenThinkAi/think-cli` (or leave it as legacy with no
   CNAME) so the domain only resolves to the new repo.

## License

MIT.
