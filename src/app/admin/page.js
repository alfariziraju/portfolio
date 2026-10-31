"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  FolderGit2,
  Cpu,
  Mail,
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Download,
  Github,
  Sparkles,
  Edit2
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [config, setConfig] = useState({});
  const [activeTab, setActiveTab] = useState("profile"); // profile | projects | skills | inbox
  const [feedback, setFeedback] = useState(null);

  // Project Modal State
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // New Skill Input State
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend Development");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Advanced");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setInbox(json.inbox || []);
        setConfig(json.config || {});
      }
    } catch {
      setFeedback({ type: "error", message: "Gagal mengambil data." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSaveData = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        let msg = "Perubahan data berhasil disimpan!";
        if (resJson.details?.gitHubSaved) {
          msg += " Perubahan juga telah di-commit ke GitHub untuk auto-deploy Vercel.";
        }
        setFeedback({ type: "success", message: msg });
      } else {
        throw new Error(resJson.message || "Gagal menyimpan perubahan.");
      }
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const downloadBackupJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Profile Handlers
  const handleProfileChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  // Project Handlers
  const handleOpenAddProject = () => {
    setEditingProject({
      id: "proj_" + Date.now(),
      title: "",
      category: "Fullstack",
      description: "",
      tags: [],
      tagsInput: "",
      demoUrl: "",
      repoUrl: "",
      isFeatured: false,
      stats: "",
    });
    setShowProjectModal(true);
  };

  const handleOpenEditProject = (project) => {
    setEditingProject({
      ...project,
      tagsInput: Array.isArray(project.tags) ? project.tags.join(", ") : "",
    });
    setShowProjectModal(true);
  };

  const handleSaveProjectModal = () => {
    if (!editingProject.title) return;

    const formattedTags = editingProject.tagsInput
      ? editingProject.tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
      : editingProject.tags || [];

    const projectToSave = {
      ...editingProject,
      tags: formattedTags,
    };
    delete projectToSave.tagsInput;

    const existingIndex = data.projects.findIndex((p) => p.id === projectToSave.id);
    let updatedProjects = [...data.projects];

    if (existingIndex >= 0) {
      updatedProjects[existingIndex] = projectToSave;
    } else {
      updatedProjects.unshift(projectToSave);
    }

    setData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));

    setShowProjectModal(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Skills Handlers
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updatedSkills = data.skills.map((category) => {
      if (category.category === newSkillCategory) {
        return {
          ...category,
          items: [...category.items, { name: newSkillName.trim(), level: newSkillLevel }],
        };
      }
      return category;
    });

    setData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));

    setNewSkillName("");
  };

  const handleDeleteSkill = (catName, skillName) => {
    const updatedSkills = data.skills.map((category) => {
      if (category.category === catName) {
        return {
          ...category,
          items: category.items.filter((item) => item.name !== skillName),
        };
      }
      return category;
    });

    setData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090d16] text-slate-400 font-mono text-sm">
        Memuat Dashboard Admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0c121e]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/30">
            R
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>Admin Portal</span>
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                CMS
              </span>
            </h1>
            <p className="text-xs text-slate-400">Kelola konten portofolio Anda</p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {config?.gitHubConfigured ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-mono">
              Git Auto-Deploy: Aktif
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-mono">
              Mode Penyimpanan Lokal
            </div>
          )}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <span>Lihat Web</span>
            <ExternalLink size={13} />
          </a>

          <button
            onClick={downloadBackupJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            title="Download file backup portfolio.json"
          >
            <Download size={13} />
            <span>Backup JSON</span>
          </button>

          <button
            onClick={handleSaveData}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Save size={14} />
            <span>{saving ? "Menyimpan..." : "Simpan & Publish"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors cursor-pointer"
            title="Keluar"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`px-6 py-2.5 flex items-center justify-between text-xs font-medium ${
            feedback.type === "success"
              ? "bg-emerald-950/60 text-emerald-300 border-b border-emerald-800/50"
              : "bg-rose-950/60 text-rose-300 border-b border-rose-800/50"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-400" />
            ) : (
              <AlertCircle size={16} className="text-rose-400" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-60 shrink-0 space-y-1">
          {[
            { id: "profile", label: "Profil & Bio", icon: User },
            { id: "projects", label: "Proyek Portofolio", icon: FolderGit2, badge: data?.projects?.length },
            { id: "skills", label: "Tech Stack & Skills", icon: Cpu },
            { id: "inbox", label: "Pesan Masuk (Inbox)", icon: Mail, badge: inbox?.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 font-semibold"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <main className="flex-1 min-w-0 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
          {/* TAB 1: PROFIL */}
          {activeTab === "profile" && data?.profile && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Profil & Bio</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Informasi ini ditampilkan di bagian Hero dan About portofolio Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={data.profile.name || ""}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Role / Job Title
                  </label>
                  <input
                    type="text"
                    value={data.profile.role || ""}
                    onChange={(e) => handleProfileChange("role", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tagline (Headline Singkat)
                </label>
                <input
                  type="text"
                  value={data.profile.tagline || ""}
                  onChange={(e) => handleProfileChange("tagline", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Narasi Tentang Saya (Bio)
                </label>
                <textarea
                  rows={4}
                  value={data.profile.about || ""}
                  onChange={(e) => handleProfileChange("about", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    value={data.profile.email || ""}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={data.profile.location || ""}
                    onChange={(e) => handleProfileChange("location", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    URL GitHub
                  </label>
                  <input
                    type="text"
                    value={data.profile.github || ""}
                    onChange={(e) => handleProfileChange("github", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    URL LinkedIn
                  </label>
                  <input
                    type="text"
                    value={data.profile.linkedin || ""}
                    onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Link Resume / CV
                  </label>
                  <input
                    type="text"
                    value={data.profile.resumeUrl || ""}
                    onChange={(e) => handleProfileChange("resumeUrl", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={Boolean(data.profile.isAvailable)}
                  onChange={(e) => handleProfileChange("isAvailable", e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-0"
                />
                <label htmlFor="isAvailable" className="text-xs font-medium text-slate-300">
                  Tampilkan status badge <strong>&quot;Open for work&quot;</strong> di Navbar &amp; Hero
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: PROYEK */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Daftar Proyek Portofolio</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Tambah, perbarui, atau atur proyek unggulan (*featured*).
                  </p>
                </div>
                <button
                  onClick={handleOpenAddProject}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus size={15} />
                  <span>Tambah Proyek Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {data?.projects?.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-blue-400">
                          {proj.category}
                        </span>
                        {proj.isFeatured && (
                          <span className="text-[10px] text-amber-400 flex items-center gap-1">
                            <Sparkles size={11} /> Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.tags?.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEditProject(proj)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Edit Proyek"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Hapus Proyek"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Tech Stack & Skills</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Atur daftar keahlian berdasarkan kategori.
                </p>
              </div>

              {/* Form Tambah Skill */}
              <form onSubmit={handleAddSkill} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    {data?.skills?.map((c) => (
                      <option key={c.category} value={c.category}>
                        {c.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[180px]">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Skill / Alat
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: TypeScript / Docker"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="w-32">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Level
                  </label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Tambah Skill
                </button>
              </form>

              {/* Grid Daftar Skill per Kategori */}
              <div className="space-y-4">
                {data?.skills?.map((category) => (
                  <div key={category.category} className="p-4 rounded-xl bg-slate-800/30 border border-slate-800">
                    <h3 className="text-sm font-bold text-white mb-3">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items?.map((item) => (
                        <span
                          key={item.name}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200"
                        >
                          <span>{item.name}</span>
                          <span className="text-[10px] font-mono text-blue-400">({item.level})</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(category.category, item.name)}
                            className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INBOX PESAN */}
          {activeTab === "inbox" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Pesan Kontak Masuk</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Pesan yang dikirimkan oleh pengunjung melalui formulir kontak portofolio.
                </p>
              </div>

              {inbox?.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-slate-800/20 border border-slate-800 text-slate-500 text-xs font-mono">
                  Belum ada pesan kontak masuk saat ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {inbox.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{msg.name}</span>
                          <span className="text-xs text-blue-400">({msg.email})</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">
                          {new Date(msg.receivedAt).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-300">
                        Subjek: {msg.subject}
                      </div>
                      <p className="text-xs text-slate-400 whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal Add / Edit Project */}
      {showProjectModal && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {data.projects.some((p) => p.id === editingProject.id)
                ? "Edit Proyek Portofolio"
                : "Tambah Proyek Baru"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Proyek *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="Fullstack">Fullstack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Highlight / Fitur Kunci
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Realtime Stock & POS"
                    value={editingProject.stats || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, stats: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Proyek
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description || ""}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tags Teknologi (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="React, Express.js, SQLite, Tailwind"
                  value={editingProject.tagsInput || ""}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, tagsInput: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Live Demo
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={editingProject.demoUrl || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, demoUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL Repository GitHub
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={editingProject.repoUrl || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, repoUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="modalIsFeatured"
                  checked={Boolean(editingProject.isFeatured)}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700"
                />
                <label htmlFor="modalIsFeatured" className="text-xs text-slate-300">
                  Tandai sebagai <strong>Featured Project</strong> (Ditampilkan lebih menonjol)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveProjectModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                Simpan Proyek
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
