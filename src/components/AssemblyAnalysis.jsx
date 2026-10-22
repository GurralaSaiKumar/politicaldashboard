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
  Button,
  SimpleGrid,
  ThemeIcon,
  rem,
  Alert,
  Card,
  useMantineColorScheme
} from '../ui/mantine';
import {
  IconBuildingArch,
  IconArrowsExchange,
  IconChartBar,
  IconInfoCircle,
  IconShieldCheck,
  IconAlertTriangle,
  IconMapPin
} from '../ui/icons';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Cell
} from '../ui/recharts';

export function AssemblyAnalysis({ assemblyData }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedACNumber, setSelectedACNumber] = useState(
    assemblyData && assemblyData.length > 0 ? assemblyData[0].acNumber : 166
  );

  if (!assemblyData || assemblyData.length === 0) {
    return <Text>Loading Assembly Segment Data...</Text>;
  }

  const selectedAC = assemblyData.find(ac => ac.acNumber === selectedACNumber) || assemblyData[0];

  // Prepare chart data for lead margins
  const marginChartData = assemblyData.map(ac => ({
    name: ac.name,
    acNumber: ac.acNumber,
    leadMargin: ac.parliamentaryLead2024 ? ac.parliamentaryLead2024.leadMargin : 0,
    party: ac.parliamentaryLead2024 ? ac.parliamentaryLead2024.leadingParty : 'BJP',
    turnout: ac.parliamentaryLead2024 ? ac.parliamentaryLead2024.turnoutPct : 53,
    splitTicket: ac.splitTicketVoting
  }));

  return (
    <Stack gap="lg">
      {/* Intro Alert: Split-Ticket Voting Phenomenon */}
      <Alert
        variant="light"
        color="indigo"
        radius="md"
        title="Political Intelligence Brief: Dual Mandate & Split-Ticket Voting Dynamics"
        icon={<IconArrowsExchange size={20} />}
      >
        A defining hallmark of urban political behavior in this Parliamentary Constituency is <strong>Split-Ticket Voting</strong>. In the 2023 Karnataka State Assembly elections, the Indian National Congress (INC) captured key assembly seats including Govindraj Nagar, Vijay Nagar, and B.T.M. Layout. However, in the 2024 Lok Sabha General Elections, the electorate decisively crossed party lines, giving the Bharatiya Janata Party (BJP) a sweep of <strong>all 8 Assembly Segments</strong> for parliamentary representation.
      </Alert>

      {/* Row 1: Charts - AC-wise Lead Margins & Turnout Rates */}
      <Grid gutter="md">
        {/* Lead Margins across Assembly Segments */}
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper p="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Stack gap={2}>
                <Title order={4}>2024 Lok Sabha Lead Margins by Assembly Segment</Title>
                <Text size="xs" c="dimmed">
                  Net vote leads by the winning candidate across all constituent assembly segments
                </Text>
              </Stack>
              <Badge variant="filled" color="orange">
                BJP Lead in 8/8 ACs
              </Badge>
            </Group>

            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={marginChartData} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                    tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={val => [`+${val.toLocaleString()} votes`, 'Lead Margin']}
                  />
                  <Bar dataKey="leadMargin" name="Lead Margin (Votes)" radius={[4, 4, 0, 0]}>
                    {marginChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.leadMargin > 50000 ? '#ea580c' : entry.leadMargin > 20000 ? '#f97316' : '#fb923c'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Text size="xs" c="dimmed" mt={4}>
              <strong>Key Segment:</strong> Bommanahalli provided the largest raw vote buffer (+67,780 votes), followed closely by Basavanagudi (+58,370) and Padmanaba Nagar (+54,690).
            </Text>
          </Paper>
        </Grid.Col>

        {/* Turnout by AC Segment */}
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Paper p="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Stack gap={2}>
                <Title order={4}>Voter Turnout by Assembly Segment</Title>
                <Text size="xs" c="dimmed">
                  Participation variances across demographic & geographical segments
                </Text>
              </Stack>
              <Badge variant="light" color="teal">
                Turnout Spread
              </Badge>
            </Group>

            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={marginChartData} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis type="number" domain={[45, 60]} unit="%" tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }} width={100} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={val => [`${val}%`, 'Turnout']}
                  />
                  <Bar dataKey="turnout" fill="#0d9488" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Row 2: Interactive Assembly Segment Selector & Deep Dive Inspector */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="md" wrap="wrap">
          <Group gap="xs">
            <ThemeIcon color="blue" variant="light" size="lg">
              <IconMapPin size={20} />
            </ThemeIcon>
            <Title order={4}>Assembly Segment Inspector: {selectedAC.name} (AC-{selectedAC.acNumber})</Title>
          </Group>

          {/* Quick Select Buttons */}
          <Group gap="xs" wrap="wrap">
            {assemblyData.map(ac => (
              <Button
                key={ac.acNumber}
                size="xs"
                variant={ac.acNumber === selectedAC.acNumber ? 'filled' : 'light'}
                color={ac.splitTicketVoting ? 'indigo' : 'blue'}
                onClick={() => setSelectedACNumber(ac.acNumber)}
              >
                {ac.name}
              </Button>
            ))}
          </Group>
        </Group>

        {/* Selected AC Metrics */}
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="md" radius="md" withBorder>
              <Text size="xs" fw={700} c="dimmed">ELECTORAL SIZING</Text>
              <Text size="xl" fw={800} mt={4}>{selectedAC.totalElectors.toLocaleString()} Electors</Text>
              <Text size="xs" c="dimmed">Polling Stations: {selectedAC.pollingStations} Booths</Text>
              <Badge mt="sm" color={selectedAC.competitiveness === 'Fortress/Safe' ? 'green' : 'yellow'} variant="light">
                Classification: {selectedAC.competitiveness}
              </Badge>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="md" radius="md" withBorder style={{ borderLeft: '4px solid #FF9933' }}>
              <Text size="xs" fw={700} c="dimmed">2024 LOK SABHA PERFORMANCE</Text>
              <Group justify="space-between" mt={4}>
                <Text size="md" fw={800} c="orange.7">
                  BJP: {selectedAC.parliamentaryLead2024.votes.toLocaleString()}
                </Text>
                <Text size="md" fw={800} c="green.7">
                  INC: {selectedAC.parliamentaryLead2024.trailingVotes.toLocaleString()}
                </Text>
              </Group>
              <Text size="xs" fw={700} c="teal" mt={4}>
                Lead Margin: +{selectedAC.parliamentaryLead2024.leadMargin.toLocaleString()} votes ({selectedAC.marginPct}%)
              </Text>
              <Text size="11px" c="dimmed">Turnout in 2024: {selectedAC.parliamentaryLead2024.turnoutPct}%</Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="md" radius="md" withBorder style={{ borderLeft: `4px solid ${selectedAC.stateAssembly2023Result?.party === 'INC' ? '#10B981' : '#FF9933'}` }}>
              <Text size="xs" fw={700} c="dimmed">2023 STATE ASSEMBLY (VIDHAN SABHA)</Text>
              {selectedAC.stateAssembly2023Result ? (
                <>
                  <Text size="md" fw={800} mt={4}>
                    MLA: {selectedAC.stateAssembly2023Result.winner} ({selectedAC.stateAssembly2023Result.party})
                  </Text>
                  <Text size="xs" c="dimmed">
                    Runner-up: {selectedAC.stateAssembly2023Result.runnerUp} ({selectedAC.stateAssembly2023Result.runnerUpParty})
                  </Text>
                  <Text size="xs" fw={700} c={selectedAC.stateAssembly2023Result.party === 'INC' ? 'green.7' : 'orange.7'} mt={4}>
                    Assembly Margin: {selectedAC.stateAssembly2023Result.margin.toLocaleString()} votes
                  </Text>
                  <Badge mt={4} color={selectedAC.splitTicketVoting ? 'indigo' : 'gray'} variant="light">
                    {selectedAC.splitTicketVoting ? 'Split-Ticket Voting Confirmed' : 'Aligned Mandate'}
                  </Badge>
                </>
              ) : (
                <Text size="xs" c="dimmed">No state assembly record available</Text>
              )}
            </Card>
          </Grid.Col>
        </Grid>

        {/* Demographic & Strategic Slant */}
        <Paper p="sm" mt="md" radius="sm" style={{ backgroundColor: isDark ? '#1e293b' : '#f8fafc' }}>
          <Group align="flex-start" gap="xs">
            <ThemeIcon color="cyan" variant="subtle" size="sm">
              <IconInfoCircle size={16} />
            </ThemeIcon>
            <Stack gap={2}>
              <Text size="xs" fw={700}>Strategic Demographic Character & ECI Booth Intelligence:</Text>
              <Text size="xs" c="dimmed">{selectedAC.demographicFocus || 'Urban commercial and residential voting cluster.'}</Text>
            </Stack>
          </Group>
        </Paper>
      </Paper>

      {/* Row 3: Comprehensive Comparative Table */}
      <Paper p="md" radius="md" withBorder>
        <Title order={4} mb="xs">
          Cross-Election Assembly Segment Matrix
        </Title>
        <Text size="xs" c="dimmed" mb="md">
          Comparing 2024 Lok Sabha Lead vs 2019 Lok Sabha Lead vs 2023 Karnataka State Assembly Election Winner
        </Text>

        <Table.ScrollContainer minWidth={750}>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>AC No.</Table.Th>
                <Table.Th>Segment Name</Table.Th>
                <Table.Th>Total Electors</Table.Th>
                <Table.Th>2024 LS Lead</Table.Th>
                <Table.Th>2024 Margin (Votes)</Table.Th>
                <Table.Th>2019 LS Margin</Table.Th>
                <Table.Th>2023 Vidhan Sabha Winner</Table.Th>
                <Table.Th>Voting Behavior Pattern</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {assemblyData.map(ac => (
                <Table.Tr key={ac.acNumber}>
                  <Table.Td fw={700}>{ac.acNumber}</Table.Td>
                  <Table.Td fw={600}>{ac.name}</Table.Td>
                  <Table.Td>{ac.totalElectors.toLocaleString()}</Table.Td>
                  <Table.Td>
                    <Badge color="orange" variant="filled">
                      {ac.parliamentaryLead2024.leadingParty}
                    </Badge>
                  </Table.Td>
                  <Table.Td fw={700} c="teal">
                    +{ac.parliamentaryLead2024.leadMargin.toLocaleString()}
                  </Table.Td>
                  <Table.Td>
                    +{ac.parliamentaryLead2019 ? ac.parliamentaryLead2019.leadMargin.toLocaleString() : 'N/A'}
                  </Table.Td>
                  <Table.Td>
                    {ac.stateAssembly2023Result ? (
                      <Badge color={ac.stateAssembly2023Result.party === 'INC' ? 'green' : 'orange'} variant="light">
                        {ac.stateAssembly2023Result.winner} ({ac.stateAssembly2023Result.party})
                      </Badge>
                    ) : (
                      'N/A'
                    )}
                  </Table.Td>
                  <Table.Td>
                    {ac.splitTicketVoting ? (
                      <Badge color="indigo" variant="outline">
                        Split-Ticket (INC Assembly -&gt; BJP Lok Sabha)
                      </Badge>
                    ) : (
                      <Badge color="blue" variant="subtle">
                        Straight-Ticket (BJP Loyal)
                      </Badge>
                    )}
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

export default AssemblyAnalysis;
