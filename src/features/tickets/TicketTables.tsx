import { Badge, Button, Table, Text } from "@mantine/core";
import type { Ticket } from "../../types/ticket";
import { Link } from "react-router";

type TicketTableProps = {
  tickets: Ticket[];
  onViewTicket: (ticketId: string) => void;
};

const statusLabels = {
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
};

export default function TicketTable({
  tickets,
  onViewTicket,
}: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <Text ta="center" c="dimmed" py="xl">
        Tidak ada tiket yang sesuai.
      </Text>
    );
  }

  return (
    <Table.ScrollContainer minWidth={650}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Judul</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Prioritas</Table.Th>
            <Table.Th>Assignee</Table.Th>
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {tickets.map((ticket) => (
            <Table.Tr key={ticket.id}>
              <Table.Td>{ticket.id}</Table.Td>
              <Table.Td>
                <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
              </Table.Td>
              <Table.Td>
                <Badge>{statusLabels[ticket.status]}</Badge>
              </Table.Td>
              <Table.Td>{ticket.priority}</Table.Td>
              <Table.Td>{ticket.assignee}</Table.Td>
              <Button
                size="xs"
                variant="light"
                aria-label={`Lihat detail ${ticket.title}`}
                onClick={() => onViewTicket(ticket.id)}
              >
                Detail
              </Button>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
