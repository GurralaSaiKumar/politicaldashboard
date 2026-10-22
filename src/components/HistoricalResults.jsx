import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Table,
  SegmentedControl,
  SimpleGrid,
  ThemeIcon,
  useMantineColorScheme
} from '../ui/mantine';
import {
  IconTrophy,
  IconFlame
} from '../ui/icons';
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area
} from '../ui/recharts';

export function HistoricalResults({ historicalData }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedYear, setSelectedYear] = useState('2024');

  if (!historicalData || historicalData.length === 0) {
    return <Text>Loading Historical Results...</Text>;
  }

  const currentResult = historicalData.find(h => h.year === parseInt(selectedYear, 10)) || historicalData[0];

  // Prepare trend data for Recharts (2009 to 2024 chronological)
  const chronological = [...historicalData].reverse().map(h => {
    const bjp = h.partyVoteShares?.find(p => p.party === 'BJP')?.share || 0;
    const inc = h.partyVoteShares?.find(p => p.party === 'INC' || p.party === 'AAP+INC')?.share || 0;
    const nota = h.partyVoteShares?.find(p => p.party === 'NOTA')?.share || 0;
    const others = 100 - bjp - inc - nota;

    return {
      year: h.year.toString(),
      BJP: bjp,
      INC: inc,
      NOTA: nota,
      Others: +(others > 0 ? others : 0).toFixed(2),
      turnout: h.turnoutPct,
      maleTurnout: h.maleTurnoutPct || h.turnoutPct,
      femaleTurnout: h.femaleTurnoutPct || h.turnoutPct,
      marginPct: h.marginPct,
      marginVotes: h.marginVotes
    };
  });

  return (
    <Stack gap="lg">
      {/* Year Selector Control */}
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" align="center" wrap="wrap">
          <Group gap="xs">
            <ThemeIcon color="orange" variant="light" size="lg">
              <IconTrophy size={20} />
            </ThemeIcon>
            <Stack gap={2}>
              <Title order={4}>Lok Sabha General Election Results Archive</Title>
              <Text size="xs" c="dimmed">
                Detailed electoral statistics from ECI Statistical Reports (2009 - 2024)
              </Text>
            </Stack>
          </Group>

          <SegmentedControl
            value={selectedYear}
            onChange={setSelectedYear}
            data={historicalData.map(h => ({
              label: `${h.year} General Election`,
              value: h.year.toString()
            }))}
            color="blue"
            size="sm"
          />
        </Group>
      </Paper>

      {/* Head-to-Head Duel Card for Selected Year */}
      <Grid gutter="md">
        {/* Winner Card */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper
            p="md"
            radius="md"
            withBorder
            style={{
              borderLeft: '5px solid #FF9933',
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 153, 51, 0.08) 0%, rgba(30, 41, 59, 0.7) 100%)'
                : 'linear-gradient(135deg, rgba(255, 153, 51, 0.05) 0%, #ffffff 100%)'
            }}
          >
            <Group justify="space-between" align="flex-start" mb="xs">
              <Group gap="xs">
                <Badge color="orange" variant="filled" size="md">
                  WINNER (ELECTED MP)
                </Badge>
                <Badge variant="outline" color="gray">
                  Symbol: {currentResult.winner.symbol || 'Party Emblem'}
                </Badge>
              </Group>
              <ThemeIcon color="orange" size="xl" radius="xl" variant="light">
                <IconTrophy size={24} />
              </ThemeIcon>
            </Group>

            <Title order={3} fw={800}>
              {currentResult.winner.name}
            </Title>
            <Text size="sm" fw={600} c="orange.7" mb="sm">
              {currentResult.winner.party} — Bharatiya Janata Party
            </Text>

            <SimpleGrid cols={3} spacing="xs" mt="md">
              <Paper p="xs" radius="sm" withBorder style={{ textAlign: 'center' }}>
                <Text size="11px" c="dimmed" fw={600}>VOTES SECURED</Text>
                <Text size="md" fw={800}>{currentResult.winner.votes.toLocaleString()}</Text>
              </Paper>
              <Paper p="xs" radius="sm" withBorder style={{ textAlign: 'center' }}>
                <Text size="11px" c="dimmed" fw={600}>VOTE SHARE</Text>
                <Text size="md" fw={800} c="orange.7">{currentResult.winner.voteShare}%</Text>
              </Paper>
              <Paper p="xs" radius="sm" withBorder style={{ textAlign: 'center' }}>
                <Text size="11px" c="dimmed" fw={600}>VICTORY MARGIN</Text>
                <Text size="md" fw={800} c="teal">+{currentResult.marginPct}%</Text>
              </Paper>
            </SimpleGrid>
          </Paper>
        </Grid.Col>

        {/* Runner-Up Card */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper
            p="md"
            radius="md"
            withBorder
            style={{
              borderLeft: '5px solid #10B981',
              background: isDark
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(30, 41, 59, 0.7) 100%)'
                : 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, #ffffff 100%)'
            }}
          >
            <Group justify="space-between" align="flex-start" mb="xs">
              <Group gap="xs">
                <Badge color="green" variant="filled" size="md">
                  RUNNER-UP
                </Badge>
                <Badge variant="outline" color="gray">
                  Symbol: {currentResult.runnerUp.symbol || 'Party Flag'}
                </Badge>
              </Group>
              <ThemeIcon color="green" size="xl" radius="xl" variant="light">
                <IconFlame size={24} />
              </ThemeIcon>
            </Group>

            <Title order={3} fw={800}>
              {currentResult.runnerUp.name}
            </Title>
            <Text size="sm" fw={600} c="green.7" mb="sm">
              {currentResult.runnerUp.party} — Indian National Congress
            </Text>

            <SimpleGrid cols={3} spacing="xs" mt="md">
              <Paper p="xs" radius="sm" withBorder style={{ textAlign: 'center' }}>
                <Text size="11px" c="dimmed" fw={600}>VOTES SECURED</Text>
                <Text size="md" fw={800}>{currentResult.runnerUp.votes.toLocaleString()}</Text>
              </Paper>
              <Paper p="xs" radius="sm" withBorder style={{ textAlign: 'center' }}>
                <Text size="11px" c="dimmed" fw={600}>VOTE SHARE</Text>
                <Text size="md" fw={800} c="green.7">{currentResult.runnerUp.voteShare}%</Text>
              </Paper>
              <Paper p="xs" radius="sm" withBorder style={{ textAlign: 'center' }}>
                <Text size="11px" c="dimmed" fw={600}>MARGIN DEFICIT</Text>
                <Text size="md" fw={800} c="red">-{currentResult.marginVotes.toLocaleString()}</Text>
              </Paper>
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Row 2: Charts: Historical Vote Share Progression & Turnout Evolution */}
      <Grid gutter="md">
        {/* Vote Share Progression Chart */}
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper p="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Stack gap={2}>
                <Title order={4}>Historical Vote Share Trajectory (2009 - 2024)</Title>
                <Text size="xs" c="dimmed">
                  Party vote share percentages over 4 successive Lok Sabha elections
                </Text>
              </Stack>
              <Badge variant="light" color="blue">
                Longitudinal Trend
              </Badge>
            </Group>

            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={chronological} margin={{ top: 15, right: 25, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorBjp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF9933" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="year" tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} />
                  <YAxis unit="%" domain={[0, 70]} tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={val => [`${val}%`]}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Area type="monotone" dataKey="BJP" stroke="#FF9933" strokeWidth={3} fillOpacity={1} fill="url(#colorBjp)" />
                  <Area type="monotone" dataKey="INC" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
                  <Line type="monotone" dataKey="Others" stroke="#94a3b8" strokeDasharray="4 4" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="NOTA" stroke="#ec4899" dot={{ r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid.Col>

        {/* Turnout & Gender Participation Chart */}
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Paper p="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Stack gap={2}>
                <Title order={4}>Electoral Turnout & Gender Ratio</Title>
                <Text size="xs" c="dimmed">
                  Voter turnout percentages with male vs female participation rates
                </Text>
              </Stack>
              <Badge variant="light" color="teal">
                Turnout Metric
              </Badge>
            </Group>

            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chronological} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="year" tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} />
                  <YAxis unit="%" domain={[35, 65]} tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={val => [`${val}%`]}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="turnout" name="Overall Turnout" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="femaleTurnout" name="Female Turnout" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Row 3: Security Deposit Forfeit & Candidate Proliferation Table */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Title order={4}>Electoral Contest Dynamics & Deposit Forfeiture Analysis</Title>
          <Badge color="violet" variant="light">
            Section 34 Representation of People Act
          </Badge>
        </Group>
        <Text size="xs" c="dimmed" mb="md">
          According to ECI guidelines, candidates failing to secure one-sixth (16.67%) of the total valid votes polled forfeit their security deposit.
        </Text>

        <Table.ScrollContainer minWidth={600}>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Election Year</Table.Th>
                <Table.Th>Total Electors</Table.Th>
                <Table.Th>Votes Polled</Table.Th>
                <Table.Th>Turnout %</Table.Th>
                <Table.Th>Total Contestants</Table.Th>
                <Table.Th>Deposits Forfeited</Table.Th>
                <Table.Th>NOTA Votes</Table.Th>
                <Table.Th>Victory Margin (Votes / %)</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {historicalData.map(h => (
                <Table.Tr key={h.year}>
                  <Table.Td fw={700}>{h.year}</Table.Td>
                  <Table.Td>{h.electors.toLocaleString()}</Table.Td>
                  <Table.Td>{h.votesPolled.toLocaleString()}</Table.Td>
                  <Table.Td>
                    <Badge color={h.turnoutPct > 55 ? 'teal' : 'blue'} variant="light">
                      {h.turnoutPct}%
                    </Badge>
                  </Table.Td>
                  <Table.Td>{h.totalCandidates}</Table.Td>
                  <Table.Td>
                    <Badge color="red" variant="subtle">
                      {h.forfeitedDeposits} ({( (h.forfeitedDeposits / h.totalCandidates) * 100 ).toFixed(0)}%)
                    </Badge>
                  </Table.Td>
                  <Table.Td>{h.notaVotes ? h.notaVotes.toLocaleString() + ` (${h.notaPct}%)` : 'N/A'}</Table.Td>
                  <Table.Td fw={700} c="teal">
                    +{h.marginVotes.toLocaleString()} ({h.marginPct}%)
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </Stack>
  );
}

export default HistoricalResults;
