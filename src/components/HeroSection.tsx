import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Text,
  Title,
  Button,
  Stack,
  Box,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { IconPlayerSkipForward, IconRefresh } from '@tabler/icons-react';
import { AnimatedLogo } from './AnimatedLogo';

const STAGE_INTERVAL = 150; // ms between stages
const TOTAL_STAGES   = 8;

// ─── Main component ───────────────────────────────────────────────────────────
export function HeroSection() {
  const [stage,         setStage        ] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);

  // Auto-advance stages
  useEffect(() => {
    if (stage === 0) {
      // Brief pause before kicking off
      const t = setTimeout(() => setStage(1), 500);
      return () => clearTimeout(t);
    }
    if (stage > 0 && stage < TOTAL_STAGES) {
      const t = setTimeout(() => setStage(s => s + 1), STAGE_INTERVAL);
      return () => clearTimeout(t);
    }
    if (stage === TOTAL_STAGES) {
      const t = setTimeout(() => setIntroComplete(true), 1300);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const skipIntro = () => {
    setStage(TOTAL_STAGES);
    setTimeout(() => setIntroComplete(true), 200);
  };

  const replayIntro = () => {
    setIntroComplete(false);
    setStage(0);
  };

  

  return (
    <Box
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(150deg, #eef5ff 0%, #f8fafd 45%, #edfaed 100%)',
      }}
    >
      {/* ── INTRO AREA ────────────────────────────────────────────────── */}
      <Container size="xl" py={0} style={{ paddingTop: 24, paddingBottom: 32 }}>
        <Grid align="center" style={{ minHeight: 'calc(100vh - 64px)' }}>

          {/* LEFT COLUMN — animated logo */}
          <Grid.Col span={{ base: 12, sm: 7 }}>
            <Box style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
              <AnimatedLogo stage={stage} />

              {/* Skip / replay controls */}
              <Box
                style={{
                  position:  'absolute',
                  bottom:    -8,
                  right:     0,
                  display:   'flex',
                  gap:       8,
                }}
              >
                {!introComplete && stage < TOTAL_STAGES && (
                  <Tooltip label="Skip intro" withArrow>
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      radius="xl"
                      size="md"
                      onClick={skipIntro}
                    >
                      <IconPlayerSkipForward size={16} />
                    </ActionIcon>
                  </Tooltip>
                )}
                {introComplete && (
                  <Tooltip label="Replay intro" withArrow>
                    <ActionIcon
                      variant="subtle"
                      color="tslcBlue"
                      radius="xl"
                      size="md"
                      onClick={replayIntro}
                    >
                      <IconRefresh size={16} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Grid.Col>

          {/* RIGHT COLUMN — companion text */}
          <Grid.Col span={{ base: 12, sm: 5 }}>
            <Title order={1} ta="center" size={40} c="#1E6BB0">Welcome to Transportation Science Learning Community!</Title>
          </Grid.Col>
        </Grid>
      </Container>

      {/* ── HERO CONTENT (slides in after intro) ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={introComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── HEADLINE SECTION ── */}
        <Box
          style={{
            background:   'white',
            borderTop:    '1px solid #deeaf5',
            padding:      '90px 0 80px',
          }}
        >
          <Container size="lg">
            <Stack align="center" gap="xl" ta="center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              >
                <Title
                  order={1}
                  style={{
                    fontFamily:  "'Barlow Condensed', sans-serif",
                    fontSize:    'clamp(2.2rem, 5.5vw, 3.8rem)',
                    fontWeight:  900,
                    letterSpacing: '-1px',
                    lineHeight:  1.08,
                    maxWidth:    700,
                  }}
                >
                  <Text span c="tslcBlue" inherit>Inclusive Community</Text> of {' '}
                  <Text span c="tslcGreen" inherit>learners in transportation</Text>
                </Title>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.38, ease: 'easeOut' }}
              >
                <Text
                  size="lg"
                  c="dark.4"
                  maw={560}
                  lh={1.8}
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Join a global community of transportation professionals, researchers,
                  and students learning together.
                </Text>
              </motion.div>

              
            </Stack>
          </Container>
        </Box>

        {/* ── TRANSPORTATION MODES CARDS ── */}
        <Box style={{ padding: '72px 0 88px', background: '#f3f8fe' }}>
          <Container size="lg">
            <Stack gap="xl">
              <Box ta="center">
                <Text
                  fw={800}
                  size="1.9rem"
                  style={{
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    letterSpacing: '-0.3px',
                    color:         '#1a2e42',
                  }}
                >
                  Every Mode. Every Discipline.
                </Text>
                <Text c="dimmed" mt="xs" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Be part of an existing book club or facilitate a new one.
                </Text>
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* ── CTA BANNER ── */}
        <Box
          style={{
            background:   'linear-gradient(120deg, #1E6BB0 0%, #185d9a 50%, #3a8f3a 100%)',
            padding:      '72px 0',
          }}
        >
          <Container size="md">
            <Stack align="center" gap="lg" ta="center">
              <Title
                order={2}
                c="white"
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight:    900,
                  letterSpacing: '-0.5px',
                }}
              >
                Ready to dive in?
              </Title>
              <Text
                c="rgba(255,255,255,0.82)"
                size="lg"
                maw={480}
                lh={1.75}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Join other transportation science learners already part of the TSLC community.
              </Text>
              <Button
                size="lg"
                variant="white"
                color="tslcBlue"
                radius="md"
                fw={700}
                mt="xs"
                style={{ fontFamily: "'Barlow', sans-serif", paddingInline: 40 }}
                component="a"
                href="https://invite.pumble.com/iad4sjkfnn2gm5gley"
              >
                Join the Pumble Workspace
              </Button>
            </Stack>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
}
