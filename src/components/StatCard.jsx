import React from 'react';
import { Paper, Group, Text, Badge, Tooltip, rem, useMantineColorScheme } from '../ui/mantine';
import { IconInfoCircle } from '../ui/icons';

export function StatCard({
  title,
  value,
  subvalue,
  icon: Icon,
  badgeText,
  badgeColor = 'blue',
  tooltip,
  accentColor = '#3b82f6'
}) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper
      p="md"
      radius="md"
      withBorder
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        borderLeft: `4px solid ${accentColor}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      <Group justify="space-between" align="flex-start" mb="xs">
        <Group gap="xs">
          <Text size="xs" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {title}
          </Text>
          {tooltip && (
            <Tooltip label={tooltip} multiline w={220} withArrow position="top">
              <span style={{ display: 'inline-flex', cursor: 'pointer' }}>
                <IconInfoCircle size={14} color="#94a3b8" />
              </span>
            </Tooltip>
          )}
        </Group>
        {Icon && (
          <Paper
            p={6}
            radius="md"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={18} />
          </Paper>
        )}
      </Group>

      <Group align="baseline" gap="sm">
        <Text style={{ fontSize: rem(26), fontWeight: 800, lineHeight: 1.1 }}>
          {value}
        </Text>
        {badgeText && (
          <Badge color={badgeColor} variant="light" size="sm">
            {badgeText}
          </Badge>
        )}
      </Group>

      {subvalue && (
        <Text size="xs" c="dimmed" mt={6}>
          {subvalue}
        </Text>
      )}
    </Paper>
  );
}

export default StatCard;
