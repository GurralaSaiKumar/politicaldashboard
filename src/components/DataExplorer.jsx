import React, { useState } from 'react';
import {
  Paper,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  TextInput,
  Select,
  Button,
  Table,
  Card,
  useMantineColorScheme,
  Grid
} from '../ui/mantine';
import {
  IconSearch,
  IconFileSpreadsheet,
  IconDatabase,
  IconFilter,
  IconFileCertificate
} from '../ui/icons';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

export function DataExplorer({ rawRecords, selectedPCId, assemblyData }) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const segmentOptions = [
    { value: 'all', label: 'All Assembly Segments' },
    ...(assemblyData || []).map(ac => ({ value: ac.name, label: ac.name }))
  ];

  const typeOptions = [
    { value: 'all', label: 'All Election Formats' },
    { value: 'Lok Sabha', label: 'Lok Sabha (General)' },
    { value: 'State Assembly', label: 'State Assembly (Vidhan Sabha)' }
  ];

  const filteredRecords = (rawRecords || []).filter(r => {
    const matchesQuery =
      searchQuery === '' ||
      r.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.winningParty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.year.toString().includes(searchQuery);

    const matchesSegment = selectedSegment === 'all' || r.unitName === selectedSegment;
    const matchesType = selectedType === 'all' || r.electionType.includes(selectedType);

    return matchesQuery && matchesSegment && matchesType;
  });

  const handleExportCSV = () => {
    exportToCSV(filteredRecords, `${selectedPCId}_eci_records_export.csv`);
  };

  const handleExportJSON = () => {
    exportToJSON(filteredRecords, `${selectedPCId}_eci_records_export.json`);
  };

  return (
    <Stack gap="lg">
      {/* Search & Filter Header */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="md" wrap="wrap">
          <Group gap="xs">
            <IconFileCertificate size={24} color="#3b82f6" />
            <Stack gap={2}>
              <Title order={4}>ECI Statistical Reports & Form 20 Data Explorer</Title>
              <Text size="xs" c="dimmed">
                Audited election return dataset with full-text search, filtering, and export capabilities
              </Text>
            </Stack>
          </Group>

          <Group gap="xs">
            <Button
              size="xs"
              variant="light"
              color="blue"
              leftSection={<IconFileSpreadsheet size={16} />}
              onClick={handleExportCSV}
            >
              Export Filtered CSV
            </Button>
            <Button
              size="xs"
              variant="light"
              color="gray"
              leftSection={<IconDatabase size={16} />}
              onClick={handleExportJSON}
            >
              Export JSON
            </Button>
          </Group>
        </Group>

        <Group gap="md" wrap="wrap">
          <TextInput
            placeholder="Search segment, candidate, party or year..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.currentTarget.value)}
            style={{ flex: 1, minWidth: 240 }}
            size="sm"
          />

          <Select
            data={segmentOptions}
            value={selectedSegment}
            onChange={setSelectedSegment}
            leftSection={<IconFilter size={16} />}
            style={{ width: 220 }}
            size="sm"
            allowDeselect={false}
          />

          <Select
            data={typeOptions}
            value={selectedType}
            onChange={setSelectedType}
            style={{ width: 200 }}
            size="sm"
            allowDeselect={false}
          />
        </Group>
      </Paper>

      {/* Data Records Table */}
      <Paper p="md" radius="md" withBorder>
        <Group justify="space-between" mb="sm">
          <Text size="xs" fw={700} c="dimmed">
            SHOWING {filteredRecords.length} VERIFIED RECORDS
          </Text>
          <Badge color="teal" variant="light">
            Form 20 Statutory Returns
          </Badge>
        </Group>

        <Table.ScrollContainer minWidth={850}>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Record ID</Table.Th>
                <Table.Th>Year</Table.Th>
                <Table.Th>Election Format</Table.Th>
                <Table.Th>AC Unit Name</Table.Th>
                <Table.Th>Total Electors</Table.Th>
                <Table.Th>Turnout %</Table.Th>
                <Table.Th>Winner (Party)</Table.Th>
                <Table.Th>Winner Votes</Table.Th>
                <Table.Th>Runner-up (Party)</Table.Th>
                <Table.Th>Margin</Table.Th>
                <Table.Th>Split Ticket?</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredRecords.map(r => (
                <Table.Tr key={r.id}>
                  <Table.Td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.id}</Table.Td>
                  <Table.Td fw={700}>{r.year}</Table.Td>
                  <Table.Td>
                    <Badge size="xs" color={r.electionType.includes('Lok Sabha') ? 'blue' : 'indigo'} variant="light">
                      {r.electionType}
                    </Badge>
                  </Table.Td>
                  <Table.Td fw={600}>{r.unitName}</Table.Td>
                  <Table.Td>{r.totalElectors?.toLocaleString()}</Table.Td>
                  <Table.Td>{r.turnoutPct}%</Table.Td>
                  <Table.Td>
                    <Badge size="xs" color={r.winningParty === 'BJP' ? 'orange' : 'green'}>
                      {r.winningParty}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{r.leadingVotes?.toLocaleString()}</Table.Td>
                  <Table.Td>{r.trailingParty} ({r.trailingVotes?.toLocaleString()})</Table.Td>
                  <Table.Td fw={700} c="teal">
                    +{r.margin?.toLocaleString()}
                  </Table.Td>
                  <Table.Td>
                    <Badge size="xs" variant="outline" color={r.splitTicket === 'Yes' ? 'violet' : 'gray'}>
                      {r.splitTicket}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>

      {/* Official Government Data Sources Citation Card */}
      <Paper p="md" radius="md" withBorder>
        <Title order={4} mb="xs">
          Authentic Data Sources & Legal Citations
        </Title>
        <Text size="xs" c="dimmed" mb="md">
          This political intelligence platform strictly uses authenticated government statistical releases:
        </Text>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="sm" radius="md" withBorder>
              <Text size="xs" fw={700}>1. ECI Statistical Reports</Text>
              <Text size="11px" c="dimmed" mt={4}>
                Election Commission of India official General Election Returns (2009, 2014, 2019, 2024), Form 20 (Final Result Sheets) per polling station.
              </Text>
              <Text size="11px" c="blue" mt={6} style={{ cursor: 'pointer' }}>
                https://eci.gov.in/statistical-reports/
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="sm" radius="md" withBorder>
              <Text size="xs" fw={700}>2. Census of India (ORGI)</Text>
              <Text size="11px" c="dimmed" mt={4}>
                Office of the Registrar General & Census Commissioner, Ministry of Home Affairs: District Census Handbook (Bangalore Urban), SC/ST and age distribution.
              </Text>
              <Text size="11px" c="blue" mt={6} style={{ cursor: 'pointer' }}>
                https://censusindia.gov.in/
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card padding="sm" radius="md" withBorder>
              <Text size="xs" fw={700}>3. Karnataka CEO & BBMP Reports</Text>
              <Text size="11px" c="dimmed" mt={4}>
                Chief Electoral Officer (CEO) Karnataka Final Electoral Roll 2024, Bruhat Bengaluru Mahanagara Palike (BBMP) ward-delimitation maps and economic surveys.
              </Text>
              <Text size="11px" c="blue" mt={6} style={{ cursor: 'pointer' }}>
                https://ceo.karnataka.gov.in/
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
}

export default DataExplorer;
