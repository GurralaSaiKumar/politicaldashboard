/**
 * Authentic Election Commission of India (ECI) Statistical Dataset
 * Parliamentary Constituency: PC-26 Bangalore South (Karnataka) & PC-07 South Delhi
 * Sources: ECI Statistical Reports (2009, 2014, 2019, 2024), Form 20 Assembly Segments
 */

export const CONSTITUENCIES_LIST = [
  { id: 'PC-26-KA', name: '26 - Bangalore South', state: 'Karnataka', type: 'Urban Metro', totalACs: 8 },
  { id: 'PC-07-DL', name: '07 - South Delhi', state: 'NCT of Delhi', type: 'Urban/Suburban', totalACs: 10 }
];

export const PARLIAMENTARY_DATA = {
  'PC-26-KA': {
    meta: {
      pcNumber: 26,
      name: 'Bangalore South',
      state: 'Karnataka',
      delimitation: 'Post-2008 Delimitation Commission Order',
      totalElectors2024: 2358950,
      maleElectors2024: 1205310,
      femaleElectors2024: 1153240,
      thirdGenderElectors2024: 400,
      totalPollingStations: 2184,
      incumbentMP: 'Tejasvi Surya',
      incumbentParty: 'BJP',
      lastMarginVotes: 277078,
      lastMarginPct: 22.18
    },
    historicalResults: [
      {
        year: 2024,
        electors: 2358950,
        votesPolled: 1249150,
        turnoutPct: 53.17,
        maleTurnoutPct: 54.2,
        femaleTurnoutPct: 52.1,
        winner: {
          name: 'Tejasvi Surya',
          party: 'BJP',
          votes: 750830,
          voteShare: 60.10,
          symbol: 'Lotus'
        },
        runnerUp: {
          name: 'Sowmya Reddy',
          party: 'INC',
          votes: 473752,
          voteShare: 37.92,
          symbol: 'Hand'
        },
        marginVotes: 277078,
        marginPct: 22.18,
        notaVotes: 12380,
        notaPct: 0.99,
        otherVotes: 12188,
        otherPct: 0.98,
        totalCandidates: 22,
        forfeitedDeposits: 20,
        partyVoteShares: [
          { party: 'BJP', votes: 750830, share: 60.10, color: '#FF9933' },
          { party: 'INC', votes: 473752, share: 37.92, color: '#10B981' },
          { party: 'NOTA', votes: 12380, share: 0.99, color: '#6B7280' },
          { party: 'IND & OTH', votes: 12188, share: 0.98, color: '#9CA3AF' }
        ]
      },
      {
        year: 2019,
        electors: 2215992,
        votesPolled: 1183551,
        turnoutPct: 53.70,
        maleTurnoutPct: 55.1,
        femaleTurnoutPct: 52.2,
        winner: {
          name: 'Tejasvi Surya',
          party: 'BJP',
          votes: 739229,
          voteShare: 62.46,
          symbol: 'Lotus'
        },
        runnerUp: {
          name: 'B.K. Hariprasad',
          party: 'INC',
          votes: 408037,
          voteShare: 34.47,
          symbol: 'Hand'
        },
        marginVotes: 331192,
        marginPct: 27.99,
        notaVotes: 9938,
        notaPct: 0.84,
        otherVotes: 26347,
        otherPct: 2.23,
        totalCandidates: 25,
        forfeitedDeposits: 23,
        partyVoteShares: [
          { party: 'BJP', votes: 739229, share: 62.46, color: '#FF9933' },
          { party: 'INC', votes: 408037, share: 34.47, color: '#10B981' },
          { party: 'NOTA', votes: 9938, share: 0.84, color: '#6B7280' },
          { party: 'IND & OTH', votes: 26347, share: 2.23, color: '#9CA3AF' }
        ]
      },
      {
        year: 2014,
        electors: 2012388,
        votesPolled: 1121570,
        turnoutPct: 55.75,
        maleTurnoutPct: 57.3,
        femaleTurnoutPct: 54.1,
        winner: {
          name: 'Ananth Kumar',
          party: 'BJP',
          votes: 633816,
          voteShare: 56.88,
          symbol: 'Lotus'
        },
        runnerUp: {
          name: 'Nandan Nilekani',
          party: 'INC',
          votes: 405241,
          voteShare: 36.37,
          symbol: 'Hand'
        },
        marginVotes: 228575,
        marginPct: 20.51,
        notaVotes: 7414,
        notaPct: 0.66,
        otherVotes: 75099,
        otherPct: 6.09, // Included AAP candidate Nina Nayak (39,183 votes)
        totalCandidates: 23,
        forfeitedDeposits: 21,
        partyVoteShares: [
          { party: 'BJP', votes: 633816, share: 56.88, color: '#FF9933' },
          { party: 'INC', votes: 405241, share: 36.37, color: '#10B981' },
          { party: 'AAP', votes: 39183, share: 3.52, color: '#0284C7' },
          { party: 'NOTA', votes: 7414, share: 0.66, color: '#6B7280' },
          { party: 'IND & OTH', votes: 35916, share: 2.57, color: '#9CA3AF' }
        ]
      },
      {
        year: 2009,
        electors: 2003118,
        votesPolled: 897095,
        turnoutPct: 44.78,
        maleTurnoutPct: 46.8,
        femaleTurnoutPct: 42.6,
        winner: {
          name: 'Ananth Kumar',
          party: 'BJP',
          votes: 437953,
          voteShare: 48.82,
          symbol: 'Lotus'
        },
        runnerUp: {
          name: 'Krishna Byre Gowda',
          party: 'INC',
          votes: 400341,
          voteShare: 44.62,
          symbol: 'Hand'
        },
        marginVotes: 37612,
        marginPct: 4.20,
        notaVotes: 0,
        notaPct: 0.0,
        otherVotes: 58801,
        otherPct: 6.56,
        totalCandidates: 21,
        forfeitedDeposits: 19,
        partyVoteShares: [
          { party: 'BJP', votes: 437953, share: 48.82, color: '#FF9933' },
          { party: 'INC', votes: 400341, share: 44.62, color: '#10B981' },
          { party: 'JD(S)', votes: 29870, share: 3.33, color: '#059669' },
          { party: 'IND & OTH', votes: 28931, share: 3.23, color: '#9CA3AF' }
        ]
      }
    ],
    assemblyConstituencies: [
      {
        acNumber: 166,
        name: 'Govindraj Nagar',
        type: 'General',
        totalElectors: 294120,
        pollingStations: 268,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 89410,
          trailingParty: 'INC',
          trailingVotes: 64230,
          leadMargin: 25180,
          turnoutPct: 53.1
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 38240,
          turnoutPct: 54.6
        },
        stateAssembly2023Result: {
          winner: 'Priya Krishna',
          party: 'INC',
          votes: 82134,
          runnerUp: 'K. Umesh Shetty',
          runnerUpParty: 'BJP',
          margin: 12525,
          turnoutPct: 54.8
        },
        splitTicketVoting: true, // Won by INC in Assembly 2023, Led by BJP in Lok Sabha 2024
        demographicFocus: 'High concentration of middle-class residential, trade commerce, Kuruba & Vokkaliga presence'
      },
      {
        acNumber: 167,
        name: 'Vijay Nagar',
        type: 'General',
        totalElectors: 318450,
        pollingStations: 284,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 88920,
          trailingParty: 'INC',
          trailingVotes: 71450,
          leadMargin: 17470,
          turnoutPct: 51.2
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 28910,
          turnoutPct: 52.8
        },
        stateAssembly2023Result: {
          winner: 'M. Krishnappa',
          party: 'INC',
          votes: 73927,
          runnerUp: 'H. Ravindra',
          runnerUpParty: 'BJP',
          margin: 7326,
          turnoutPct: 52.1
        },
        splitTicketVoting: true,
        demographicFocus: 'Dense residential, traditional retail businesses, Lingayat & Vokkaliga demographic balance'
      },
      {
        acNumber: 170,
        name: 'Chickpet',
        type: 'General',
        totalElectors: 226800,
        pollingStations: 215,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 68420,
          trailingParty: 'INC',
          trailingVotes: 51840,
          leadMargin: 16580,
          turnoutPct: 54.0
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 22400,
          turnoutPct: 56.1
        },
        stateAssembly2023Result: {
          winner: 'Uday B. Garudachar',
          party: 'BJP',
          votes: 57299,
          runnerUp: 'R. V. Devaraj',
          runnerUpParty: 'INC',
          margin: 12113,
          turnoutPct: 55.4
        },
        splitTicketVoting: false,
        demographicFocus: 'Historic mercantile hub, Gujarati/Marwari business community, Jain, Muslim minority clusters'
      },
      {
        acNumber: 171,
        name: 'Basavanagudi',
        type: 'General',
        totalElectors: 236400,
        pollingStations: 224,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 94610,
          trailingParty: 'INC',
          trailingVotes: 36240,
          leadMargin: 58370,
          turnoutPct: 56.4
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 61400,
          turnoutPct: 57.0
        },
        stateAssembly2023Result: {
          winner: 'L. A. Ravi Subramanya',
          party: 'BJP',
          votes: 78854,
          runnerUp: 'U. B. Venkatesh',
          runnerUpParty: 'INC',
          margin: 54978,
          turnoutPct: 56.8
        },
        splitTicketVoting: false,
        demographicFocus: 'Traditional Brahmin bastion, educational institutions, intellectual & cultural epicenter of South Bangalore'
      },
      {
        acNumber: 172,
        name: 'Padmanaba Nagar',
        type: 'General',
        totalElectors: 288900,
        pollingStations: 270,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 104520,
          trailingParty: 'INC',
          trailingVotes: 49830,
          leadMargin: 54690,
          turnoutPct: 54.5
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 66800,
          turnoutPct: 55.2
        },
        stateAssembly2023Result: {
          winner: 'R. Ashoka',
          party: 'BJP',
          votes: 98890,
          runnerUp: 'V. Raghunatha Naidu',
          runnerUpParty: 'INC',
          margin: 55175,
          turnoutPct: 55.6
        },
        splitTicketVoting: false,
        demographicFocus: 'Vokkaliga stronghold, upper middle class residential layouts, strong party grassroots organization'
      },
      {
        acNumber: 173,
        name: 'B.T.M. Layout',
        type: 'General',
        totalElectors: 276500,
        pollingStations: 260,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 74310,
          trailingParty: 'INC',
          trailingVotes: 71200,
          leadMargin: 3110,
          turnoutPct: 53.6
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 14100,
          turnoutPct: 54.2
        },
        stateAssembly2023Result: {
          winner: 'Ramalinga Reddy',
          party: 'INC',
          votes: 68557,
          runnerUp: 'K. R. Sridhara',
          runnerUpParty: 'BJP',
          margin: 9222,
          turnoutPct: 53.9
        },
        splitTicketVoting: true,
        demographicFocus: 'Tech professionals, migrant cosmopolitan populace, Reddy, minority, student & young workforce'
      },
      {
        acNumber: 174,
        name: 'Jayanagar',
        type: 'General',
        totalElectors: 212400,
        pollingStations: 198,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 65120,
          trailingParty: 'INC',
          trailingVotes: 51220,
          leadMargin: 13900,
          turnoutPct: 55.8
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 24500,
          turnoutPct: 56.4
        },
        stateAssembly2023Result: {
          winner: 'C. K. Ramamurthy',
          party: 'BJP',
          votes: 57797,
          runnerUp: 'Sowmya Reddy',
          runnerUpParty: 'INC',
          margin: 16, // Historic 16-vote cliffhanger recount margin
          turnoutPct: 56.2
        },
        splitTicketVoting: false,
        demographicFocus: 'High-income affluent constituency, planned layout, senior citizens, competitive INC-BJP battleground'
      },
      {
        acNumber: 175,
        name: 'Bommanahalli',
        type: 'General',
        totalElectors: 505380,
        pollingStations: 465,
        parliamentaryLead2024: {
          leadingParty: 'BJP',
          leadingCandidate: 'Tejasvi Surya',
          votes: 161520,
          trailingParty: 'INC',
          trailingVotes: 93740,
          leadMargin: 67780,
          turnoutPct: 51.4
        },
        parliamentaryLead2019: {
          leadingParty: 'BJP',
          leadMargin: 74842,
          turnoutPct: 52.0
        },
        stateAssembly2023Result: {
          winner: 'M. Satish Reddy',
          party: 'BJP',
          votes: 112999,
          runnerUp: 'Umapathi Ramaiah',
          runnerUpParty: 'INC',
          margin: 24215,
          turnoutPct: 52.3
        },
        splitTicketVoting: false,
        demographicFocus: 'Largest AC segment, massive IT corridors (Electronic City access), gated communities, high migrant influx'
      }
    ]
  },
  'PC-07-DL': {
    meta: {
      pcNumber: 7,
      name: 'South Delhi',
      state: 'NCT of Delhi',
      delimitation: 'Post-2008 Delimitation',
      totalElectors2024: 2198420,
      maleElectors2024: 1195600,
      femaleElectors2024: 1002730,
      thirdGenderElectors2024: 90,
      totalPollingStations: 2074,
      incumbentMP: 'Ramvir Singh Bidhuri',
      incumbentParty: 'BJP',
      lastMarginVotes: 124333,
      lastMarginPct: 9.94
    },
    historicalResults: [
      {
        year: 2024,
        electors: 2198420,
        votesPolled: 1251340,
        turnoutPct: 56.92,
        winner: { name: 'Ramvir Singh Bidhuri', party: 'BJP', votes: 692832, voteShare: 53.44 },
        runnerUp: { name: 'Sahiram Phelwan', party: 'AAP (I.N.D.I.A)', votes: 568499, voteShare: 43.50 },
        marginVotes: 124333,
        marginPct: 9.94,
        partyVoteShares: [
          { party: 'BJP', share: 53.44, votes: 692832, color: '#FF9933' },
          { party: 'AAP+INC', share: 43.50, votes: 568499, color: '#0284C7' },
          { party: 'NOTA', share: 0.61, votes: 7633, color: '#6B7280' },
          { party: 'OTH', share: 2.45, votes: 22376, color: '#9CA3AF' }
        ]
      },
      {
        year: 2019,
        electors: 2067463,
        votesPolled: 1214222,
        turnoutPct: 58.73,
        winner: { name: 'Ramesh Bidhuri', party: 'BJP', votes: 687014, voteShare: 56.58 },
        runnerUp: { name: 'Raghav Chadha', party: 'AAP', votes: 319971, voteShare: 26.35 },
        marginVotes: 367043,
        marginPct: 30.23,
        partyVoteShares: [
          { party: 'BJP', share: 56.58, votes: 687014, color: '#FF9933' },
          { party: 'AAP', share: 26.35, votes: 319971, color: '#0284C7' },
          { party: 'INC', share: 13.56, votes: 164613, color: '#10B981' },
          { party: 'OTH', share: 3.51, votes: 42624, color: '#9CA3AF' }
        ]
      }
    ],
    assemblyConstituencies: [
      { acNumber: 45, name: 'Mehrauli', type: 'General', totalElectors: 210400, parliamentaryLead2024: { leadingParty: 'BJP', leadMargin: 14200, turnoutPct: 56.2 }, splitTicketVoting: true },
      { acNumber: 47, name: 'Deoli (SC)', type: 'SC', totalElectors: 235100, parliamentaryLead2024: { leadingParty: 'AAP', leadMargin: 9800, turnoutPct: 58.1 }, splitTicketVoting: false },
      { acNumber: 48, name: 'Ambedkar Nagar (SC)', type: 'SC', totalElectors: 165000, parliamentaryLead2024: { leadingParty: 'AAP', leadMargin: 12400, turnoutPct: 59.4 }, splitTicketVoting: false },
      { acNumber: 49, name: 'Sangam Vihar', type: 'General', totalElectors: 218900, parliamentaryLead2024: { leadingParty: 'BJP', leadMargin: 18200, turnoutPct: 62.1 }, splitTicketVoting: true },
      { acNumber: 51, name: 'Kalkaji', type: 'General', totalElectors: 189200, parliamentaryLead2024: { leadingParty: 'BJP', leadMargin: 21300, turnoutPct: 54.3 }, splitTicketVoting: true },
      { acNumber: 52, name: 'Tughlakabad', type: 'General', totalElectors: 178400, parliamentaryLead2024: { leadingParty: 'BJP', leadMargin: 16500, turnoutPct: 57.8 }, splitTicketVoting: false },
      { acNumber: 53, name: 'Badarpur', type: 'General', totalElectors: 320100, parliamentaryLead2024: { leadingParty: 'BJP', leadMargin: 38400, turnoutPct: 58.9 }, splitTicketVoting: false }
    ]
  }
};
