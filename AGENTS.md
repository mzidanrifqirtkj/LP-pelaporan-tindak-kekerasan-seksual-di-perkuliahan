# PPKPT Landing Page

**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

## Commands

```bash
npm run dev          # dev server on 127.0.0.1:3000 (not 0.0.0.0)
npm run build        # standard Next.js build
npm run lint         # ESLint 9
npm run preview      # OpenNext build + wrangler preview
npm run deploy       # OpenNext build + wrangler deploy
npm run cf-typegen   # generate cloudflare-env.d.ts from wrangler.jsonc
```

## Architecture

- **Content:** All site text lives in `src/data/content.json`, typed via `src/lib/content.ts`. Pages import it directly at build time.
- **Admin panel** (`/admin`): password-based auth. Edits content, saves to Cloudflare KV (`PPKPT_CONTENT`), then optionally publishes by committing to GitHub + triggering `repository_dispatch` → GitHub Actions redeploys.
- **Deploy:** GitHub Actions on push to `main` or `repository_dispatch` → `opennextjs-cloudflare build` → `wrangler deploy`.
- **KV** is only read/written by API routes (`/api/content`). Static pages use `content.json` directly — restart dev server or rebuild to see changes.
- **R2 bucket** (`ppkpt`, binding `PPKPT_IMAGES`) for file uploads from admin panel. Upload API: `POST /api/upload` (`folder` + `file`). Served via `/api/images/[...key]`. Admin panel sections with image/file upload: hero, lapor, team, dokumen.

## Gotchas

- OpenNext does **not** support `export const runtime = 'edge'`. Use `export const dynamic = 'force-dynamic'` instead.
- `next.config.ts` calls `initOpenNextCloudflareForDev()` via an `import` after `export default` — keep it there.
- Tailwind CSS v4 uses `@import "tailwindcss"` — no `tailwind.config.*` file.
- Dark-by-default theme with `.light` class for light mode toggle.
- Admin auth: `ADMIN_PASSWORD` env var (fallback `admin123`). Token stored in `sessionStorage`.
- Worker name: `lp-pelaporan-tindak-kekerasan-seksual-di-perkuliahan`
- Deploy config plan: `.opencode/plans/deploy-cloudflare.md`
