import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { savePortfolioData, getInboxMessages } from "@/lib/storage";
import portfolioData from "@/data/portfolio.json";

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const inbox = await getInboxMessages();

  return NextResponse.json({
    success: true,
    data: portfolioData,
    inbox,
    config: {
      gitHubConfigured: Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO),
      repo: process.env.GITHUB_REPO || null,
      branch: process.env.GITHUB_BRANCH || "main",
    },
  });
}

export async function PUT(request) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedData = await request.json();

    if (!updatedData || !updatedData.profile || !updatedData.projects) {
      return NextResponse.json(
        { success: false, message: "Struktur data tidak valid." },
        { status: 400 }
      );
    }

    const saveResult = await savePortfolioData(updatedData);

    return NextResponse.json({
      success: true,
      message: "Data portofolio berhasil diperbarui!",
      details: saveResult,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data", error: error.message },
      { status: 500 }
    );
  }
}
