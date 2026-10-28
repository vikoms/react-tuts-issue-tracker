import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const [ticketId, setTicketId] = useState("");
  const navigate = useNavigate();

  function handleOpenTicket() {
    const id = ticketId.trim();

    if (!id) {
      return;
    }

    navigate(`/tickets/${encodeURIComponent(id)}`);
  }

  return (
    <Stack>
      <Title order={1}>Dashboard</Title>

      <Text>Masukkan ID untuk membuka detail tiket.</Text>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleOpenTicket();
        }}
      >
        <Stack>
          <TextInput
            label="ID tiket"
            placeholder="Masukkan ID yang ada di data tiket"
            value={ticketId}
            onChange={(event) => setTicketId(event.currentTarget.value)}
            required
          />

          <Button type="submit">Buka Tiket</Button>
        </Stack>
      </form>
    </Stack>
  );
}
