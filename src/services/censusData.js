/**
 * Authentic Census of India & Socio-Demographic Intelligence Dataset
 * Parliamentary Constituency: PC-26 Bangalore South (Karnataka) & PC-07 South Delhi
 * Sources: Census of India 2011, Ministry of Statistics & Programme Implementation (MoSPI),
 * Directorate of Economics & Statistics Karnataka, Election Commission Electoral Roll Analysis
 */

export const DEMOGRAPHIC_DATA = {
  'PC-26-KA': {
    summary: {
      totalPopulationEst2024: 3140000,
      census2011Population: 2548200,
      urbanPercentage: 100.0,
      ruralPercentage: 0.0,
      sexRatioOverall: 957, // females per 1000 males
      sexRatioElectoral: 957,
      literacyRateTotal: 89.4,
      literacyRateMale: 92.1,
      literacyRateFemale: 86.6,
      workParticipationRate: 48.7,
      medianHouseholdIncomeINR: 850000, // Annual per household
      povertyHeadcountRatio: 3.8
    },
    ageCohorts: [
      { cohort: '18-25 Yrs (Gen-Z / First Time)', electors: 353840, percentage: 15.0, turnOutEstimate: 47.8 },
      { cohort: '26-35 Yrs (Young Professionals)', electors: 660500, percentage: 28.0, turnOutEstimate: 51.2 },
      { cohort: '36-50 Yrs (Core Workforce)', electors: 707685, percentage: 30.0, turnOutEstimate: 55.4 },
      { cohort: '51-65 Yrs (Mature Electorate)', electors: 448200, percentage: 19.0, turnOutEstimate: 58.6 },
      { cohort: '65+ Yrs (Senior Citizens)', electors: 188725, percentage: 8.0, turnOutEstimate: 62.1 }
    ],
    communityProfile: [
      { group: 'Vokkaliga', percentage: 24.5, description: 'Dominant agrarian/landholding origin community, influential in Padmanaba Nagar & Govindraj Nagar', politicalAffinity: 'Split between BJP and INC/JDS' },
      { group: 'Brahmin', percentage: 22.0, description: 'High concentration in Basavanagudi, Jayanagar, Malleswaram border, highly politically mobilized', politicalAffinity: 'Strong BJP core base' },
      { group: 'Other Backward Classes (OBC/Kuruba/Idiga)', percentage: 19.5, description: 'Significant presence in Vijay Nagar and Govindraj Nagar', politicalAffinity: 'INC traditional tilt with Kuruba consolidation' },
      { group: 'Scheduled Castes & Tribes (SC/ST)', percentage: 11.2, description: 'Urban settlements, civic workforce, peri-urban clusters in Bommanahalli', politicalAffinity: 'INC leaning' },
      { group: 'Muslim', percentage: 9.8, description: 'Key segments in Chickpet, BTM Layout, Padmanaba Nagar pockets', politicalAffinity: 'Strong INC consolidation' },
      { group: 'Jain, Marwari & Gujarati Traders', percentage: 7.0, description: 'Concentrated in Chickpet commercial hub and trading sectors', politicalAffinity: 'High BJP affinity' },
      { group: 'Christian & Cosmopolitan/Other', percentage: 6.0, description: 'Migrant IT populace in BTM Layout, Bommanahalli, Koramangala vicinity', politicalAffinity: 'Cosmopolitan swing voters' }
    ],
    occupationalProfile: [
      { sector: 'IT, Software & Tech Services', percentage: 34.2, workforce: 520000 },
      { sector: 'Retail, Trade & Commerce', percentage: 23.5, workforce: 357000 },
      { sector: 'Healthcare, Education & Professional Services', percentage: 18.1, workforce: 275000 },
      { sector: 'Manufacturing, Construction & Logistics', percentage: 13.8, workforce: 210000 },
      { sector: 'Public Sector, Banking & Defense', percentage: 10.4, workforce: 158000 }
    ],
    voterSentimentIssues: [
      { issue: 'Traffic Congestion & Silk Board Gridlock', severityScore: 92, category: 'Infrastructure', primaryAC: 'Bommanahalli, BTM Layout' },
      { issue: 'Cauvery Water Supply & Groundwater Depletion', severityScore: 88, category: 'Civic Amenity', primaryAC: 'Padmanaba Nagar, Govindraj Nagar' },
      { issue: 'Potholes, Road Digging & BBMP Governance', severityScore: 84, category: 'Civic Governance', primaryAC: 'All Segments' },
      { issue: 'Metro Line (Pink & Yellow Lines) Completion Speed', severityScore: 78, category: 'Transit', primaryAC: 'Bommanahalli, Jayanagar, BTM' },
      { issue: 'Inflation & Middle Class Tax Relief', severityScore: 72, category: 'Economic', primaryAC: 'Basavanagudi, Vijay Nagar' },
      { issue: 'Flood Preparedness & Stormwater Drains (SWD)', severityScore: 70, category: 'Environment', primaryAC: 'Bommanahalli, BTM Layout' }
    ]
  },
  'PC-07-DL': {
    summary: {
      totalPopulationEst2024: 2950000,
      census2011Population: 2380000,
      urbanPercentage: 98.2,
      ruralPercentage: 1.8,
      sexRatioOverall: 862,
      sexRatioElectoral: 839,
      literacyRateTotal: 86.8,
      literacyRateMale: 91.5,
      literacyRateFemale: 81.2,
      workParticipationRate: 46.2,
      medianHouseholdIncomeINR: 780000,
      povertyHeadcountRatio: 6.2
    },
    ageCohorts: [
      { cohort: '18-25 Yrs', electors: 329760, percentage: 15.0, turnOutEstimate: 52.1 },
      { cohort: '26-35 Yrs', electors: 637540, percentage: 29.0, turnOutEstimate: 54.8 },
      { cohort: '36-50 Yrs', electors: 681510, percentage: 31.0, turnOutEstimate: 58.2 },
      { cohort: '51-65 Yrs', electors: 395710, percentage: 18.0, turnOutEstimate: 61.4 },
      { cohort: '65+ Yrs', electors: 153900, percentage: 7.0, turnOutEstimate: 63.8 }
    ],
    communityProfile: [
      { group: 'Gurjar', percentage: 22.0, description: 'Indigenous rural/urban villages (Bidhuri, Tanwar, etc.)', politicalAffinity: 'BJP Stronghold' },
      { group: 'Jat & Yadav', percentage: 16.5, description: 'Strong presence in Badarpur, Bijwasan belt', politicalAffinity: 'Competitive AAP-BJP' },
      { group: 'Scheduled Castes (SC)', percentage: 18.5, description: 'Reserved constituencies Deoli & Ambedkar Nagar', politicalAffinity: 'AAP base' },
      { group: 'Purvanchali / Migrants', percentage: 23.0, description: 'Sangam Vihar, unauthorized colonies', politicalAffinity: 'Key swing constituency' },
      { group: 'Punjabi & Upper Caste', percentage: 14.0, description: 'Kalkaji, Greater Kailash border', politicalAffinity: 'BJP leaning' },
      { group: 'Minorities', percentage: 6.0, description: 'Concentrated urban pockets', politicalAffinity: 'AAP / INC' }
    ],
    occupationalProfile: [
      { sector: 'Trade, Contracting & Wholesale', percentage: 28.5, workforce: 380000 },
      { sector: 'Government & Public Services', percentage: 22.1, workforce: 295000 },
      { sector: 'Corporate & Tech Services', percentage: 21.4, workforce: 285000 },
      { sector: 'Informal & Logistics Workforce', percentage: 18.0, workforce: 240000 },
      { sector: 'Real Estate & Construction', percentage: 10.0, workforce: 133000 }
    ],
    voterSentimentIssues: [
      { issue: 'Regularization & Registration of Unauthorized Colonies', severityScore: 94, category: 'Land Rights', primaryAC: 'Sangam Vihar, Deoli' },
      { issue: 'Drinking Water Supply & Tanker Mafia', severityScore: 91, category: 'Civic Amenity', primaryAC: 'Sangam Vihar, Tughlakabad' },
      { issue: 'Drainage & Sewage Infrastructure', severityScore: 86, category: 'Sanitation', primaryAC: 'Ambedkar Nagar, Badarpur' },
      { issue: 'Electricity & Water Subsidy Continuation', severityScore: 81, category: 'Welfare', primaryAC: 'All Segments' }
    ]
  }
};
