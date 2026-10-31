import { NextResponse } from "next/server";
import { verifyCredentials, setAdminSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const isValid = verifyCredentials(username, password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Username atau password salah." },
        { status: 401 }
      );
    }

    await setAdminSession();

    return NextResponse.json({
      success: true,
      message: "Login berhasil! Selamat datang di Admin Portal.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server.", error: error.message },
      { status: 500 }
    );
  }
}
