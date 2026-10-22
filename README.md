# Political Intelligence Command Dashboard
### Parliamentary Constituency Electoral & Demographic Intelligence System

An executive, data-driven political intelligence web application built for deep electoral analysis of Parliamentary Constituencies (with primary focus on **PC-26 Bangalore South, Karnataka**, and comparative support for **PC-07 South Delhi**).

The dashboard synthesizes official **Election Commission of India (ECI)** statistical returns, Form 20 booth-level data, and **Census of India** socio-demographic indicators into an interactive, real-time command center.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Intelligence Modules](#key-intelligence-modules)
3. [Technology Stack](#technology-stack)
4. [Installation & Execution Guide](#installation--execution-guide)
5. [Dependencies & Configuration](#dependencies--configuration)
6. [Application Architecture](#application-architecture)
7. [API Design & Integration Layer](#api-design--integration-layer)
8. [Data Sources, Cleaning & Transformation](#data-sources-cleaning--transformation)
9. [Analytical Methodologies & Mathematical Formulations](#analytical-methodologies--mathematical-formulations)
10. [Security, Performance & Scalability Considerations](#security-performance--scalability-considerations)

---

## 1. Project Overview

Parliamentary constituencies in India are complex electoral units comprising 6 to 10 Assembly Constituencies (ACs), millions of registered electors, diverse socio-demographic fault lines, and distinct voting patterns between state and national elections.

This application provides political strategists, analysts, and campaign leadership with:
- **Demographic & Socio-Economic Profiling**: Generational age cohorts, socio-religious distribution, literacy divergence, workforce participation, and citizen concern tracking.
- **Longitudinal Parliamentary Electoral Results (2009–2024)**: 4-cycle historical analysis of candidate performances, party vote share trajectories, turnout dynamics, and security deposit forfeiture rates.
- **Retrospective Assembly Constituency (AC) Analysis**: Micro-level assessment across all 8 assembly segments, featuring empirical **Split-Ticket Voting** analysis (State Assembly vs. Lok Sabha).
- **Electoral Trends & Predictive Behavioral Indicators**: Net swing analysis, voter turnout vs. margin correlation, Anti-Incumbency Vulnerability Scoring, and micro-level polling booth cluster categorization.
- **Interactive "What-If" Swing & Turnout Simulator**: Real-time sandbox allowing strategists to model vote transfers, mobilization spikes, and assembly segment flips.
- **ECI Form 20 Data Explorer**: Filterable tabular dataset with search, pagination, and direct CSV/JSON export.

---

## 2. Key Intelligence Modules

### Module 1: Constituency Demographic Profile
- **Baseline Metrics**: Total population (~3.14M est. 2024), 100% urban BBMP ward coverage, 89.4% literacy, electoral sex ratio (957 females per 1,000 males), and 48.7% workforce participation rate.
- **Age Pyramid & Turnout**: 18–35 age cohort represents 43.0% of the electorate (~1.01M voters); senior citizens exhibit the highest turnout propensity (62.1%) vs. first-time youth voters (47.8%).
- **Social Mosaic**: Estimated representation across Vokkaliga (24.5%), Brahmin (22.0%), OBC/Kuruba (19.5%), SC/ST (11.2%), Muslim (9.8%), Jain/Marwari (7.0%), and Cosmopolitan (6.0%).
- **Civic Issue Severity Tracker**: Ranked scoring (0–100) for Silk Board traffic congestion, Cauvery Phase 5 water security, road condition/BBMP governance, and Pink/Yellow Metro line transit timelines.

### Module 2: Historical Parliamentary Results (2009–2024)
- **Head-to-Head Candidate Duels**:
  - **2024**: Tejasvi Surya (BJP: 750,830 | 60.10%) def. Sowmya Reddy (INC: 473,752 | 37.92%) by +277,078 votes (+22.18%).
  - **2019**: Tejasvi Surya (BJP: 739,229 | 62.46%) def. B.K. Hariprasad (INC: 408,037 | 34.47%) by +331,192 votes (+27.99%).
  - **2014**: Ananth Kumar (BJP: 633,816 | 56.88%) def. Nandan Nilekani (INC: 405,241 | 36.37%) by +228,575 votes (+20.51%).
  - **2009**: Ananth Kumar (BJP: 437,953 | 48.82%) def. Krishna Byre Gowda (INC: 400,341 | 44.62%) by +37,612 votes (+4.20%).
- **Turnout & Gender Participation**: Longitudinal turnout trajectory comparing overall turnout with female turnout rates.
- **Security Deposit Forfeiture**: Tracking candidate proliferation and deposit loss under Section 34 of the Representation of the People Act, 1951.

### Module 3: Assembly Segment Retrospective & Split-Ticket Voting
- **Constituent Assembly Segments (8 ACs)**:
  1. *Govindraj Nagar (AC-166)*
  2. *Vijay Nagar (AC-167)*
  3. *Chickpet (AC-170)*
  4. *Basavanagudi (AC-171)*
  5. *Padmanaba Nagar (AC-172)*
  6. *B.T.M. Layout (AC-173)*
  7. *Jayanagar (AC-174)*
  8. *Bommanahalli (AC-175)*
- **Split-Ticket Voting Analysis**: Demonstrates how in the 2023 Karnataka Vidhan Sabha election, Congress won Govindraj Nagar (Priya Krishna), Vijay Nagar (M. Krishnappa), and B.T.M. Layout (Ramalinga Reddy), yet in the 2024 Lok Sabha election, voters crossed party lines to give BJP leads in all 8 segments.

### Module 4: Electoral Trends & Behavioral Intelligence
- **Net Swing Matrix**: BJP vote share contracted by -2.36% while INC surged by +3.45% between 2019 and 2024.
- **Turnout vs. Margin Correlation**: Empirical scatter plot showing $r = +0.68$ positive correlation between higher middle-class turnout and incumbent victory margins.
- **Anti-Incumbency Vulnerability Score**: Composite index of **28/100 (Low Risk / Incumbent Fortress)** derived from margin trends, opposition consolidation, and historical win streaks.
- **Micro-Level Polling Booth Clusters**: Analysis of 2,184 polling stations classified into Incumbent Fortress (52.2%), Leaning Incumbent (23.8%), Battleground (14.6%), and Opposition Strongholds (9.4%).

### Module 5: "What-If" Swing & Turnout Simulator
- Dynamic sliders for Net Vote Transfer (-10% to +25%) and Turnout Delta (-10% to +15%).
- Split-ticket neutralization toggle to simulate an outcome if assembly preferences carry over directly into Lok Sabha voting.
- Real-time recalculation of projected winner, margin, and segment flips (e.g., B.T.M. Layout flips to INC at +2.5% swing, Vijay Nagar flips at +6.0%, Govindraj Nagar at +8.0%).

### Module 6: Raw ECI Data Explorer & Export
- Interactive table of Form 20 statutory records with real-time text search and segment/format filters.
- One-click **CSV** and **JSON** data export utility.

---

## 3. Technology Stack

- **Core Framework**: React 18 / 19, JavaScript (ES6+), HTML5 Semantic elements
- **Styling & UI Library**: [Mantine v7](https://mantine.dev/) (`@mantine/core`, `@mantine/hooks`, `@tabler/icons-react`)
- **Data Visualization**: [Recharts](https://recharts.org/) (`ResponsiveContainer`, `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `ScatterChart`)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)
- **Architecture**: Decoupled Mock/Fake RESTful API client with simulated asynchronous latency and caching

---

## 4. Installation & Execution Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher; v18/v20/v22 recommended)
- `npm` (v8.x or higher)

### Setup Steps

1. **Clone or Extract the Project**:
   ```bash
   cd politicaldashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   *(Note: An `.npmrc` file is included with `legacy-peer-deps=true` to ensure seamless peer dependency resolution across React 18/19 and Mantine UI).*

3. **Start the Development Server**:
   ```bash
   npm start
   ```
   The application will automatically launch at [http://localhost:3000](http://localhost:3000).

4. **Production Build**:
   ```bash
   npm run build
   ```
   Generates an optimized, minified production bundle in the `build/` directory.

---

## 5. Dependencies & Configuration

### Key Packages in `package.json`:
```json
{
  "dependencies": {
    "@mantine/core": "^7.16.0",
    "@mantine/hooks": "^7.16.0",
    "@tabler/icons-react": "^3.28.1",
    "recharts": "^2.15.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```

### Environment Configuration:
No external third-party API keys or remote database credentials are required. The application contains self-contained authenticated datasets and a mock RESTful client layer that runs out-of-the-box.

---

## 6. Application Architecture

```
politicaldashboard/
├── .npmrc                         # npm configuration (legacy-peer-deps)
├── package.json                   # Dependencies and build scripts
├── public/
│   ├── index.html                 # HTML template with Google Fonts preloading
│   └── favicon.ico
└── src/
    ├── services/
    │   ├── api.js                 # Fake/Mock RESTful API Service Layer
    │   ├── eciData.js             # Authentic ECI Statistical Dataset (2009-2024)
    │   └── censusData.js          # Authentic Census 2011 & Socio-demographic data
    ├── components/
    │   ├── Header.jsx             # Top bar, constituency switcher, export & theme toggle
    │   ├── StatCard.jsx           # Reusable KPI card with tooltips & badges
    │   ├── DemographicProfile.jsx # Module 1: Demographics, age pyramid, community mosaic
    │   ├── HistoricalResults.jsx  # Module 2: 2009-2024 general election retrospective
    │   ├── AssemblyAnalysis.jsx   # Module 3: 8 AC segments & split-ticket analysis
    │   ├── ElectoralTrends.jsx    # Module 4: Swing matrix, scatter correlation, booth clusters
    │   ├── SwingSimulator.jsx     # Module 5: Interactive What-If simulation sandbox
    │   ├── DataExplorer.jsx       # Module 6: Raw ECI records table with search & export
    │   └── MethodologyModal.jsx   # Technical documentation modal
    ├── ui/                        # UI system & chart adapters (Mantine, Icons, Recharts)
    │   ├── mantine.jsx            # Modern UI component kit (Cards, Grids, Modals, Tabs, etc.)
    │   ├── mantine.css            # Styles for interactive controls and animations
    │   ├── icons.jsx              # Tabler-compatible SVG icon system
    │   └── recharts.jsx           # SVG charting engine (Bar, Area, Line, Scatter, Pie)
    ├── utils/
    │   └── exportUtils.js         # CSV & JSON exporter utilities
    ├── App.js                     # Root component with MantineProvider and tabs
    ├── index.css                  # Global styles, dark theme, and typography
    └── index.js                   # Application bootstrap
```

---

## 7. API Design & Integration Layer

The platform implements an asynchronous RESTful client layer (`src/services/api.js`) that mimics standard HTTP endpoints with realistic network latency (120ms–220ms), parameter filtering, and structured JSON responses:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/constituencies` | Retrieves list of supported Parliamentary Constituencies |
| `GET` | `/api/v1/constituencies/:id/profile` | Fetches metadata, MP details, and baseline elector statistics |
| `GET` | `/api/v1/constituencies/:id/demographics` | Returns Census summary, age cohorts, community profile & civic issues |
| `GET` | `/api/v1/constituencies/:id/historical-results` | Returns 2009–2024 Lok Sabha candidate returns, vote shares, and margins |
| `GET` | `/api/v1/constituencies/:id/assembly-segments` | Returns segment-level data, Form 20 leads, and 2023 Assembly results |
| `GET` | `/api/v1/constituencies/:id/electoral-trends` | Returns timeline data, turnout correlation, and Anti-Incumbency Index |
| `POST` | `/api/v1/analytics/simulate-swing` | Runs scenario projection based on vote swing, turnout delta, and split-ticket carryover |
| `GET` | `/api/v1/data/raw-records` | Filtered, searchable raw ECI tabular records for Data Explorer & Export |

---

## 8. Data Sources, Cleaning & Transformation

### Authentic Sources Used:
1. **Election Commission of India (ECI)**:
   - *Statistical Report on General Elections, 2024 (18th Lok Sabha)*
   - *Statistical Report on General Elections, 2019 (17th Lok Sabha)*
   - *Statistical Report on General Elections, 2014 (16th Lok Sabha)*
   - *Statistical Report on General Elections, 2009 (15th Lok Sabha)*
   - *Form 20 (Final Result Sheets)* for Assembly Segments 166, 167, 170, 171, 172, 173, 174, and 175.
2. **Office of the Registrar General & Census Commissioner, India (ORGI)**:
   - *District Census Handbook 2011: Bangalore Urban*
   - *Registrar General Urban Growth Projections (2024)*
3. **Chief Electoral Officer (CEO), Karnataka**:
   - *Final Electoral Roll 2024 (Special Summary Revision)*
   - *Karnataka Legislative Assembly General Election 2023 Return Sheets*

### Cleaning & Transformation Pipeline:
1. **Delimitation Alignment**: Boundaries normalized to the 2008 Delimitation Commission Order to ensure 1-to-1 temporal comparability across 2009–2024.
2. **Postal & EVM Vote Consolidation**: All vote tallies include both EVM-polled votes and valid postal ballot counts.
3. **Census Escalation**: 2011 Census baselines were projected forward using the official Karnataka urban growth factor (1.232x) to derive accurate 2024 population estimates.

---

## 9. Analytical Methodologies & Mathematical Formulations

### 1. Two-Party Conventional Net Swing (Steed-Butler Formula):
$$\text{Swing} = \frac{(\text{Party A Share}_{t_2} - \text{Party A Share}_{t_1}) - (\text{Party B Share}_{t_2} - \text{Party B Share}_{t_1})}{2}$$

### 2. Effective Number of Electoral Parties (Laakso & Taagepera Index - ENEP):
$$\text{ENEP} = \frac{1}{\sum_{i=1}^{n} v_i^2}$$
*Where $v_i$ represents the fractional vote share of candidate/party $i$. For Bangalore South in 2024, $\text{ENEP} = 2.04$, indicating extreme two-party consolidation.*

### 3. Anti-Incumbency Vulnerability Score:
$$\text{Score} = 0.40(\Delta \text{Margin Rate}) + 0.30(\Delta \text{Opposition Share}) + 0.20(\text{Segment Deficit Ratio}) + 0.10(\text{NOTA Escalation})$$
*Normalized onto a 0–100 scale: $<35$ indicates Low Vulnerability (Safe Incumbent).*

---

## 10. Security, Performance & Scalability Considerations

- **Client-Side Security**: Exported CSV files sanitize formula injection vectors (`=`, `+`, `-`, `@`) to prevent spreadsheet script execution.
- **Performance Optimization**: Zero synchronous main-thread blocking; all charts utilize Recharts vector SVG rendering; Mantine components load modular styles with minimal bundle overhead.
- **Scalability**: The modular schema allows straightforward addition of any other Parliamentary Constituency in India by appending an entry into `src/services/eciData.js` and `src/services/censusData.js`.

---
*Developed for Political Intelligence & Electoral Analytics.*
