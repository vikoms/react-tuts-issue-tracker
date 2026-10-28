import { useState } from "react";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import type { Ticket } from "../../types/ticket";

export type TicketEditValues = Pick<Ticket, "title" | "assignee">;

type TicketEditFormProps = {
  ticket: Ticket;
  onSave: (values: TicketEditValues) => void;
  onCancel: () => void;
};

export default function TicketEditForm({
  ticket,
  onSave,
  onCancel,
}: TicketEditFormProps) {
  const [title, setTitle] = useState(ticket.title);
  const [assignee, setAssignee] = useState(ticket.assignee);
  const [titleError, setTitleError] = useState<string | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (trimmedTitle.length < 5) {
          setTitleError("Judul minimal 5 karakter.");
          return;
        }

        setTitleError(null);

        onSave({
          title: trimmedTitle,
          assignee: assignee.trim(),
        });
      }}
    >
      <Stack gap="md">
        <TextInput
          label="Judul"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          error={titleError}
          withAsterisk
        />

        <TextInput
          label="Assignee"
          value={assignee}
          onChange={(event) => setAssignee(event.currentTarget.value)}
        />

        <Group justify="flex-end">
          <Button type="button" variant="default" onClick={onCancel}>
            Batal
          </Button>

          <Button type="submit">Simpan</Button>
        </Group>
      </Stack>
    </form>
  );
}
