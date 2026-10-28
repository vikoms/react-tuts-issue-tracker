import { Container, Group, Stack, Title } from "@mantine/core";
import { NavLink, Outlet } from "react-router";

import "./AppLayout.css";

export default function AppLayout() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={2}>Ticket App</Title>

        <Group component="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "menu-link menu-link-active" : "menu-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              isActive ? "menu-link menu-link-active" : "menu-link"
            }
          >
            Tickets
          </NavLink>
        </Group>

        <Outlet />
      </Stack>
    </Container>
  );
}
