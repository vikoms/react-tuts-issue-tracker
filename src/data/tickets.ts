import type { Ticket } from "../types/ticket";

export const tickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Perbaiki validasi halaman login",
    status: "todo",
    priority: "high",
    assignee: "Viko",
  },
  {
    id: "TKT-002",
    title: "Tambahkan filter daftar transaksi",
    status: "in_progress",
    priority: "medium",
    assignee: "Budi",
  },
  {
    id: "TKT-003",
    title: "Perbaiki tampilan profil",
    status: "done",
    priority: "low",
    assignee: "Sari",
  },
];
