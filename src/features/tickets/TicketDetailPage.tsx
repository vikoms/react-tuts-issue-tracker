import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router";

import { tickets } from "../../data/tickets";

export default function TicketDetailPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const ticket = tickets.find((item) => String(item.id) === ticketId);

  if (!ticket) {
    return (
      <Stack>
        <Title order={1}>Tiket tidak ditemukan</Title>

        <Text>Tidak ada tiket dengan ID: {ticketId}</Text>

        <Link to="/tickets">Kembali ke daftar tiket</Link>
      </Stack>
    );
  }

  return (
    <Stack>
      <Group>
        <Button variant="default" onClick={() => navigate(-1)}>
          Kembali
        </Button>
        <Link to="/tickets">Kembali ke daftar tiket</Link>
      </Group>

      <Title order={1}>Detail Tiket</Title>

      <Paper withBorder p="md">
        <Stack gap="sm">
          <Text>ID: {ticket.id}</Text>
          <Text>Judul: {ticket.title}</Text>
          <Text>Status: {ticket.status}</Text>
          <Text>Prioritas: {ticket.priority}</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
