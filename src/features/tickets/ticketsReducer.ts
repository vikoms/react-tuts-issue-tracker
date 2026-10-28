import type { Ticket, TicketPriority, TicketStatus } from "../../types/ticket";

type TicketsAction =
  | {
      type: "status_changed";
      ticketId: string;
      status: TicketStatus;
    }
  | {
      type: "priority_changed";
      ticketId: string;
      priority: TicketPriority;
    }
  | {
      type: "ticket_edited";
      ticketId: string;
      values: Pick<Ticket, "title" | "assignee">;
    }
  | {
      type: "ticket_deleted";
      ticketId: string;
    };

export function ticketsReducer(
  state: Ticket[],
  action: TicketsAction,
): Ticket[] {
  switch (action.type) {
    case "status_changed":
      return state.map((ticket) =>
        ticket.id === action.ticketId
          ? { ...ticket, status: action.status }
          : ticket,
      );

    case "priority_changed":
      return state.map((ticket) =>
        ticket.id === action.ticketId
          ? { ...ticket, priority: action.priority }
          : ticket,
      );

    case "ticket_edited":
      return state.map((ticket) =>
        ticket.id === action.ticketId
          ? { ...ticket, ...action.values }
          : ticket,
      );

    case "ticket_deleted":
      return state.filter((ticket) => ticket.id !== action.ticketId);

    default:
      throw new Error("Action tiket tidak dikenal.");
  }
}
