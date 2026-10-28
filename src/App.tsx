import { Route, Routes } from "react-router";
import DashboardPage from "./features/dashboard/DashboardPage";
import TicketsPage from "./features/tickets/TicketPages";
import AppLayout from "./layouts/AppLayout";
import TicketDetailPage from "./features/tickets/TicketDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="tickets" element={<TicketsPage />} />
        <Route path="tickets/:ticketId" element={<TicketDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
