import React, { useState, useEffect } from 'react';
import {
  MantineProvider,
  createTheme,
  Container,
  Tabs,
  Text,
  Badge,
  Group,
  Loader,
  Alert
} from './ui/mantine';
import {
  IconUsers,
  IconHistory,
  IconBuildingArch,
  IconTrendingUp,
  IconAdjustments,
  IconDatabase,
  IconAlertCircle
} from './ui/icons';

import './index.css';
import api from './services/api';
import Header from './components/Header';
import DemographicProfile from './components/DemographicProfile';
import HistoricalResults from './components/HistoricalResults';
import AssemblyAnalysis from './components/AssemblyAnalysis';
import ElectoralTrends from './components/ElectoralTrends';
import SwingSimulator from './components/SwingSimulator';
import DataExplorer from './components/DataExplorer';
import MethodologyModal from './components/MethodologyModal';

const theme = createTheme({
  fontFamily: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  primaryColor: 'blue',
  defaultRadius: 'md',
  components: {
    Paper: {
      defaultProps: {
        radius: 'md'
      }
    }
  }
});

function App() {
  const [activeTab, setActiveTab] = useState('demographics');
  const [constituencies, setConstituencies] = useState([]);
  const [selectedPCId, setSelectedPCId] = useState('PC-26-KA');
  const [profileData, setProfileData] = useState(null);
  const [demographics, setDemographics] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [assemblyData, setAssemblyData] = useState([]);
  const [trendsData, setTrendsData] = useState(null);
  const [rawRecords, setRawRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [methodologyOpened, setMethodologyOpened] = useState(false);

  // Load constituencies list once
  useEffect(() => {
    async function loadConstituencies() {
      try {
        const res = await api.getConstituencies();
        setConstituencies(res.data);
      } catch (err) {
        console.error('Failed to load constituencies:', err);
      }
    }
    loadConstituencies();
  }, []);

  // Load data whenever selected constituency changes
  useEffect(() => {
    async function fetchConstituencyIntelligence() {
      setLoading(true);
      setError(null);
      try {
        const [prof, demo, hist, acs, trnds, raw] = await Promise.all([
          api.getConstituencyProfile(selectedPCId),
          api.getDemographics(selectedPCId),
          api.getHistoricalResults(selectedPCId),
          api.getAssemblySegments(selectedPCId),
          api.getElectoralTrends(selectedPCId),
          api.getRawRecords(selectedPCId)
        ]);

        setProfileData(prof.data);
        setDemographics(demo.data);
        setHistoricalData(hist.data);
        setAssemblyData(acs.data);
        setTrendsData(trnds.data);
        setRawRecords(raw.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch political intelligence dataset. Please verify mock API connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchConstituencyIntelligence();
  }, [selectedPCId]);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div style={{ minHeight: '100vh', padding: '1.25rem 0.5rem 3rem' }}>
        <Container size="xl">
          {/* Executive Header & Quick Filters */}
          <Header
            constituencies={constituencies}
            selectedPCId={selectedPCId}
            onSelectPC={setSelectedPCId}
            profileData={profileData}
            onOpenMethodology={() => setMethodologyOpened(true)}
            rawRecords={rawRecords}
          />

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} title="Network Error" color="red" mb="md" radius="md">
              {error}
            </Alert>
          )}

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: '1rem' }}>
              <Loader size="lg" color="blue" type="bars" />
              <Text size="sm" c="dimmed">Ingesting Form 20 ECI Statistical Records & Census Models...</Text>
            </div>
          ) : (
            <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="md">
              <Tabs.List mb="md" style={{ gap: '0.4rem', flexWrap: 'wrap' }}>
                <Tabs.Tab
                  value="demographics"
                  leftSection={<IconUsers size={16} />}
                >
                  Demographic Profile
                </Tabs.Tab>

                <Tabs.Tab
                  value="historical"
                  leftSection={<IconHistory size={16} />}
                >
                  Parliamentary Results (2009–2024)
                </Tabs.Tab>

                <Tabs.Tab
                  value="assembly"
                  leftSection={<IconBuildingArch size={16} />}
                >
                  Assembly Segments & Split-Ticket
                </Tabs.Tab>

                <Tabs.Tab
                  value="trends"
                  leftSection={<IconTrendingUp size={16} />}
                >
                  Electoral Trends & Booth Clusters
                </Tabs.Tab>

                <Tabs.Tab
                  value="simulator"
                  leftSection={<IconAdjustments size={16} />}
                  color="grape"
                >
                  "What-If" Swing Simulator
                </Tabs.Tab>

                <Tabs.Tab
                  value="explorer"
                  leftSection={<IconDatabase size={16} />}
                >
                  ECI Data Explorer & Export
                </Tabs.Tab>
              </Tabs.List>

              {/* Tab 1: Demographic Profile */}
              <Tabs.Panel value="demographics">
                <DemographicProfile demographics={demographics} pcMeta={profileData?.meta} />
              </Tabs.Panel>

              {/* Tab 2: Historical Results */}
              <Tabs.Panel value="historical">
                <HistoricalResults historicalData={historicalData} />
              </Tabs.Panel>

              {/* Tab 3: Assembly Segment Retrospective */}
              <Tabs.Panel value="assembly">
                <AssemblyAnalysis assemblyData={assemblyData} />
              </Tabs.Panel>

              {/* Tab 4: Electoral Trends & Indicators */}
              <Tabs.Panel value="trends">
                <ElectoralTrends trendsData={trendsData} assemblyData={assemblyData} />
              </Tabs.Panel>

              {/* Tab 5: Swing Simulator */}
              <Tabs.Panel value="simulator">
                <SwingSimulator selectedPCId={selectedPCId} />
              </Tabs.Panel>

              {/* Tab 6: Raw ECI Data Explorer */}
              <Tabs.Panel value="explorer">
                <DataExplorer
                  rawRecords={rawRecords}
                  selectedPCId={selectedPCId}
                  assemblyData={assemblyData}
                />
              </Tabs.Panel>
            </Tabs>
          )}

          {/* Footer Attribution */}
          <Group justify="space-between" mt="3rem" pt="md" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Text size="xs" c="dimmed">
              © 2026 Political Intelligence Command Dashboard. Compliant with ECI Statistical Guidelines & Form 20 Specifications.
            </Text>
            <Group gap="xs">
              <Badge size="xs" variant="outline" color="blue">
                React.js + Mantine UI
              </Badge>
              <Badge size="xs" variant="outline" color="orange">
                Recharts Analytics
              </Badge>
              <Badge size="xs" variant="outline" color="green">
                Simulated REST API
              </Badge>
            </Group>
          </Group>
        </Container>

        {/* Methodology & Technical Specifications Modal */}
        <MethodologyModal opened={methodologyOpened} onClose={() => setMethodologyOpened(false)} />
      </div>
    </MantineProvider>
  );
}

export default App;
