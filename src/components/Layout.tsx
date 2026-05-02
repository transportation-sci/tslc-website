import { AppShell, Burger, Group, Text, Anchor, Button, Image, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import tslcLogo from "../assets/tslc-logo.png"
import { type ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Image src={tslcLogo} w={60} />
            <Text>
              <Text span fw={900} size="lg" c="tslcBlue">Transportation Science </Text>
              <Text span fw={900} size="lg" c="tslcGreen">Learning Community</Text>
            </Text>
            
          </Group>
          <Group visibleFrom="sm" gap="xl">
            <Anchor href="#clubs">Book Clubs</Anchor>
            <Anchor href="#help">Get Help</Anchor>
            <Anchor href="#about">About</Anchor>
            <Button color="tslcBlue">Join Us</Button>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar  py="md" px={4}>
        {/* Mobile nav links */}
        <Stack hiddenFrom="sm" gap="xl">
          <Anchor href="#clubs">Book Clubs</Anchor>
          <Anchor href="#help">Get Help</Anchor>
          <Anchor href="#about">About</Anchor>
          <Button color="tslcBlue">Join Us</Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}