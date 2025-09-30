---
title: 'Centralized vs. Local Prisma Exception Handling'
status: accepted
date: 2025-10-01
decision-makers: [Elham Syahrian Putra]
consulted: [N/A]
informed: [N/A]
---

# Context and Problem Statement

Aplikasi ini menggunakan Prisma sebagai ORM untuk berinteraksi dengan database. Selama operasi database, Prisma dapat menghasilkan kesalahan yang dapat diprediksi, seperti `Prisma.PrismaClientKnownRequestError`, yang memiliki kode spesifik (misalnya, `P2002` untuk pelanggaran batasan unik, `P2025` untuk record yang tidak ditemukan). Kesalahan ini perlu ditangkap dan diterjemahkan menjadi respons HTTP yang sesuai dan ramah pengguna.

Ada dua strategi utama untuk menangani kesalahan ini:

1.  **Penanganan Lokal di Service**: Setiap *service* yang melakukan operasi database membungkus panggilannya dalam blok `try...catch` untuk menangani `PrismaClientKnownRequestError` secara spesifik.
2.  **Penanganan Terpusat (Global)**: Membuat sebuah *Exception Filter* di NestJS yang khusus menangkap `Prisma.PrismaClientKnownRequestError` dan mengubahnya menjadi `HttpException` yang sesuai, yang kemudian akan ditangani oleh `HttpExceptionFilter` global.

# Decision Drivers

-   **Konsistensi Pesan Kesalahan**: Menastikan bahwa kesalahan database yang sama (misalnya, pelanggaran batasan unik) menghasilkan format respons HTTP yang konsisten di seluruh API.
-   **DRY (Don't Repeat Yourself)**: Menghindari penulisan blok `try...catch` yang sama berulang kali di berbagai *service*.
-   **Konteks Kesalahan**: Kemampuan untuk memberikan pesan kesalahan yang spesifik dan kontekstual. Misalnya, "Lab dengan nama 'X' sudah ada" lebih informatif daripada "Pelanggaran batasan unik."
-   **Pemisahan Tanggung Jawab**: Memisahkan logika penanganan kesalahan infrastruktur (database) dari logika bisnis utama.

# Considered Options

-   Opsi A - Penanganan lokal di setiap *service*.
-   Opsi B - Menggunakan *Exception Filter* terpusat untuk kesalahan Prisma.
-   Opsi C - Pendekatan Hibrida: Menggunakan *filter* global untuk kasus umum dan penanganan lokal untuk kasus yang memerlukan pesan kontekstual.

# Decision Outcome

**Chosen option: Opsi C (Pendekatan Hibrida)**.

Meskipun ada file `src/common/filters/prisma-exception.filter.ts` yang menunjukkan niat untuk penanganan terpusat, analisis kode menunjukkan bahwa banyak *service* (seperti `LabsService`, `LabInventoriesService`, dan `EquipmentCategoriesService`) masih mengimplementasikan blok `try...catch` mereka sendiri.

Ini mengindikasikan sebuah keputusan desain yang disengaja:
1.  **Penanganan lokal** lebih diutamakan ketika pesan kesalahan yang sangat spesifik dan kaya konteks dapat diberikan kepada pengguna. Contohnya, di `LabInventoriesService`, kesalahan `P2002` menghasilkan pesan: `Lab inventory '${createLabInventoryDto.name}' already exist in lab '${lab.name}'.`
2.  **Filter global** (`prisma-exception.filter.ts`) bertindak sebagai jaring pengaman (*catch-all*) untuk menangani kesalahan Prisma umum yang mungkin tidak ditangani secara eksplisit di level *service*, memastikan konsistensi dasar.

### Consequences

**Kelebihan**

-   **Pesan Kesalahan Terbaik**: Pengguna menerima pesan kesalahan yang paling relevan dan informatif, karena penanganan lokal dapat menyertakan detail dari data *request*.
-   **Ketahanan**: Adanya *filter* global memastikan bahwa tidak ada kesalahan Prisma yang "lolos" dan menyebabkan *crash* server atau respons `500 Internal Server Error` yang tidak informatif.
-   **Fleksibilitas**: Pengembang dapat memilih antara memberikan penanganan kesalahan kustom yang detail atau membiarkan *filter* global menanganinya, tergantung pada kebutuhan setiap *endpoint*.

**Kekurangan**

-   **Potensi Duplikasi**: Ada risiko bahwa logika penanganan kesalahan yang serupa dapat ditulis di beberapa *service* yang berbeda.
-   **Kompleksitas**: Pengembang harus sadar akan dua mekanisme penanganan kesalahan yang ada dan memutuskan mana yang akan digunakan.

# Pros and Cons of the Options

### Opsi A - Penanganan lokal di setiap *service*.

**Kelebihan**

-   Memberikan pesan kesalahan yang paling spesifik dan kontekstual.

**Kekurangan**

-   Menyebabkan banyak kode *boilerplate* `try...catch`.
-   Tidak ada jaring pengaman jika pengembang lupa menangani suatu kasus.

### Opsi B - Menggunakan *Exception Filter* terpusat.

**Kelebihan**

-   Sangat DRY dan memastikan konsistensi dasar.
-   Menyederhanakan kode di dalam *service*.

**Kekurangan**

-   Pesan kesalahan cenderung lebih generik karena *filter* tidak memiliki konteks bisnis dari *service* yang memanggil.

### Opsi C - Pendekatan Hibrida.

**Kelebihan**

-   Mengambil yang terbaik dari kedua dunia: pesan spesifik saat dibutuhkan, dan penanganan umum sebagai *fallback*.
-   Memberikan fleksibilitas maksimum bagi pengembang.

**Kekurangan**

-   Memerlukan disiplin dari tim pengembang untuk memutuskan kapan harus menggunakan penanganan lokal vs. global.