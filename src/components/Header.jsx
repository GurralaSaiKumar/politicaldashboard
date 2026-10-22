import React from 'react';
import {
  Paper,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Select,
  ActionIcon,
  Button,
  useMantineColorScheme
} from '../ui/mantine';
import {
  IconSun,
  IconMoon,
  IconDatabase,
  IconFileSpreadsheet,
  IconInfoCircle,
  IconBuildingArch,
  IconCheck
} from '../ui/icons';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

export function Header({
  constituencies,
  selectedPCId,
  onSelectPC,
  profileData,
  onOpenMethodology,
  rawRecords
}) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const handleExportCSV = () => {
    if (rawRecords && rawRecords.length > 0) {
      exportToCSV(rawRecords, `${selectedPCId}_election_intelligence.csv`);
    }
  };

  const handleExportJSON = () => {
    if (rawRecords && rawRecords.length > 0) {
      exportToJSON(rawRecords, `${selectedPCId}_election_intelligence.json`);
    }
  };

  const meta = profileData?.meta;

  return (
    <Paper
      p="md"
      radius="md"
      withBorder
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        backdropFilter: 'blur(12px)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        marginBottom: '1rem'
      }}
    >
      <Group justify="space-between" align="center" wrap="wrap" gap="md">
        {/* Left: Branding & Constituency Title */}
        <Group align="center" gap="sm">
          <Paper
            p="xs"
            radius="md"
            style={{
              backgroundColor: isDark ? '#1e293b' : '#eff6ff',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
            }}
          >
            <IconBuildingArch size={28} />
          </Paper>
          <Stack gap={2}>
            <Group gap="xs" align="center">
              <Title order={3} style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                POLITICAL INTELLIGENCE COMMAND
              </Title>
              <Badge variant="gradient" gradient={{ from: 'orange', to: 'indigo', deg: 90 }} size="sm">
                ECI VERIFIED
              </Badge>
            </Group>
            <Text size="xs" c="dimmed">
              Parliamentary Constituency Electoral Analytics, Demographic Profiling & Predictive Modeling
            </Text>
          </Stack>
        </Group>

        {/* Center: Constituency Selector */}
        <Group gap="sm" align="center">
          <Text size="sm" fw={600} c="dimmed">
            Constituency:
          </Text>
          <Select
            data={constituencies.map(c => ({
              value: c.id,
              label: `${c.name} (${c.state})`
            }))}
            value={selectedPCId}
            onChange={onSelectPC}
            size="sm"
            style={{ width: 260 }}
            allowDeselect={false}
          />
        </Group>

        {/* Right: Actions & Theme Toggle */}
        <Group gap="xs" align="center">
          <Button
            variant="light"
            color="blue"
            size="xs"
            leftSection={<IconFileSpreadsheet size={16} />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>

          <Button
            variant="light"
            color="gray"
            size="xs"
            leftSection={<IconDatabase size={16} />}
            onClick={handleExportJSON}
          >
            Export JSON
          </Button>

          <Button
            variant="subtle"
            color="indigo"
            size="xs"
            leftSection={<IconInfoCircle size={16} />}
            onClick={onOpenMethodology}
          >
            Methodology & ECI Sources
          </Button>

          <ActionIcon
            variant="default"
            size="lg"
            radius="md"
            aria-label="Toggle color scheme"
            onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? <IconSun size={18} color="#f59e0b" /> : <IconMoon size={18} color="#4b5563" />}
          </ActionIcon>
        </Group>
      </Group>

      {/* Secondary Meta Strip */}
      {meta && (
        <Group justify="space-between" mt="sm" pt="xs" style={{ borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }}>
          <Group gap="lg" wrap="wrap">
            <Group gap={6}>
              <Text size="xs" c="dimmed">Incumbent MP:</Text>
              <Text size="xs" fw={700}>{meta.incumbentMP} ({meta.incumbentParty})</Text>
              <Badge size="xs" color={meta.incumbentParty === 'BJP' ? 'orange' : 'green'}>
                {meta.incumbentParty}
              </Badge>
            </Group>
            <Group gap={6}>
              <Text size="xs" c="dimmed">Total Electors (2024):</Text>
              <Text size="xs" fw={700}>{meta.totalElectors2024?.toLocaleString()}</Text>
            </Group>
            <Group gap={6}>
              <Text size="xs" c="dimmed">Win Margin (2024):</Text>
              <Text size="xs" fw={700} c="teal">
                +{meta.lastMarginVotes?.toLocaleString()} ({meta.lastMarginPct}%)
              </Text>
            </Group>
            <Group gap={6}>
              <Text size="xs" c="dimmed">Polling Stations:</Text>
              <Text size="xs" fw={700}>{meta.totalPollingStations?.toLocaleString()}</Text>
            </Group>
          </Group>

          <Group gap={6}>
            <IconCheck size={14} color="#10b981" />
            <Text size="xs" c="dimmed">
              ECI Form 20 & 2011/2024 Census Sync Active
            </Text>
          </Group>
        </Group>
      )}
    </Paper>
  );
}
export default Header;
