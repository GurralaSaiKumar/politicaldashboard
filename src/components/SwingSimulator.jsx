import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Slider,
  Switch,
  Button,
  SimpleGrid,
  ThemeIcon,
  rem,
  Card,
  Table,
  useMantineColorScheme
} from '../ui/mantine';
import {
  IconAdjustments,
  IconSparkles,
  IconRefresh,
  IconFlame,
  IconTrophy,
  IconAlertTriangle,
  IconArrowsExchange
} from '../ui/icons';
import { api } from '../services/api';

export function SwingSimulator({ selectedPCId }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [swingBJPtoINC, setSwingBJPtoINC] = useState(0);
  const [turnoutDelta, setTurnoutDelta] = useState(0);
  const [neutralizeSplitTicket, setNeutralizeSplitTicket] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await api.simulateSwing({
        constituencyId: selectedPCId,
        swingBJPtoINC,
        turnoutDelta,
        neutralizeSplitTicket
      });
      setSimulationResult(res.data);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [selectedPCId, swingBJPtoINC, turnoutDelta, neutralizeSplitTicket]);

  const handleReset = () => {
    setSwingBJPtoINC(0);
    setTurnoutDelta(0);
    setNeutralizeSplitTicket(false);
  };

  return (
    <Stack gap="lg">
      {/* Simulation Controls Panel */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="md" wrap="wrap">
          <Group gap="xs">
            <ThemeIcon color="grape" variant="light" size="lg">
              <IconSparkles size={20} />
            </ThemeIcon>
            <Stack gap={2}>
              <Title order={4}>Electoral "What-If" Sandbox & Swing Projection Simulator</Title>
              <Text size="xs" c="dimmed">
                Stress-test constituency outcomes under custom turnout variations, uniform voter swings, and split-ticket consolidation
              </Text>
            </Stack>
          </Group>

          <Button
            size="xs"
            variant="default"
            leftSection={<IconRefresh size={14} />}
            onClick={handleReset}
          >
            Reset to Actual 2024 Baseline
          </Button>
        </Group>

        <Grid gutter="xl">
          {/* Slider 1: Vote Swing */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Text size="sm" fw={700} mb={4}>
              Net Vote Transfer (BJP → INC Swing):{' '}
              <span style={{ color: swingBJPtoINC > 0 ? '#10b981' : swingBJPtoINC < 0 ? '#f97316' : 'inherit' }}>
                {swingBJPtoINC > 0 ? `+${swingBJPtoINC}% to INC` : swingBJPtoINC < 0 ? `+${Math.abs(swingBJPtoINC)}% to BJP` : '0% (Baseline)'}
              </span>
            </Text>
            <Text size="xs" c="dimmed" mb="md">
              Shifts popular vote share between the principal two contenders across all segments
            </Text>
            <Slider
              value={swingBJPtoINC}
              onChange={setSwingBJPtoINC}
              min={-10}
              max={25}
              step={0.5}
              marks={[
                { value: -10, label: '-10% (BJP surge)' },
                { value: 0, label: '2024 Actual' },
                { value: 11.1, label: 'Tipping Point (~11%)' },
                { value: 25, label: '+25%' }
              ]}
              color="indigo"
              size="md"
            />
          </Grid.Col>

          {/* Slider 2: Turnout Variance */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text size="sm" fw={700} mb={4}>
              Turnout Delta:{' '}
              <span style={{ color: turnoutDelta !== 0 ? '#3b82f6' : 'inherit' }}>
                {turnoutDelta > 0 ? `+${turnoutDelta}%` : turnoutDelta < 0 ? `${turnoutDelta}%` : '0%'}
              </span>
            </Text>
            <Text size="xs" c="dimmed" mb="md">
              Simulates urban mobilization or voter apathy shifts
            </Text>
            <Slider
              value={turnoutDelta}
              onChange={setTurnoutDelta}
              min={-10}
              max={15}
              step={0.5}
              marks={[
                { value: -10, label: '-10%' },
                { value: 0, label: '53.17%' },
                { value: 15, label: '+15%' }
              ]}
              color="blue"
              size="md"
            />
          </Grid.Col>

          {/* Switch 3: Neutralize Split Ticket */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack justify="center" style={{ height: '100%' }}>
              <Switch
                label="Neutralize Split-Ticket Voting"
                description="What if 2023 Assembly preferences carry 100% into parliamentary polling?"
                checked={neutralizeSplitTicket}
                onChange={event => setNeutralizeSplitTicket(event.currentTarget.checked)}
                color="indigo"
                size="md"
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Simulation Projected Output Banner */}
      {simulationResult && (
        <Paper
          p="md"
          radius="md"
          withBorder
          style={{
            borderLeft: `5px solid ${simulationResult.projectedWinner === 'BJP' ? '#FF9933' : '#10B981'}`,
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }}
        >
          <Group justify="space-between" align="center" wrap="wrap">
            <Group gap="md">
              <ThemeIcon
                size={48}
                radius="xl"
                color={simulationResult.projectedWinner === 'BJP' ? 'orange' : 'green'}
                variant="filled"
              >
                {simulationResult.projectedWinner === 'BJP' ? <IconTrophy size={28} /> : <IconFlame size={28} />}
              </ThemeIcon>
              <Stack gap={2}>
                <Text size="xs" fw={700} c="dimmed">PROJECTED PARLIAMENTARY OUTCOME</Text>
                <Title order={3}>
                  Projected Winner:{' '}
                  <span style={{ color: simulationResult.projectedWinner === 'BJP' ? '#FF9933' : '#10B981' }}>
                    {simulationResult.projectedWinner === 'BJP' ? 'BJP (Bharatiya Janata Party)' : 'INC (Indian National Congress)'}
                  </span>
                </Title>
                <Text size="xs" c="dimmed">
                  Projected Margin: {simulationResult.projectedMarginPct > 0 ? `+${simulationResult.projectedMarginPct}%` : `${Math.abs(simulationResult.projectedMarginPct)}%`}
                </Text>
              </Stack>
            </Group>

            <Group gap="xl">
              <Stack gap={0} align="center">
                <Text size="xs" c="dimmed" fw={600}>PROJECTED BJP SHARE</Text>
                <Text size="xl" fw={900} c="orange.7">{simulationResult.projectedBJP}%</Text>
              </Stack>
              <Stack gap={0} align="center">
                <Text size="xs" c="dimmed" fw={600}>PROJECTED INC SHARE</Text>
                <Text size="xl" fw={900} c="green.7">{simulationResult.projectedINC}%</Text>
              </Stack>
              <Stack gap={0} align="center">
                <Text size="xs" c="dimmed" fw={600}>PROJECTED TURNOUT</Text>
                <Text size="xl" fw={900}>{simulationResult.projectedTurnout}%</Text>
              </Stack>
              <Stack gap={0} align="center">
                <Text size="xs" c="dimmed" fw={600}>FLIPPED AC SEGMENTS</Text>
                <Badge size="lg" color={simulationResult.flippedCount > 0 ? 'red' : 'gray'} variant="filled">
                  {simulationResult.flippedCount} of 8 Segments
                </Badge>
              </Stack>
            </Group>
          </Group>
        </Paper>
      )}

      {/* Assembly Segment Simulation Breakdown */}
      {simulationResult && (
        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Title order={4}>Simulated Assembly Segment Outcomes</Title>
            <Badge color="indigo" variant="light">
              Segment Sensitivity Analysis
            </Badge>
          </Group>
          <Text size="xs" c="dimmed" mb="md">
            Segment-level projections under current slider parameters. Segments highlighted in red/green indicate flips from actual 2024 returns.
          </Text>

          <Table.ScrollContainer minWidth={600}>
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>AC No.</Table.Th>
                  <Table.Th>Segment Name</Table.Th>
                  <Table.Th>2024 Baseline Winner</Table.Th>
                  <Table.Th>Baseline Margin</Table.Th>
                  <Table.Th>Simulated Winner</Table.Th>
                  <Table.Th>Simulated Margin (Votes)</Table.Th>
                  <Table.Th>Status / Impact</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {simulationResult.acSimulations.map(ac => (
                  <Table.Tr key={ac.acNumber} style={{ backgroundColor: ac.flipped ? (isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.08)') : undefined }}>
                    <Table.Td fw={700}>{ac.acNumber}</Table.Td>
                    <Table.Td fw={600}>{ac.name}</Table.Td>
                    <Table.Td>
                      <Badge color="orange" variant="light">BJP</Badge>
                    </Table.Td>
                    <Table.Td>+{ac.originalMargin.toLocaleString()}</Table.Td>
                    <Table.Td>
                      <Badge color={ac.projectedWinner === 'BJP' ? 'orange' : 'green'} variant="filled">
                        {ac.projectedWinner}
                      </Badge>
                    </Table.Td>
                    <Table.Td fw={700}>
                      {ac.projectedMargin.toLocaleString()} votes
                    </Table.Td>
                    <Table.Td>
                      {ac.flipped ? (
                        <Badge color="red" variant="filled">
                          FLIPPED TO {ac.projectedWinner}
                        </Badge>
                      ) : (
                        <Badge color="gray" variant="light">
                          Retained
                        </Badge>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Paper>
      )}
    </Stack>
  );
}

export default SwingSimulator;
