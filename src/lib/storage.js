import fs from "fs/promises";
import path from "path";

export async function savePortfolioData(newData) {
  let localSaved = false;
  let gitHubSaved = false;
  let commitUrl = null;
  let gitMessage = "";

  const jsonString = JSON.stringify(newData, null, 2);

  // 1. Simpan ke sistem file lokal (berhasil jika berjalan di lokal / server dengan persistent disk)
  try {
    const filePath = path.join(process.cwd(), "src/data/portfolio.json");
    await fs.writeFile(filePath, jsonString, "utf-8");
    localSaved = true;
  } catch (err) {
    console.warn("Penyimpanan lokal tidak dapat ditulis (misal: read-only serverless):", err.message);
  }

  // 2. Jika GITHUB_TOKEN & GITHUB_REPO diset, lakukan Git-Commit via GitHub REST API (Auto-Deploy Vercel)
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // format: "username/repo" atau "owner/repo"
  const branch = process.env.GITHUB_BRANCH || "main";

  if (token && repo) {
    try {
      const apiUrl = `https://api.github.com/repos/${repo}/contents/src/data/portfolio.json`;

      // Ambil SHA file saat ini di GitHub
      let currentSha = null;
      const getRes = await fetch(apiUrl + `?ref=${branch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Admin-CMS",
        },
      });

      if (getRes.ok) {
        const fileData = await getRes.json();
        currentSha = fileData.sha;
      }

      // Buat commit pembaruan file di GitHub
      const contentBase64 = Buffer.from(jsonString).toString("base64");
      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "User-Agent": "Portfolio-Admin-CMS",
        },
        body: JSON.stringify({
          message: `chore: update portfolio data via Admin Portal [skip ci]`,
          content: contentBase64,
          sha: currentSha || undefined,
          branch,
        }),
      });

      if (putRes.ok) {
        const commitData = await putRes.json();
        gitHubSaved = true;
        commitUrl = commitData.commit?.html_url;
        gitMessage = "Perubahan berhasil di-push ke GitHub! Vercel akan otomatis melakukan auto-deploy.";
      } else {
        const errJson = await putRes.json();
        gitMessage = `Gagal push ke GitHub: ${errJson.message}`;
      }
    } catch (gitErr) {
      gitMessage = `Error koneksi GitHub: ${gitErr.message}`;
    }
  }

  return {
    localSaved,
    gitHubSaved,
    commitUrl,
    gitMessage,
  };
}

export async function getInboxMessages() {
  try {
    const filePath = path.join(process.cwd(), "src/data/inbox.json");
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content || "[]");
  } catch {
    return [];
  }
}
