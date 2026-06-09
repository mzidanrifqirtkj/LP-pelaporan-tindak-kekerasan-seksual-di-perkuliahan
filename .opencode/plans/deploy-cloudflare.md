# Rencana Deploy Next.js ke Cloudflare + GitHub Actions

## 1. Buat `wrangler.jsonc` (konfigurasi Worker)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "lp-pelaporan-tindak-kekerasan-seksual-di-perkuliahan",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": [
    "nodejs_compat",
    "global_fetch_strictly_public"
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "lp-pelaporan-tindak-kekerasan-seksual-di-perkuliahan"
    }
  ],
  "observability": {
    "enabled": true
  }
}
```

## 2. Hapus `export const runtime = 'edge'` dari 3 file

**`@opennextjs/cloudflare` tidak mendukung edge runtime.**

- `src/app/api/auth/route.ts` — hapus baris `export const runtime = 'edge';`
- `src/app/api/content/route.ts` — hapus baris `export const runtime = 'edge';`
- `src/app/api/publish/route.ts` — hapus baris `export const runtime = 'edge';` dan komentar di atasnya

## 3. Update `next.config.ts`

Tambah `initOpenNextCloudflareForDev()` di akhir file:

```typescript
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
```

## 4. Update `package.json` — tambah scripts

```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
```

## 5. Buat `public/_headers` untuk cache static assets

```
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
```

## 6. Update `.gitignore`

Tambah baris `.open-next` di bagian bawah.

## 7. Install wrangler

```bash
npm install --save-dev wrangler@latest
```

## 8. Set GitHub Secrets

Di GitHub repo → Settings → Secrets and variables → Actions:

| Secret | Nilai |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare (izin Workers) |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID dari dashboard Cloudflare |
| `GITHUB_PERSONAL_TOKEN` | Token GitHub dengan repo:dispatches |

## 9. Set Environment Variables di Cloudflare

Via dashboard atau CLI:
```bash
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put GITHUB_PERSONAL_TOKEN
```

## Cara Kerja

1. **Push ke `main`** → GitHub Actions auto build + deploy
2. **Dari admin panel** → trigger `repository_dispatch` → GitHub Actions deploy
3. **Manual** → `npm run deploy` via CLI
