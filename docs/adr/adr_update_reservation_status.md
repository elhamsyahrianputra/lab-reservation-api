---
title: 'Update Reservation Status'
status: accepted
date: 2025-09-26
decision-makers: [Elham Syahrian Putra]
consulted: [Dosen pembimbing (opsional)]
informed: [Mahasiswa pengguna sistem (opsional)]
---

# Update Reservation Status dengan Endpoint Tunggal

## Context and Problem Statement

Sistem reservasi ruangan membutuhkan mekanisme untuk mengubah status reservasi (PENDING, APPROVED, REJECTED, CANCELLED, COMPLETED).  
Stakeholder utama:

- **User (mahasiswa)**: hanya boleh melakukan create (PENDING) dan cancel.
- **Admin**: bertugas memverifikasi, melakukan approve, check-in, check-out dan juga complete.
- **System**: status awal selalu PENDING.

Ada dua pilihan desain API utama:

1. **Endpoint tunggal**:  
   `PATCH /reservations/:id/status` -> mengirim status baru di body.
2. **Endpoint aksi spesifik**:  
   `POST /reservations/:id/approve`,  
   `POST /reservations/:id/cancel`, dst.

## Decision Drivers

- Keamanan (role-based access, siapa yang boleh update status apa).
- Kemudahan implementasi di backend (NestJS guard dan service logic).
- Kejelasan API untuk frontend developer.
- Konsistensi dengan prinsip RESTful.
- Fleksibilitas jika di masa depan ada status baru.

## Considered Options

- Opsi A: Endpoint tunggal (`PATCH /reservations/:id/status`)
- Opsi B: Endpoint action-based (`/approve`, `/reject`, `/cancel`, dst.)

## Decision Outcome

**Chosen option: Opsi B (Endpoint action-based).**  
Karena secara security lebih aman dibanding **Opsi A**, karena **Opsi A** sendiri ada potensi `value` dari status bisa dibajak oleh pengguna. *Opsi B* juga memeliki kemudahan dalam hal maintanance dengan pengelolaannya jika dilihat pada `service level`

### Consequences

**Kelebihan**
- Lebih aman, karena setiap endpoint tidak mengirimkan `value` di body requestnya
- Logika di `Service Level` lebih sederhana. 

**Kekurangan**
- API lebih kompleks, karena setiap status harus dibuat endpointnnya.
- kurang fleksibel jika ada status tambahan di masa depan ( perlu membuat endpoint baru).

## Pros and Cons of the Options

### Opsi A — Endpoint tunggal (`PATCH /reservations/:id/status`)
**Kelebihan**
- Hanya satu endpoint yang perlu di-maintain.
- Fleksibel untuk status tambahan.
- Logika otorisasi tetap bisa diatur lewat backend.

**Kekurangan**
- Frontend tidak tahu secara eksplisit aksi apa yang diizinkan tanpa validasi dari backend.
- Debugging bisa sedikit membingungkan (perlu cek status request body).

### Opsi B — Endpoint action-based (`/approve`, `/reject`, dll.)
**Kelebihan**
- Lebih eksplisit: developer frontend langsung tahu apa yang bisa dilakukan.
- Validasi lebih sederhana per endpoint.
- Lebih aman dari sisi security
- Lebih bersih dilihat dari `Service Level`

**Kekurangan**
- Jika status bertambah, perlu menambah endpoint baru.
- Bisa membuat API menjadi “verb oriented” dan kurang RESTful.
