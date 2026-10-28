import { Alert, Button, Group, Stack } from "@mantine/core";
import type { Ticket } from "../../types/ticket";

type TicketDeleteConfirmationProps = {
  ticket: Pick<Ticket, "id" | "title">;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function TicketDeleteConfirmation({
  ticket,
  onConfirm,
  onCancel,
}: TicketDeleteConfirmationProps) {
  return (
    <Stack gap="md">
      <Alert color="red" title="Hapus tiket?">
        Tiket {ticket.id}: "{ticket.title}" akan dihapus dari daftar.
      </Alert>

      <Group justify="flex-end">
        <Button variant="default" onClick={onCancel}>
          Batal
        </Button>

        <Button color="red" onClick={onConfirm}>
          Ya, hapus
        </Button>
      </Group>
    </Stack>
  );
}
