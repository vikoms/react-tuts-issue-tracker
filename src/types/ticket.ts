export type TicketStatus = "todo" | "in_progress" | "done";
export type TicketPriority = "low" | "medium" | "high";

export type Ticket = {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
};
