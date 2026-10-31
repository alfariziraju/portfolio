# Repository Guidelines & Rules

## 🚫 ATURAN UTAMA: DILARANG KERAS MENGGUNAKAN ICON PULSE / DOT STATUS

- **Dilarang keras memakai icon pulse baik yang kelap-kelip (`animate-pulse`) maupun tidak (statis).**
- **Tidak boleh ada elemen dot/lingkaran status** (seperti `<span className="... rounded-full bg-emerald-400 ..."></span>` atau titik hijau/putih status *Available for work*, *Active*, dsb).
- Gunakan teks tipografi bersih atau badge teks murni (contoh: `[AVAILABLE FOR WORK]`, `STATUS: ACTIVE`, `STATUS: OPTIMAL`) tanpa ornamen titik bulat atau efek denyut/blinking.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
