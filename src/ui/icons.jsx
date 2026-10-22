import React from 'react';

const createIcon = (svgPath) => ({ size = 20, color = 'currentColor', stroke = 2, style = {}, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    {...props}
  >
    {svgPath}
  </svg>
);

export const IconSun = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </>
);

export const IconMoon = createIcon(
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
);

export const IconDatabase = createIcon(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </>
);

export const IconFileSpreadsheet = createIcon(
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
    <path d="M8 11h8M8 15h8M11 11v6" />
  </>
);

export const IconInfoCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </>
);

export const IconBuildingArch = createIcon(
  <>
    <path d="M3 21h18M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M8 21v-4a4 4 0 0 1 8 0v4" />
  </>
);

export const IconCheck = createIcon(
  <polyline points="20 6 9 17 4 12" />
);

export const IconUsers = createIcon(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

export const IconBuildingSkyscraper = createIcon(
  <>
    <path d="M3 21h18M5 21V7l8-4v18M13 21V9l6 3v9M9 9h1M9 13h1M9 17h1M16 13h1M16 17h1" />
  </>
);

export const IconSchool = createIcon(
  <>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </>
);

export const IconGenderFemale = createIcon(
  <>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7M9 18h6" />
  </>
);

export const IconBriefcase = createIcon(
  <>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </>
);

export const IconAlertCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </>
);

export const IconTrophy = createIcon(
  <>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
    <path d="M18 4H6v7a6 6 0 0 0 12 0V4z" />
  </>
);

export const IconChartLine = createIcon(
  <>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </>
);

export const IconFlame = createIcon(
  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
);

export const IconArrowUpRight = createIcon(
  <>
    <line x1="7" x2="17" y1="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </>
);

export const IconArrowDownRight = createIcon(
  <>
    <line x1="7" x2="17" y1="7" y2="17" />
    <polyline points="17 7 17 17 7 17" />
  </>
);

export const IconArrowsExchange = createIcon(
  <>
    <path d="M7 10h14l-4-4M17 14H3l4 4" />
  </>
);

export const IconChartBar = createIcon(
  <>
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </>
);

export const IconShieldCheck = createIcon(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </>
);

export const IconAlertTriangle = createIcon(
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </>
);

export const IconMapPin = createIcon(
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>
);

export const IconTrendingUp = createIcon(
  <>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </>
);

export const IconTrendingDown = createIcon(
  <>
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </>
);

export const IconChartScatter = createIcon(
  <>
    <circle cx="8" cy="8" r="2" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="12" cy="14" r="2" />
    <circle cx="18" cy="16" r="2" />
    <circle cx="6" cy="17" r="2" />
    <path d="M3 3v18h18" />
  </>
);

export const IconShieldLock = createIcon(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <rect width="6" height="4" x="9" y="11" rx="1" />
    <path d="M10 11V9a2 2 0 1 1 4 0v2" />
  </>
);

export const IconGauge = createIcon(
  <>
    <path d="m12 14 4-4" />
    <path d="M3.34 17a10 10 0 1 1 17.32 0" />
  </>
);

export const IconBuildingStore = createIcon(
  <>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4M2 7h20" />
  </>
);

export const IconAdjustments = createIcon(
  <>
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" />
    <line x1="9" x2="15" y1="8" y2="8" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </>
);

export const IconSparkles = createIcon(
  <>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </>
);

export const IconRefresh = createIcon(
  <>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </>
);

export const IconSearch = createIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </>
);

export const IconFilter = createIcon(
  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
);

export const IconExternalLink = createIcon(
  <>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
  </>
);

export const IconFileCertificate = createIcon(
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v4" />
    <circle cx="10" cy="16" r="3" />
    <path d="M12.5 18.5 14 21l-2-.5-2 .5 1.5-2.5" />
  </>
);

export const IconMathFunction = createIcon(
  <>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M9 17c2 0 2.5-1 2.5-2.5V9.5C11.5 8 12 7 14 7" />
    <line x1="8" x2="14" y1="12" y2="12" />
  </>
);

export const IconHistory = createIcon(
  <>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5M12 7v5l4 2" />
  </>
);
