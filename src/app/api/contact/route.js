import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama, email, dan pesan wajib diisi.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format email tidak valid.",
        },
        { status: 400 }
      );
    }

    const newMessage = {
      id: "msg_" + Date.now(),
      name,
      email,
      subject: subject || "Tanpa Subjek",
      message,
      receivedAt: new Date().toISOString(),
      isRead: false,
    };

    // Log pesan
    console.log("📬 Pesan Kontak Masuk:", newMessage);

    // Coba simpan ke src/data/inbox.json jika filesystem writeable (misal di lokal)
    try {
      const inboxFilePath = path.join(process.cwd(), "src/data/inbox.json");
      let existing = [];
      try {
        const content = await fs.readFile(inboxFilePath, "utf-8");
        existing = JSON.parse(content || "[]");
      } catch {
        existing = [];
      }
      existing.unshift(newMessage);
      await fs.writeFile(inboxFilePath, JSON.stringify(existing, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Catatan: Filesystem read-only atau penyimpanan inbox lokal dilewati.", fsErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda.",
      data: newMessage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal saat memproses pesan.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
