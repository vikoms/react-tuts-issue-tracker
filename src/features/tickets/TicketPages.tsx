import {
  Button,
  Container,
  Drawer,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import TicketTable from "./TicketTables";
import { useEffect, useReducer, useRef, useState } from "react";
import { tickets as initialTickets } from "../../data/tickets";
import type { TicketPriority, TicketStatus } from "../../types/ticket";
import type { TicketEditValues } from "./TicketEditForm";
import TicketEditForm from "./TicketEditForm";
import TicketDeleteConfirmation from "./TicketDeleteConfirmation";
import { ticketsReducer } from "./ticketsReducer";
import { useSearchParams } from "react-router";
export default function TicketsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "all";
  const [sortBy, setSortBy] = useState("priority_desc");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [tickets, dispatch] = useReducer(ticketsReducer, initialTickets);
  const [panelMode, setPanelMode] = useState<
    "view" | "edit" | "confirm-delete"
  >("view");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const normalizedSearch = search.trim().toLowerCase();

  const visibleTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(normalizedSearch);

    const matchesStatus = status === "all" || ticket.status === status;

    return matchesSearch && matchesStatus;
  });

  const priorityRank = {
    low: 1,
    medium: 2,
    high: 3,
  };

  const sortedTickets = [...visibleTickets].sort((a, b) => {
    if (sortBy === "priority_desc") {
      return priorityRank[b.priority] - priorityRank[a.priority];
    }

    if (sortBy === "priority_asc") {
      return priorityRank[a.priority] - priorityRank[b.priority];
    }

    return a.title.localeCompare(b.title);
  });

  const selectedTicket = tickets.find(
    (ticket) => ticket.id === selectedTicketId,
  );

  function updateQueryParam(key: "search" | "status", value: string) {
    const nextParams = new URLSearchParams(searchParams);

    const isDefaultValue =
      value === "" || (key === "status" && value === "all");

    if (isDefaultValue) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams, { replace: true });
  }

  function handleStatusChange(ticketId: string, nextStatus: TicketStatus) {
    dispatch({
      type: "status_changed",
      ticketId,
      status: nextStatus,
    });
  }

  function handlePriorityChange(
    ticketId: string,
    nextPriority: TicketPriority,
  ) {
    dispatch({
      type: "priority_changed",
      ticketId,
      priority: nextPriority,
    });
  }

  function handleViewTicket(ticketId: string) {
    setSelectedTicketId(ticketId);
    setPanelMode("view");
  }

  function handleCloseDrawer() {
    setSelectedTicketId(null);
    setPanelMode("view");
  }

  function handleSaveTicket(ticketId: string, values: TicketEditValues) {
    dispatch({
      type: "ticket_edited",
      ticketId,
      values,
    });
    setPanelMode("view");
  }

  function handleDeleteTicket(ticketId: string) {
    dispatch({
      type: "ticket_deleted",
      ticketId,
    });
    handleCloseDrawer();
  }

  useEffect(() => {
    // Shortcut hanya aktif ketika Drawer tertutup.
    if (selectedTicketId !== null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key !== "/" ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.repeat ||
        event.isComposing ||
        event.defaultPrevented
      ) {
        return;
      }

      const target = event.target;

      // Biarkan pengguna mengetik di input atau editor.
      if (
        target instanceof HTMLElement &&
        (target.closest("input, textarea, select, [role='combobox']") ||
          target.isContentEditable)
      ) {
        return;
      }

      const input = searchInputRef.current;

      if (!input) {
        return;
      }

      event.preventDefault();
      input.focus();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTicketId]);

  function handleResetFilters() {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete("search");
    nextParams.delete("status");

    setSearchParams(nextParams, { replace: true });
  }
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        {/* Judul halaman dan aksi utama */}
        <Group justify="space-between">
          <Stack gap={4}>
            <Title order={1}>Daftar Tiket</Title>
            <Text c="dimmed">Pantau dan kelola pekerjaan tim.</Text>
          </Stack>

          <Button>Tambah tiket</Button>
        </Group>
        <Drawer
          opened={selectedTicket !== undefined}
          onClose={handleCloseDrawer}
          title={`Detail tiket ${selectedTicket?.id ?? ""}`}
          position="right"
          size="md"
        >
          {selectedTicket && (
            <Stack gap="sm">
              {selectedTicket &&
                (panelMode === "edit" ? (
                  <TicketEditForm
                    key={selectedTicket.id}
                    ticket={selectedTicket}
                    onSave={(values) =>
                      handleSaveTicket(selectedTicket.id, values)
                    }
                    onCancel={() => setPanelMode("view")}
                  />
                ) : panelMode === "confirm-delete" ? (
                  <TicketDeleteConfirmation
                    ticket={selectedTicket}
                    onConfirm={() => handleDeleteTicket(selectedTicket.id)}
                    onCancel={() => setPanelMode("view")}
                  />
                ) : (
                  <Stack gap="sm">
                    <Title order={3}>{selectedTicket.title}</Title>
                    <Select
                      label="Status"
                      value={selectedTicket.status}
                      data={[
                        { value: "todo", label: "Todo" },
                        { value: "in_progress", label: "In Progress" },
                        { value: "done", label: "Done" },
                      ]}
                      onChange={(value) => {
                        if (
                          value === "todo" ||
                          value === "in_progress" ||
                          value === "done"
                        ) {
                          handleStatusChange(selectedTicket.id, value);
                        }
                      }}
                    />
                    <Select
                      label="Prioritas"
                      value={selectedTicket.priority}
                      data={[
                        { value: "low", label: "Rendah" },
                        { value: "medium", label: "Sedang" },
                        { value: "high", label: "Tinggi" },
                      ]}
                      onChange={(value) => {
                        if (
                          value === "low" ||
                          value === "medium" ||
                          value === "high"
                        ) {
                          handlePriorityChange(selectedTicket.id, value);
                        }
                      }}
                    />
                    <Text>Assignee: {selectedTicket.assignee}</Text>

                    <Button onClick={() => setPanelMode("edit")}>
                      Edit judul dan assignee
                    </Button>
                    <Button
                      color="red"
                      variant="light"
                      onClick={() => setPanelMode("confirm-delete")}
                    >
                      Hapus tiket
                    </Button>
                  </Stack>
                ))}
            </Stack>
          )}
        </Drawer>

        {/* Pencarian dan filter */}
        <Paper withBorder p="lg" radius="md">
          <Group grow align="flex-end">
            <TextInput
              ref={searchInputRef}
              label="Cari tiket"
              placeholder="Masukkan judul tiket"
              value={search}
              onChange={(event) =>
                updateQueryParam("search", event.currentTarget.value)
              }
            />
            <Select
              label="Status"
              value={status}
              onChange={(value) => updateQueryParam("status", value ?? "all")}
              data={[
                { value: "all", label: "Semua status" },
                { value: "todo", label: "Todo" },
                { value: "in_progress", label: "In Progress" },
                { value: "done", label: "Done" },
              ]}
            />
            <Select
              label="Urutkan"
              value={sortBy}
              onChange={(value) => setSortBy(value ?? "priority_desc")}
              data={[
                { value: "priority_desc", label: "Prioritas tertinggi" },
                { value: "priority_asc", label: "Prioritas terendah" },
                { value: "title_asc", label: "Judul A–Z" },
              ]}
            />
            <Button variant="default" onClick={handleResetFilters}>
              Reset filter
            </Button>
          </Group>
        </Paper>

        {/* Konten utama */}
        <Paper withBorder p="md" radius="md">
          <Stack>
            <Text size="sm" c="dimmed">
              Menampilkan {visibleTickets.length} dari {tickets.length} tiket.
            </Text>

            <TicketTable
              tickets={sortedTickets}
              onViewTicket={handleViewTicket}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
