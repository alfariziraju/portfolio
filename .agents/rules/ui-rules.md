---
trigger: always_on
description: "Aturan ketat antarmuka UI terkait icon pulse dan dot status"
---

# UI & Icon Strict Rules

> [!IMPORTANT]
> **DILARANG KERAS MENGGUNAKAN ICON PULSE (KELAP-KELIP MAUPUN TIDAK)**
> 
> 1. **No Pulse Animation**: Dilarang keras menggunakan class animasi `animate-pulse` atau efek blinking/kelap-kelip dalam bentuk apa pun pada seluruh elemen UI (seperti indikator status, badge, dot, atau tombol).
> 2. **No Dot/Pulse Icons**: Dilarang keras menggunakan lingkaran titik status (`rounded-full` kecil seperti `w-1.5 h-1.5`, `w-2 h-2`, titik hijau status "Open for work", dsb) baik yang berkedip maupun yang diam (statis).
> 3. **Clean Typographic Status**: Representasikan status murni menggunakan teks tipografi bersih, tag mono, atau badge teks sederhana (misal: `[OPEN FOR WORK]`, `STATUS: OPTIMAL`, `ONLINE`) tanpa ikon titik/pulse buatan.
