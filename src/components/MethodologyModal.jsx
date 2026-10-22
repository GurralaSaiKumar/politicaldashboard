import React from 'react';
import {
  Modal,
  Stack,
  Title,
  Text,
  Paper,
  Code,
  Group
} from '../ui/mantine';
import { IconInfoCircle, IconMathFunction, IconShieldLock, IconDatabase } from '../ui/icons';

export function MethodologyModal({ opened, onClose }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconInfoCircle size={22} color="#3b82f6" />
          <Title order={4}>Political Intelligence Methodology & Architecture</Title>
        </Group>
      }
      size="xl"
      radius="md"
    >
      <Stack gap="md">
        {/* Section 1: Overview */}
        <Paper p="sm" radius="md" withBorder>
          <Title order={5} mb={4}>1. System Architecture Overview</Title>
          <Text size="xs" c="dimmed">
            The platform is constructed on a componentized, asynchronous architecture separating statistical telemetry ingestion, analytical normalization, simulation engines, and Mantine/Recharts reactive visualization.
          </Text>
        </Paper>

        {/* Section 2: Mathematical Formulations */}
        <Paper p="sm" radius="md" withBorder>
          <Group gap="xs" mb="xs">
            <IconMathFunction size={18} color="#8b5cf6" />
            <Title order={5}>2. Analytical & Electoral Formulas</Title>
          </Group>

          <Stack gap="xs">
            <div>
              <Text size="xs" fw={700}>A. Two-Party Conventional Net Swing (Steed-Butler Formula):</Text>
              <Code block mt={4}>
                Swing (Party A → Party B) = [ (Party A Share_t2 - Party A Share_t1) - (Party B Share_t2 - Party B Share_t1) ] / 2
              </Code>
              <Text size="11px" c="dimmed" mt={2}>
                Applied to quantify inter-election vote transfers between BJP and INC across 2019 and 2024 general elections.
              </Text>
            </div>

            <div>
              <Text size="xs" fw={700}>B. Effective Number of Electoral Parties (Laakso & Taagepera Index - ENEP):</Text>
              <Code block mt={4}>
                ENEP = 1 / Σ (v_i)² , where v_i is the fractional vote share of candidate/party i
              </Code>
              <Text size="11px" c="dimmed" mt={2}>
                Bangalore South ENEP = 2.04, reflecting almost pure bi-polar competition between BJP and INC with negligible third-force presence.
              </Text>
            </div>

            <div>
              <Text size="xs" fw={700}>C. Anti-Incumbency Vulnerability Score Formulation:</Text>
              <Code block mt={4}>
                Score = 0.40 * (Margin Contraction Rate) + 0.30 * (Opposition Vote Share Delta) + 0.20 * (Segment Deficit Count) + 0.10 * (NOTA Escalation)
              </Code>
              <Text size="11px" c="dimmed" mt={2}>
                Normalized on a 0-100 scale where &lt;35 = Low Risk (Incumbent Advantage), 35-65 = Battleground, &gt;65 = Severe Vulnerability.
              </Text>
            </div>
          </Stack>
        </Paper>

        {/* Section 3: Data Cleaning & Transformation */}
        <Paper p="sm" radius="md" withBorder>
          <Group gap="xs" mb="xs">
            <IconDatabase size={18} color="#10b981" />
            <Title order={5}>3. Data Cleaning & Transformation Pipeline</Title>
          </Group>
          <Text size="xs" c="dimmed" mb="xs">
            1. <strong>Form 20 Ingestion:</strong> Polling-booth level returns from ECI Form 20 were parsed, aggregating votes across EVM count + Postal ballots.
            <br />
            2. <strong>Delimitation Normalization:</strong> Assembly segment boundaries were reconciled against the 2008 Delimitation Commission Order to maintain temporal alignment across 2009, 2014, 2019, and 2024.
            <br />
            3. <strong>Census 2011 & 2024 Escalation:</strong> Demographic baselines from Census 2011 were projected forward using the official Karnataka Registrar General urban growth multiplier (1.232x).
          </Text>
        </Paper>

        {/* Section 4: Security & Performance */}
        <Paper p="sm" radius="md" withBorder>
          <Group gap="xs" mb="xs">
            <IconShieldLock size={18} color="#f59e0b" />
            <Title order={5}>4. Security & Performance Measures</Title>
          </Group>
          <Text size="xs" c="dimmed">
            • <strong>Client-Side Isolation:</strong> Zero external unvetted tracking scripts, sanitized CSV downloads avoiding formula injection (=, +, -, @ prefix protection).
            <br />
            • <strong>Optimized Rendering:</strong> Lazy component virtualization, memoized Recharts data transforms, and zero heavy backend latency overhead.
          </Text>
        </Paper>
      </Stack>
    </Modal>
  );
}

export default MethodologyModal;
