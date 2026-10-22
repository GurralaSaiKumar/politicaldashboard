import React from 'react';
import {
  Paper,
  Grid,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Table,
  Progress,
  SimpleGrid,
  useMantineColorScheme
} from '../ui/mantine';
import {
  IconUsers,
  IconBuildingSkyscraper,
  IconSchool,
  IconGenderFemale,
  IconBriefcase,
  IconAlertCircle
} from '../ui/icons';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from '../ui/recharts';
import StatCard from './StatCard';

const COMMUNITY_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#06b6d4', '#64748b'];

export function DemographicProfile({ demographics, pcMeta }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  if (!demographics) {
    return <Text>Loading Demographic Intelligence...</Text>;
  }

  const { summary, ageCohorts, communityProfile, occupationalProfile, voterSentimentIssues } = demographics;

  return (
    <Stack gap="lg">
      {/* KPI Cards Row */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }} spacing="md">
        <StatCard
          title="Est. Population (2024)"
          value={(summary.totalPopulationEst2024 / 1000000).toFixed(2) + ' M'}
          subvalue="Census 2011: 2.55 M (+23.2% growth)"
          icon={IconUsers}
          badgeText="Urban Metro"
          badgeColor="blue"
          tooltip="Based on Census 2011 escalated using Registrar General population projection factors."
          accentColor="#3b82f6"
        />
        <StatCard
          title="Urbanization Ratio"
          value={`${summary.urbanPercentage}%`}
          subvalue="100% BBMP Urban Ward Coverage"
          icon={IconBuildingSkyscraper}
          badgeText="Tier-1 Metro"
          badgeColor="cyan"
          tooltip="100% of Bangalore South lies inside the Bruhat Bengaluru Mahanagara Palike (BBMP) corporation limits."
          accentColor="#06b6d4"
        />
        <StatCard
          title="Overall Literacy"
          value={`${summary.literacyRateTotal}%`}
          subvalue={`Male: ${summary.literacyRateMale}% | Female: ${summary.literacyRateFemale}%`}
          icon={IconSchool}
          badgeText="High Literacy"
          badgeColor="teal"
          tooltip="Far exceeds the Karnataka state average literacy rate of 75.36%."
          accentColor="#10b981"
        />
        <StatCard
          title="Electoral Sex Ratio"
          value={summary.sexRatioElectoral}
          subvalue="Females per 1000 Males in Roll"
          icon={IconGenderFemale}
          badgeText="957:1000"
          badgeColor="grape"
          tooltip="Reflects female voter empowerment and registration drives in urban residential clusters."
          accentColor="#8b5cf6"
        />
        <StatCard
          title="Workforce Participation"
          value={`${summary.workParticipationRate}%`}
          subvalue="High Tech & Retail Concentration"
          icon={IconBriefcase}
          badgeText="48.7% Active"
          badgeColor="orange"
          tooltip="Percentage of working-age population actively employed in formal and organized sectors."
          accentColor="#f59e0b"
        />
      </SimpleGrid>

      {/* Row 2: Age Cohorts & Community Composition */}
      <Grid gutter="md">
        {/* Left: Age Cohorts & Estimated Turnout */}
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper p="md" radius="md" withBorder style={{ height: '100%' }}>
            <Group justify="space-between" mb="xs">
              <Stack gap={2}>
                <Title order={4}>Electorate Age Pyramid & Cohort Turnout</Title>
                <Text size="xs" c="dimmed">
                  Analysis of 2.35M registered voters classified by generational cohorts and turnout propensity
                </Text>
              </Stack>
              <Badge variant="dot" color="blue">
                ECI Roll Data
              </Badge>
            </Group>

            <div style={{ width: '100%', height: 310 }}>
              <ResponsiveContainer>
                <BarChart data={ageCohorts} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis
                    dataKey="cohort"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                    tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[30, 80]}
                    tick={{ fill: '#f59e0b', fontSize: 12 }}
                    unit="%"
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={(val, name) => [
                      name === 'electors' ? val.toLocaleString() + ' voters' : val + '%',
                      name === 'electors' ? 'Electors Count' : 'Est. Turnout %'
                    ]}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar yAxisId="left" dataKey="electors" name="Electors Count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="turnOutEstimate" name="Est. Turnout %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Text size="xs" c="dimmed" mt="xs">
              <strong>Intelligence Insight:</strong> 18-35 age bracket forms 43.0% (over 1.01 Million voters) of the constituency, representing the highest density of tech-workforce voters. However, voter apathy is pronounced in younger cohorts (47.8% turnout) vs senior citizens (62.1%).
            </Text>
          </Paper>
        </Grid.Col>

        {/* Right: Socio-Religious & Community Breakdown */}
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <Paper p="md" radius="md" withBorder style={{ height: '100%' }}>
            <Group justify="space-between" mb="xs">
              <Stack gap={2}>
                <Title order={4}>Community & Demographic Mosaic</Title>
                <Text size="xs" c="dimmed">
                  Estimated social composition and electoral influence vectors
                </Text>
              </Stack>
              <Badge variant="light" color="indigo">
                Census & Survey Model
              </Badge>
            </Group>

            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={communityProfile}
                    dataKey="percentage"
                    nameKey="group"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {communityProfile.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COMMUNITY_COLORS[index % COMMUNITY_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={(val, name, item) => [`${val}%`, `${item.payload.group}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <Stack gap={6} mt="xs">
              {communityProfile.slice(0, 4).map((c, idx) => (
                <Group key={c.group} justify="space-between">
                  <Group gap={6}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: COMMUNITY_COLORS[idx % COMMUNITY_COLORS.length]
                      }}
                    />
                    <Text size="xs" fw={600}>
                      {c.group} ({c.percentage}%)
                    </Text>
                  </Group>
                  <Badge size="xs" variant="outline" color={c.politicalAffinity.includes('BJP') ? 'orange' : c.politicalAffinity.includes('INC') ? 'green' : 'blue'}>
                    {c.politicalAffinity.split(' ')[0]} Lean
                  </Badge>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Row 3: Occupational Sector Profile & Citizen Concern Severity Index */}
      <Grid gutter="md">
        {/* Left: Occupational Breakdown */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" radius="md" withBorder>
            <Title order={4} mb="xs">
              Workforce Distribution by Industry Sector
            </Title>
            <Text size="xs" c="dimmed" mb="md">
              High reliance on technology, modern retail, corporate healthcare, and education
            </Text>

            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart layout="vertical" data={occupationalProfile} margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis type="number" unit="%" tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} />
                  <YAxis
                    dataKey="sector"
                    type="category"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                    width={150}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: 8
                    }}
                    formatter={val => [`${val}%`, 'Workforce Share']}
                  />
                  <Bar dataKey="percentage" fill="#0284c7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid.Col>

        {/* Right: Citizen Issues & Voter Sentiment Tracker */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Title order={4}>Key Voter Issues & Civic Sentiment Tracker</Title>
              <Badge color="red" variant="light" leftSection={<IconAlertCircle size={14} />}>
                Voter Sensitivity Index
              </Badge>
            </Group>
            <Text size="xs" c="dimmed" mb="md">
              Ranked severity score (0-100) based on local grievances, citizen feedback, and electoral campaign salience
            </Text>

            <Stack gap="sm">
              {voterSentimentIssues.map(issue => (
                <div key={issue.issue}>
                  <Group justify="space-between" mb={3}>
                    <Text size="xs" fw={700}>
                      {issue.issue}
                    </Text>
                    <Group gap={6}>
                      <Badge size="xs" variant="light" color={issue.severityScore > 85 ? 'red' : 'yellow'}>
                        Score: {issue.severityScore}/100
                      </Badge>
                      <Badge size="xs" variant="subtle" color="gray">
                        {issue.category}
                      </Badge>
                    </Group>
                  </Group>
                  <Progress
                    value={issue.severityScore}
                    color={issue.severityScore > 85 ? 'red' : issue.severityScore > 75 ? 'orange' : 'yellow'}
                    size="sm"
                    radius="xl"
                  />
                  <Text size="11px" c="dimmed" mt={2}>
                    Critical impact in: {issue.primaryAC}
                  </Text>
                </div>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default DemographicProfile;
