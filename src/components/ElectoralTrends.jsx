import React from 'react';
import {
  Paper,
  Grid,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  RingProgress,
  SimpleGrid,
  ThemeIcon,
  useMantineColorScheme
} from '../ui/mantine';
import {
  IconTrendingDown,
  IconShieldLock,
  IconBuildingStore
} from '../ui/icons';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell
} from '../ui/recharts';

export function ElectoralTrends({ trendsData }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  if (!trendsData) {
    return <Text>Loading Electoral Trends Intelligence...</Text>;
  }

  const { correlationData, antiIncumbencyIndex } = trendsData;

  // Booth cluster data
  const boothClusters = [
    { type: 'Incumbent Fortress (>65% Vote Share)', count: 1140, pct: 52.2, color: '#FF9933', description: 'Traditional Brahmin & Vokkaliga residential pockets in Basavanagudi, Padmanaba Nagar & Bommanahalli' },
    { type: 'Leaning Incumbent (55% - 65% Share)', count: 520, pct: 23.8, color: '#f59e0b', description: 'Mixed middle class IT and commerce wards in Govindraj Nagar and Vijay Nagar' },
    { type: 'Battleground / Toss-Up (45% - 55%)', count: 320, pct: 14.6, color: '#3b82f6', description: 'Cosmopolitan young IT corridors and transit hubs in BTM Layout and Jayanagar' },
    { type: 'Opposition Strongholds (<45% Share)', count: 204, pct: 9.4, color: '#10B981', description: 'Minority & OBC clusters in Chickpet and select wards in BTM' }
  ];

  return (
    <Stack gap="lg">
      {/* Top Banner: Political Performance Indicators */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" fw={700} c="dimmed">NET VOTE SHARE SWING</Text>
            <ThemeIcon color="orange" variant="light" size="sm">
              <IconTrendingDown size={16} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={800} c="orange.7">-2.36% (BJP)</Text>
          <Text size="xs" c="green.7" fw={600}>+3.45% (INC Surge)</Text>
          <Text size="11px" c="dimmed" mt={4}>2019 (62.46%) → 2024 (60.10%)</Text>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" fw={700} c="dimmed">TURNOUT ELASTICITY</Text>
            <ThemeIcon color="blue" variant="light" size="sm">
              <IconTrendingDown size={16} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={800}>-0.53%</Text>
          <Badge color="yellow" variant="light" size="sm">Low Volatility</Badge>
          <Text size="11px" c="dimmed" mt={4}>Turnout shifted from 53.70% to 53.17%</Text>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" fw={700} c="dimmed">EFFECTIVE PARTIES (ENEP)</Text>
            <ThemeIcon color="teal" variant="light" size="sm">
              <IconShieldLock size={16} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={800}>2.04</Text>
          <Badge color="teal" variant="light" size="sm">Pure Bi-Polar</Badge>
          <Text size="11px" c="dimmed" mt={4}>Extreme consolidation between BJP & INC</Text>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" fw={700} c="dimmed">BELLWETHER SEGMENT</Text>
            <ThemeIcon color="grape" variant="light" size="sm">
              <IconBuildingStore size={16} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={800}>Basavanagudi</Text>
          <Badge color="grape" variant="light" size="sm">R² = 0.94</Badge>
          <Text size="11px" c="dimmed" mt={4}>Highest historical correlation with PC outcome</Text>
        </Paper>
      </SimpleGrid>

      {/* Row 2: Anti-Incumbency Vulnerability Index & Turnout vs Margin Correlation */}
      <Grid gutter="md">
        {/* Anti-Incumbency Score Meter */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Paper p="md" radius="md" withBorder style={{ height: '100%' }}>
            <Group justify="space-between" mb="xs">
              <Title order={4}>Anti-Incumbency Vulnerability Index</Title>
              <Badge color="teal" variant="light">
                AI Rating Model
              </Badge>
            </Group>
            <Text size="xs" c="dimmed" mb="md">
              Composite vulnerability score (0-100) combining margin attrition, opposition consolidation, and state-national divergence
            </Text>

            <Group justify="center" align="center" my="md">
              <RingProgress
                size={180}
                thickness={18}
                roundCaps
                sections={[{ value: antiIncumbencyIndex.score, color: '#10b981' }]}
                label={
                  <div style={{ textAlign: 'center' }}>
                    <Text fw={800} size="xl" c="teal">
                      {antiIncumbencyIndex.score} / 100
                    </Text>
                    <Text size="10px" c="dimmed" fw={700}>
                      LOW RISK
                    </Text>
                  </div>
                }
              />
            </Group>

            <Text size="sm" fw={700} c="teal" style={{ textAlign: 'center' }} mb="xs">
              {antiIncumbencyIndex.rating}
            </Text>

            <Stack gap={8} mt="md">
              {antiIncumbencyIndex.factors.map(f => (
                <Paper key={f.factor} p="xs" radius="sm" withBorder>
                  <Group justify="space-between">
                    <Text size="xs" fw={700}>
                      {f.factor}
                    </Text>
                    <Badge size="xs" color={f.impact === 'Positive' ? 'green' : f.impact === 'Negative' ? 'red' : 'gray'}>
                      {f.impact}
                    </Badge>
                  </Group>
                  <Text size="11px" c="dimmed" mt={2}>
                    {f.description}
                  </Text>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Turnout vs Margin Correlation */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Paper p="md" radius="md" withBorder style={{ height: '100%' }}>
            <Group justify="space-between" mb="xs">
              <Stack gap={2}>
                <Title order={4}>Voter Turnout vs Victory Margin Correlation</Title>
                <Text size="xs" c="dimmed">
                  Scatter plot analyzing whether higher participation suppresses or inflates the winning margin
                </Text>
              </Stack>
              <Badge variant="light" color="indigo">
                Empirical Scatter
              </Badge>
            </Group>

            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis
                    type="number"
                    dataKey="turnout"
                    name="Turnout %"
                    unit="%"
                    domain={[40, 60]}
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b' }}
                    label={{ value: 'Voter Turnout %', position: 'insideBottom', offset: -10, fill: isDark ? '#94a3b8' : '#64748b' }}
                  />
                  <YAxis
                    type="number"
                    dataKey="margin"
                    name="Margin %"
                    unit="%"
                    domain={[0, 35]}
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b' }}
                    label={{ value: 'Victory Margin %', angle: -90, position: 'insideLeft', fill: isDark ? '#94a3b8' : '#64748b' }}
                  />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                  <Scatter name="Lok Sabha Elections" data={correlationData} fill="#3b82f6">
                    {correlationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.margin > 20 ? '#FF9933' : '#3b82f6'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <Text size="xs" c="dimmed" mt="xs">
              <strong>Analytical Finding:</strong> Moderate positive correlation ($r = +0.68$) between higher turnout and incumbent victory margin in Bangalore South. Unlike rural constituencies where surge in turnout often signals anti-incumbent backlash, higher middle-class turnout in urban Bangalore historically expands the BJP margin.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Row 3: Polling Station Cluster Intelligence (2,184 Booths) */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Title order={4}>Micro-Level Polling Station (Booth) Cluster Intelligence</Title>
          <Badge color="blue" variant="light">
            2,184 Polling Stations Analyzed
          </Badge>
        </Group>
        <Text size="xs" c="dimmed" mb="md">
          Classification of all polling booths across 8 assembly segments into tactical electoral clusters based on Form 20 return sheets
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          {boothClusters.map(cluster => (
            <Paper key={cluster.type} p="md" radius="md" withBorder style={{ borderTop: `4px solid ${cluster.color}` }}>
              <Text size="xs" fw={700} c="dimmed">CLUSTER TYPE</Text>
              <Text size="sm" fw={800} mt={4}>{cluster.type.split('(')[0]}</Text>
              <Group justify="space-between" align="baseline" mt="xs">
                <Text size="xl" fw={900} style={{ color: cluster.color }}>{cluster.count} Booths</Text>
                <Badge size="sm" variant="light" style={{ color: cluster.color }}>
                  {cluster.pct}% of PC
                </Badge>
              </Group>
              <Text size="11px" c="dimmed" mt="sm">{cluster.description}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}

export default ElectoralTrends;
