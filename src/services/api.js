/**
 * Mock / Fake RESTful API Service Layer
 * Simulates real network latency, REST endpoints, querying, caching, and aggregation
 * Conforms to OpenAPI / ECI data specification
 */

import { CONSTITUENCIES_LIST, PARLIAMENTARY_DATA } from './eciData';
import { DEMOGRAPHIC_DATA } from './censusData';

// Simulated network delay
const delay = (ms = 180) => new Promise(resolve => setTimeout(resolve, ms));

class PoliticalIntelligenceApi {
  /**
   * GET /api/v1/constituencies
   */
  async getConstituencies() {
    await delay(120);
    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: CONSTITUENCIES_LIST
    };
  }

  /**
   * GET /api/v1/constituencies/:id/profile
   */
  async getConstituencyProfile(constituencyId = 'PC-26-KA') {
    await delay(150);
    const eci = PARLIAMENTARY_DATA[constituencyId];
    const census = DEMOGRAPHIC_DATA[constituencyId];

    if (!eci || !census) {
      throw new Error(`Constituency with ID ${constituencyId} not found`);
    }

    return {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        meta: eci.meta,
        demographicSummary: census.summary,
        latestResult: eci.historicalResults[0]
      }
    };
  }

  /**
   * GET /api/v1/constituencies/:id/demographics
   */
  async getDemographics(constituencyId = 'PC-26-KA') {
    await delay(180);
    const data = DEMOGRAPHIC_DATA[constituencyId];
    if (!data) throw new Error('Demographic data not found');

    return {
      status: 'success',
      data: {
        summary: data.summary,
        ageCohorts: data.ageCohorts,
        communityProfile: data.communityProfile,
        occupationalProfile: data.occupationalProfile,
        voterSentimentIssues: data.voterSentimentIssues
      }
    };
  }

  /**
   * GET /api/v1/constituencies/:id/historical-results
   */
  async getHistoricalResults(constituencyId = 'PC-26-KA', year = null) {
    await delay(200);
    const pc = PARLIAMENTARY_DATA[constituencyId];
    if (!pc) throw new Error('Constituency data not found');

    let results = pc.historicalResults;
    if (year) {
      results = results.filter(r => r.year === parseInt(year, 10));
    }

    // Compute derived metrics: Swing from prior election
    const enrichedResults = results.map((result, idx) => {
      const prevResult = results[idx + 1];
      let bjpSwing = null;
      let incSwing = null;
      let turnoutSwing = null;

      if (prevResult) {
        const prevBjp = prevResult.partyVoteShares.find(p => p.party === 'BJP')?.share || 0;
        const currBjp = result.partyVoteShares.find(p => p.party === 'BJP')?.share || 0;
        bjpSwing = +(currBjp - prevBjp).toFixed(2);

        const prevInc = prevResult.partyVoteShares.find(p => p.party === 'INC')?.share || 0;
        const currInc = result.partyVoteShares.find(p => p.party === 'INC')?.share || 0;
        incSwing = +(currInc - prevInc).toFixed(2);

        turnoutSwing = +(result.turnoutPct - prevResult.turnoutPct).toFixed(2);
      }

      return {
        ...result,
        metrics: {
          bjpSwing,
          incSwing,
          turnoutSwing
        }
      };
    });

    return {
      status: 'success',
      data: enrichedResults
    };
  }

  /**
   * GET /api/v1/constituencies/:id/assembly-segments
   */
  async getAssemblySegments(constituencyId = 'PC-26-KA') {
    await delay(200);
    const pc = PARLIAMENTARY_DATA[constituencyId];
    if (!pc) throw new Error('Constituency not found');

    const acs = pc.assemblyConstituencies.map(ac => {
      // Calculate Lead margin percentage and classify vulnerability
      const lead = ac.parliamentaryLead2024;
      const marginVotes = lead ? lead.leadMargin : 0;
      const totalVotes = lead ? lead.votes + (lead.trailingVotes || 0) : 1;
      const marginPct = +((marginVotes / totalVotes) * 100).toFixed(2);

      let competitiveness = 'Stronghold';
      if (marginPct < 5) competitiveness = 'Hyper-Competitive';
      else if (marginPct < 15) competitiveness = 'Moderate Lead';
      else competitiveness = 'Fortress/Safe';

      return {
        ...ac,
        marginPct,
        competitiveness
      };
    });

    return {
      status: 'success',
      data: acs
    };
  }

  /**
   * GET /api/v1/constituencies/:id/electoral-trends
   */
  async getElectoralTrends(constituencyId = 'PC-26-KA') {
    await delay(220);
    const pc = PARLIAMENTARY_DATA[constituencyId];
    if (!pc) throw new Error('Trends not found');

    const historical = pc.historicalResults;

    // Trend lines for Turnout, BJP Vote Share, INC Vote Share, Margin %
    const timelineData = [...historical]
      .reverse()
      .map(r => {
        const bjp = r.partyVoteShares.find(p => p.party === 'BJP')?.share || 0;
        const inc = r.partyVoteShares.find(p => p.party === 'INC' || p.party === 'AAP+INC')?.share || 0;
        return {
          year: r.year,
          turnoutPct: r.turnoutPct,
          bjpShare: bjp,
          incShare: inc,
          marginPct: r.marginPct,
          electors: r.electors,
          votesPolled: r.votesPolled
        };
      });

    // Correlation analysis: Turnout vs Margin
    const correlationData = timelineData.map(d => ({
      name: `${d.year}`,
      turnout: d.turnoutPct,
      margin: d.marginPct,
      bjpShare: d.bjpShare,
      winner: 'BJP'
    }));

    // Anti-Incumbency Vulnerability Score (0-100, where higher is more vulnerable)
    // Formula based on:
    // 1. Margin contraction (-5.81% in 2024 vs 2019)
    // 2. Opposition consolidation (+3.45% INC gain)
    // 3. Close assembly segment battles (BTM Layout margin was only 3,110 votes)
    const antiIncumbencyScore = 28; // Bangalore South remains relatively safe for BJP (Score: 28/100)

    return {
      status: 'success',
      data: {
        timelineData,
        correlationData,
        antiIncumbencyIndex: {
          score: antiIncumbencyScore,
          rating: 'Low Vulnerability (Incumbent Advantage)',
          factors: [
            { factor: 'Historical Win Streak', impact: 'Positive', description: 'Won 8 consecutive Lok Sabha elections since 1996' },
            { factor: 'Margin Contraction 2019-2024', impact: 'Negative', description: 'Victory margin reduced from 27.99% to 22.18% (-5.81%)' },
            { factor: 'Split-Ticket Voting Buffer', impact: 'Positive', description: 'Overcomes State Assembly INC MLAs in 3 key ACs' },
            { factor: 'Urban Turnout Apathy', impact: 'Neutral', description: 'Turnout flat at 53.17%, lower than Karnataka state avg of 69.9%' }
          ]
        }
      }
    };
  }

  /**
   * POST /api/v1/analytics/simulate-swing
   * Interactive "What-If" Simulation Engine
   */
  async simulateSwing({
    constituencyId = 'PC-26-KA',
    swingBJPtoINC = 0, // e.g. -5 to +5%
    turnoutDelta = 0, // e.g. -3 to +3%
    neutralizeSplitTicket = false
  }) {
    await delay(160);
    const pc = PARLIAMENTARY_DATA[constituencyId];
    if (!pc) throw new Error('Constituency not found');

    const base2024 = pc.historicalResults[0];
    const bjpBase = base2024.partyVoteShares.find(p => p.party === 'BJP').share;
    const incBase = base2024.partyVoteShares.find(p => p.party === 'INC').share;

    const projectedTurnout = Math.min(85, Math.max(35, +(base2024.turnoutPct + turnoutDelta).toFixed(2)));
    const projectedBJP = Math.max(0, +(bjpBase - swingBJPtoINC).toFixed(2));
    const projectedINC = Math.max(0, +(incBase + swingBJPtoINC).toFixed(2));
    const projectedMarginPct = +(projectedBJP - projectedINC).toFixed(2);
    const projectedWinner = projectedMarginPct >= 0 ? 'BJP' : 'INC';

    // Simulate AC segment shifts
    const acSimulations = pc.assemblyConstituencies.map(ac => {
      const origLead = ac.parliamentaryLead2024.leadMargin;
      const bjpVotes = ac.parliamentaryLead2024.votes;
      const incVotes = ac.parliamentaryLead2024.trailingVotes;
      const totalPolled = bjpVotes + incVotes;

      // Transfer percentage
      const voteTransfer = Math.round(totalPolled * (swingBJPtoINC / 100));
      let simBjpVotes = bjpVotes - voteTransfer;
      let simIncVotes = incVotes + voteTransfer;

      if (neutralizeSplitTicket && ac.splitTicketVoting) {
        // If state assembly INC momentum translates 100% to Lok Sabha
        simIncVotes += Math.round(totalPolled * 0.04);
        simBjpVotes -= Math.round(totalPolled * 0.04);
      }

      const simMargin = simBjpVotes - simIncVotes;
      const simWinner = simMargin >= 0 ? 'BJP' : 'INC';

      return {
        acNumber: ac.acNumber,
        name: ac.name,
        originalWinner: 'BJP',
        originalMargin: origLead,
        projectedWinner: simWinner,
        projectedMargin: Math.abs(simMargin),
        flipped: simWinner !== 'BJP'
      };
    });

    const flippedSegments = acSimulations.filter(s => s.flipped);

    return {
      status: 'success',
      data: {
        inputs: { swingBJPtoINC, turnoutDelta, neutralizeSplitTicket },
        projectedTurnout,
        projectedBJP,
        projectedINC,
        projectedMarginPct,
        projectedWinner,
        flippedCount: flippedSegments.length,
        flippedSegments,
        acSimulations
      }
    };
  }

  /**
   * GET /api/v1/data/raw-records
   * Raw ECI tabular records for Data Explorer & Export
   */
  async getRawRecords(constituencyId = 'PC-26-KA', query = '', segment = 'all') {
    await delay(120);
    const pc = PARLIAMENTARY_DATA[constituencyId];
    if (!pc) return { status: 'success', data: [] };

    const records = [];

    // Assemble AC segment level records
    pc.assemblyConstituencies.forEach(ac => {
      records.push({
        id: `AC-${ac.acNumber}-2024`,
        year: 2024,
        electionType: 'Lok Sabha (General)',
        unitName: ac.name,
        acNumber: ac.acNumber,
        totalElectors: ac.totalElectors,
        turnoutPct: ac.parliamentaryLead2024.turnoutPct,
        winningParty: ac.parliamentaryLead2024.leadingParty,
        leadingVotes: ac.parliamentaryLead2024.votes,
        trailingParty: ac.parliamentaryLead2024.trailingParty,
        trailingVotes: ac.parliamentaryLead2024.trailingVotes,
        margin: ac.parliamentaryLead2024.leadMargin,
        splitTicket: ac.splitTicketVoting ? 'Yes' : 'No'
      });

      if (ac.stateAssembly2023Result) {
        records.push({
          id: `AC-${ac.acNumber}-2023`,
          year: 2023,
          electionType: 'State Assembly (Vidhan Sabha)',
          unitName: ac.name,
          acNumber: ac.acNumber,
          totalElectors: ac.totalElectors,
          turnoutPct: ac.stateAssembly2023Result.turnoutPct,
          winningParty: ac.stateAssembly2023Result.party,
          leadingVotes: ac.stateAssembly2023Result.votes,
          trailingParty: ac.stateAssembly2023Result.runnerUpParty,
          trailingVotes: ac.stateAssembly2023Result.votes - ac.stateAssembly2023Result.margin,
          margin: ac.stateAssembly2023Result.margin,
          splitTicket: ac.splitTicketVoting ? 'Yes' : 'No'
        });
      }
    });

    let filtered = records;
    if (segment !== 'all') {
      filtered = filtered.filter(r => r.unitName.toLowerCase() === segment.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(r =>
        r.unitName.toLowerCase().includes(q) ||
        r.winningParty.toLowerCase().includes(q) ||
        r.electionType.toLowerCase().includes(q) ||
        r.year.toString().includes(q)
      );
    }

    return {
      status: 'success',
      total: filtered.length,
      data: filtered
    };
  }
}

export const api = new PoliticalIntelligenceApi();
export default api;
