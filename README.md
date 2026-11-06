# 🎓 Surabaya Private — Website Bimbel Privat

lembaga bimbel berbasis private di surabaya

Website landing page untuk lembaga bimbel **berbasis privat** (guru datang ke rumah murid) yang menghubungkan guru dan murid di Surabaya. Murid bebas memilih mata pelajaran: **Matematika, IPA, Bahasa Inggris, dan Mengaji** untuk semua jenjang (SD, SMP, SMA).

## 📂 Struktur File

```
/
├── index.html        # Seluruh halaman (navbar, hero, keunggulan, mapel, jenjang,
│                     #  cara pesan, form booking, harga, testimoni, FAQ, footer/kontak)
├── css/
│   └── style.css     # Styling responsif (mobile-first breakpoints) + animasi
└── js/
    └── main.js       # Interaksi: menu mobile, reveal on scroll, counter statistik,
                      #  tab jenjang, FAQ accordion, form booking → WhatsApp
```

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| **Konsep "Guru Datang ke Rumah"** | Pesan utama di hero, keunggulan, dan langkah pemesanan |
| **Murid Pilih Pelajaran Sendiri** | Kartu Matematika, IPA, Bahasa Inggris, Mengaji + checkbox multi-pilih di form |
| **Semua Jenjang** | Tab interaktif SD / SMP / SMA |
| **Form Booking → WhatsApp** | Data pesanan otomatis diformat rapi dan dikirim ke WA **0877-6768-1430** |
| **Tombol WA Melayang** | Akses chat cepat dari halaman mana pun |
| **Harga Paket** | Reguler, Intensif (populer), dan Paket Mengaji |
| **FAQ Accordion & Testimoni** | Menjawab keberatan umum orang tua |
| **Responsif** | Tampil baik di desktop, tablet, dan ponsel |

## 📞 Data Kontak (tercantum di footer)

- **WhatsApp/Telp:** 0877-6768-1430 (`wa.me/6287767681430`)
- **Alamat:** Jl. Mulyorejo Tengah No. 53, Mulyosari, Surabaya
- **Email:** surabayaprivate@gmail.com

## 🚀 Cara Menjalankan

Tanpa build tools — cukup buka file atau jalankan server statis:

```bash
# Opsi 1: buka langsung
open index.html

# Opsi 2: server lokal
python3 -m http.server 8000
# lalu kunjungi http://localhost:8000
```

## 🎨 Kustomisasi Cepat

- **Warna tema:** ubah variabel `--primary` dkk. di bagian `:root` pada `css/style.css`.
- **Nomor WA:** konstanta `WA_NUMBER` di `js/main.js` dan link `wa.me/...` di `index.html`.
- **Harga & teks:** langsung edit di `index.html` (semua konten dalam bahasa Indonesia).

