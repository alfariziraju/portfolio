import { NextResponse } from "next/server";
import portfolioData from "@/data/portfolio.json";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let filteredProjects = [...portfolioData.projects];

    if (category && category !== "All") {
      filteredProjects = filteredProjects.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === "true") {
      filteredProjects = filteredProjects.filter((p) => p.isFeatured);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...portfolioData,
        projects: filteredProjects,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat data portofolio", error: error.message },
      { status: 500 }
    );
  }
}
