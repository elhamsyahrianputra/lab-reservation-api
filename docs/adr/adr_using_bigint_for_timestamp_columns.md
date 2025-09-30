---
title: 'Using BigInt for Timestamp Columns'
status: accepted
date: 2025-09-30
decision-makers: [Elham Syahrian Putra]
consulted: [N/A]
informed: [N/A]
---

# Context and Problem Statement

Aplikasi perlu menyimpan informasi waktu seperti `created_at` dan `updated_at` untuk setiap *record* di dalam database. Pemilihan tipe data yang tepat untuk menyimpan *timestamp* sangat krusial karena akan memengaruhi cara data diolah, dibandingkan, dan ditampilkan di sisi klien.

Ada beberapa pendekatan umum untuk menyimpan informasi waktu:

1.  **ISO 8601 String**: Menyimpan waktu sebagai teks dalam format standar `YYYY-MM-DDTHH:mm:ss.sssZ`. Format ini mudah dibaca oleh manusia.
2.  **Native Database Timestamp**: Menggunakan tipe data bawaan database seperti `TIMESTAMP` atau `DATETIME`. Tipe ini biasanya dioptimalkan untuk operasi tanggal dan waktu di level database.
3.  **Unix Timestamp (Integer/BigInt)**: Menyimpan waktu sebagai jumlah detik atau milidetik yang telah berlalu sejak *Unix Epoch* (1 Januari 1970).

# Decision Drivers

-   **Tujuan Pembelajaran**: Adanya keinginan untuk mempelajari dan mengimplementasikan sistem penyimpanan waktu selain format ISO 8601 yang umum digunakan, secara spesifik menggunakan Unix time.
-   **Universalitas**: Unix timestamp adalah representasi numerik yang tidak bergantung pada zona waktu atau format, membuatnya mudah dioperasikan di berbagai bahasa pemrograman dan sistem.
-   **Performa**: Operasi perbandingan (lebih besar dari, lebih kecil dari) pada angka (Integer/BigInt) seringkali lebih cepat daripada perbandingan string atau tipe data tanggal yang kompleks.

# Considered Options

-   Opsi A - Menyimpan waktu sebagai String ISO 8601.
-   Opsi B - Menggunakan tipe data `TIMESTAMP` bawaan PostgreSQL.
-   Opsi C - Menyimpan waktu sebagai Unix timestamp (milidetik) menggunakan tipe data `BigInt`.

# Decision Outcome

**Chosen option: Opsi C (Menyimpan waktu sebagai Unix timestamp menggunakan `BigInt`)**.

Keputusan ini diambil berdasarkan keinginan untuk mengeksplorasi penggunaan Unix time. Seperti yang terlihat pada `prisma/schema.prisma`, semua kolom yang berhubungan dengan waktu seperti `created_at`, `updated_at`, `booking_at`, dan lainnya didefinisikan dengan tipe `BigInt`. Ini mengindikasikan bahwa semua nilai waktu disimpan sebagai jumlah milidetik sejak *Unix Epoch*.

### Consequences

**Kelebihan**

-   **Konsisten dan Universal**: Semua *timestamp* disimpan dalam format numerik tunggal di seluruh aplikasi.
-   **Independen Zona Waktu**: Unix time secara inheren berbasis UTC, mengurangi kerumitan saat menangani zona waktu yang berbeda antara server dan klien.
-   **Mudah Diolah**: Mudah dikonversi dan dimanipulasi di sisi klien (JavaScript) menggunakan `new Date(timestamp)`.

**Kekurangan**

-   **Tidak Mudah Dibaca**: Nilai `BigInt` seperti `1727670792000` tidak bisa langsung dibaca oleh manusia tanpa konversi. Hal ini membuat proses *debugging* langsung di database menjadi lebih sulit.
-   **Perlu Konversi**: Setiap kali data akan ditampilkan kepada pengguna, nilai *timestamp* ini harus selalu dikonversi terlebih dahulu menjadi format tanggal yang mudah dibaca.
-   **Potensi Masalah Serialisasi**: Tipe data `BigInt` di JavaScript tidak dapat langsung di-serialisasi ke JSON secara default, sehingga memerlukan penanganan khusus seperti yang sudah dilakukan di `src/main.ts` `(BigInt.prototype as any).toJSON`.

# Pros and Cons of the Options

### Opsi A - Menyimpan waktu sebagai String ISO 8601

**Kelebihan**

-   Sangat mudah dibaca dan di-debug langsung di database.

**Kekurangan**

-   Memakan ruang penyimpanan yang lebih besar dibandingkan numerik.
-   Operasi perbandingan bisa jadi lebih lambat.

### Opsi B - Menggunakan tipe data `TIMESTAMP` bawaan PostgreSQL

**Kelebihan**

-   Memanfaatkan fitur dan fungsi tanggal/waktu yang sudah dioptimalkan oleh database.
-   Prisma akan secara otomatis mengonversinya menjadi objek `Date` di JavaScript.

**Kekurangan**

-   Tidak memenuhi tujuan pembelajaran utama untuk menggunakan Unix time.
-   Penanganan zona waktu bisa menjadi lebih kompleks jika tidak dikelola dengan hati-hati.

### Opsi C - Menyimpan waktu sebagai `BigInt` (Unix timestamp)

**Kelebihan**

-   Memenuhi tujuan untuk belajar dan implementasi Unix time.
-   Formatnya ringkas dan efisien untuk perbandingan.
-   Menyederhanakan logika terkait zona waktu.

**Kekurangan**

-   Memerlukan konversi setiap kali akan ditampilkan ke pengguna.
-   Sulit dibaca saat melakukan *query* atau inspeksi data mentah.