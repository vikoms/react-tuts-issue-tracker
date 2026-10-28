import { Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <Stack align="center" py="xl">
      <Title order={1}>404</Title>

      <Text>Halaman yang kamu cari tidak ditemukan.</Text>

      <Link to="/">Kembali ke Dashboard</Link>
    </Stack>
  );
}
