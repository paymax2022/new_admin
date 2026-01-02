import api from './api';

// Voting API endpoints - uses proxy configured in vite.config.ts
// All endpoints are relative and will be proxied to the backend

interface ApiResponse<T> {
  ok: boolean;
  data: T;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  rows_per_page: number;
  total_count: number;
  page: number;
}

// Vote Rule Interfaces
interface VoteRule {
  id?: string;
  points_per_vote?: number;
  voting_delays?: number;
  delay_timing?: string;
  contest_id: string;
  rule_name?: string;
  premium_max_vote_per_limit?: number;
  premium_vote_after_min?: number;
  standard_max_vote_per_limit?: number;
  standard_vote_after_min?: number;
}

// Round Interfaces
interface Round {
  id?: string;
  name: string;
  round: number;
  min_votes: number | string;
  contest_id: string;
  start_date: string;
  end_date: string;
  description?: string;
  status?: string;
}

// Contestant Interfaces
interface Contestant {
  id?: string;
  nick_name?: string;
  user_id?: string;
  contest_id?: string;
  contest_id_string?: string;
  date_of_birth?: string;
  category?: string;
  state?: string;
  email?: string;
  gender?: string;
}

// Contest Interfaces
interface Contest {
  id?: string;
  title?: string;
  category?: string;
  campaign_leader_name?: string;
  campaign_leader_role?: string;
  assistant_leader_name?: string;
  assistant_leader_role?: string;
  start_date?: string;
  end_date?: string;
  repeat_frequency?: string;
  fee_required?: boolean | string;
  registration_fee?: number;
  logo?: string;
  Description?: string;
  Email?: string;
  status?: string;
  participants?: number;
  prize?: number;
}

// Vote Price Interfaces
interface VotePrice {
  id?: string;
  title?: string;
  price: number;
  votes: number;
  contest_id: string;
}

// Prize Interfaces
interface Prize {
  id?: string;
  position: number;
  prize: number;
  contest_id: string;
}

// Benefit Interfaces
interface Benefit {
  id?: string;
  type: string;
  contest_id: string;
  benefit_name: string;
  awarded: boolean;
  position: number;
}

// Vote Service Class
class VotingService {
  // ========== VOTE RULE ENDPOINTS ==========
  async createVoteRule(ruleData: VoteRule): Promise<ApiResponse<VoteRule>> {
    const response = await api.post('/api/contest/vote/rule', ruleData);
    return response.data;
  }

  async getVoteRule(contestId: string, filter: object = {}): Promise<ApiResponse<VoteRule>> {
    const params = new URLSearchParams();
    params.append('filter', JSON.stringify(filter));
    const response = await api.get(`/api/contest/vote/rule/${contestId}?${params.toString()}`);
    return response.data;
  }

  async updateVoteRule(ruleData: Partial<VoteRule> & { id: string }): Promise<ApiResponse<VoteRule>> {
    const response = await api.patch('/api/contest/vote/rule', ruleData);
    return response.data;
  }

  async deleteVoteRule(ruleId: string): Promise<ApiResponse<void>> {
    const response = await api.delete('/api/contest/vote/rule', { data: { id: ruleId } });
    return response.data;
  }

  // ========== ROUND ENDPOINTS ==========
  async createRounds(rounds: Round[]): Promise<ApiResponse<Round[]>> {
    const response = await api.post('/api/contest/round', { rounds });
    return response.data;
  }

  async createContestRounds(rounds: Round[]): Promise<ApiResponse<Round[]>> {
    const response = await api.post('/api/v1/contest/round', { rounds });
    return response.data;
  }

  async getRounds(contestId: string): Promise<ApiResponse<Round[]>> {
    const response = await api.get(`/api/contest/round/${contestId}`);
    return response.data;
  }

  async getContestRounds(contestId: string): Promise<ApiResponse<Round[]>> {
    const response = await api.get(`/api/v1/contest/round/${contestId}`);
    return response.data;
  }

  async updateRound(roundId: string, roundData: Partial<Round>): Promise<ApiResponse<Round>> {
    const response = await api.put(`/api/contest/round/${roundId}`, roundData);
    return response.data;
  }

  async updateContestRound(roundId: string, rounds: Round[]): Promise<ApiResponse<Round[]>> {
    const response = await api.put(`/api/contest/vote/round/${roundId}`, { rounds });
    return response.data;
  }

  async deleteRound(roundId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/api/contest/round/${roundId}`, { data: { id: roundId } });
    return response.data;
  }

  async deleteContestRound(roundId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/api/v1/contest/round/${roundId}`);
    return response.data;
  }

  // ========== CONTESTANT ENDPOINTS ==========
  async getContestants(contestId: string, filter: object = {}): Promise<ApiResponse<Contestant[]>> {
    const params = new URLSearchParams();
    params.append('filter', JSON.stringify(filter));
    const response = await api.get(`/api/v1/contest/contestant/${contestId}/all?${params.toString()}`);
    return response.data;
  }

  async getContestantById(contestantId: string, filter: object = {}): Promise<ApiResponse<Contestant>> {
    const params = new URLSearchParams();
    params.append('filter', JSON.stringify(filter));
    const response = await api.get(`/api/contest/contestant/${contestantId}?${params.toString()}`);
    return response.data;
  }

  async subscribeToContest(contestantData: Contestant): Promise<ApiResponse<Contestant>> {
    const response = await api.post('/api/v1/contest/contestant', contestantData);
    return response.data;
  }

  async unsubscribeFromContest(userId: string, contestId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/api/contest/user/${userId}/contest`, { params: { contest_id: contestId } });
    return response.data;
  }

  async payRegistrationFee(contestantId: string): Promise<ApiResponse<void>> {
    const response = await api.post(`/api/contest/contestant/${contestantId}/payment`);
    return response.data;
  }

  async verifyRegistrationPayment(verificationData: { contestant_id: string; transaction_reference: string }): Promise<ApiResponse<void>> {
    const response = await api.post('/api/contest/contestant/verify/payment', verificationData);
    return response.data;
  }

  async getContestantsCategories(filter: object = {}): Promise<ApiResponse<string[]>> {
    const params = new URLSearchParams();
    params.append('filter', JSON.stringify(filter));
    const response = await api.get(`/api/v1/contest/categories?${params.toString()}`);
    return response.data;
  }

  async getRecentVotes(contestantId: string): Promise<ApiResponse<any[]>> {
    // Try v1 endpoint first, fallback to old endpoint
    try {
      const response = await api.get(`/api/v1/contest/contestant/${contestantId}/recent`);
      return response.data;
    } catch (error) {
      // If v1 doesn't work, try the old endpoint
      try {
        const response = await api.get(`/api/contest/contestant/${contestantId}/recent`);
        return response.data;
      } catch (fallbackError) {
        // If both fail, return empty array
        console.warn(`Recent votes endpoint not available for contestant ${contestantId}`);
        return { ok: false, data: [] };
      }
    }
  }

  async getReferral(userId: string): Promise<ApiResponse<any>> {
    const response = await api.post('/api/contest/user/referal', { user_id: userId });
    return response.data;
  }

  async getUserByReferral(referralId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/api/contest/referal/${referralId}`);
    return response.data;
  }

  // ========== CONTEST ENDPOINTS ==========
  async createContest(contestData: FormData): Promise<ApiResponse<Contest>> {
    const response = await api.post('/api/v1/contest', contestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getContests(): Promise<ApiResponse<Contest[]>> {
    // Use the list endpoint which is the correct route
    const response = await api.get('/api/v1/contest/list');
    // Handle both array and paginated responses
    if (response.data && response.data.data) {
      // If paginated response, return the data array
      return {
        ...response.data,
        data: Array.isArray(response.data.data) ? response.data.data : [],
      };
    }
    // If already an array, return as is
    return response.data;
  }

  async getContestById(contestId: string): Promise<ApiResponse<Contest>> {
    const response = await api.get(`/api/v1/contest/${contestId}`);
    return response.data;
  }

  async updateContest(contestId: string, contestData: FormData): Promise<ApiResponse<Contest>> {
    const response = await api.put(`/api/v1/contest/${contestId}`, contestData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteContest(contestId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/api/contest/${contestId}`, { data: { id: contestId } });
    return response.data;
  }

  async closeContest(contestId: string): Promise<ApiResponse<void>> {
    const response = await api.post(`/api/contest/${contestId}/close`);
    return response.data;
  }

  async proceedInContest(contestId: string): Promise<ApiResponse<void>> {
    const response = await api.post(`/api/contest/${contestId}/proceed`);
    return response.data;
  }

  async getWinners(): Promise<ApiResponse<any[]>> {
    const response = await api.get('/api/contest/winners');
    return response.data;
  }

  async getWinner(contestId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/api/v1/contest/${contestId}/winner`);
    return response.data;
  }

  async getContestsByUser(userId: string): Promise<ApiResponse<Contest[]>> {
    const response = await api.get(`/api/v1/contest/user/${userId}`);
    return response.data;
  }

  // ========== VOTE PRICE ENDPOINTS ==========
  async createVotePrices(prices: VotePrice[]): Promise<ApiResponse<VotePrice[]>> {
    const response = await api.post('/api/contest/vote/price', { prices });
    return response.data;
  }

  async getVotePrices(contestId: string, filter: object = {}): Promise<ApiResponse<VotePrice[]>> {
    const params = new URLSearchParams();
    params.append('filter', JSON.stringify(filter));
    const response = await api.get(`/api/contest/vote/price/${contestId}?${params.toString()}`);
    return response.data;
  }

  async updateVotePrice(priceId: string, priceData: Partial<VotePrice>): Promise<ApiResponse<VotePrice>> {
    const response = await api.put(`/api/contest/vote/price/${priceId}`, priceData);
    return response.data;
  }

  async deleteVotePrice(priceId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/api/contest/vote/price/${priceId}`);
    return response.data;
  }

  async buyVote(buyData: { user_id: string; vote_price_id: string; contest_id: string }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/contest/buy/vote', buyData);
    return response.data;
  }

  async verifyBuyVotePayment(transactionReference: string): Promise<ApiResponse<any>> {
    const response = await api.post('/api/contest/verify/buy/vote', { transaction_reference: transactionReference });
    return response.data;
  }

  // ========== VOTE ENDPOINTS ==========
  async freeVote(voteData: { contestant_id: string; voter_id: string; round_id: string }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/contest/vote/free', voteData);
    return response.data;
  }

  async paidVote(voteData: { vote_price_id: string; contestant_id: string; contest_id: string; round_id: string }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/vote/paid', voteData);
    return response.data;
  }

  // ========== PRIZE ENDPOINTS ==========
  async createPrizes(prizes: Prize[]): Promise<ApiResponse<Prize[]>> {
    const response = await api.post('/api/contest/prize', { prizes });
    return response.data;
  }

  async getPrizes(contestId: string): Promise<ApiResponse<Prize[]>> {
    const response = await api.get(`/api/contest/prize/${contestId}`);
    return response.data;
  }

  async getFirstPrize(contestId: string): Promise<ApiResponse<Prize>> {
    const response = await api.get(`/api/v1/contest/prize/${contestId}/first`);
    return response.data;
  }

  async updatePrize(prizeId: string, prizeData: Partial<Prize>): Promise<ApiResponse<Prize>> {
    const response = await api.put(`/api/contest/prize/${prizeId}`, prizeData);
    return response.data;
  }

  async deletePrize(prizeId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/api/contest/prize/${prizeId}`);
    return response.data;
  }

  // ========== BENEFIT ENDPOINTS ==========
  async createBenefits(benefits: Benefit[]): Promise<ApiResponse<Benefit[]>> {
    const response = await api.post('/api/contest/benefit', { benefits });
    return response.data;
  }

  async getBenefits(contestId: string): Promise<ApiResponse<Benefit[]>> {
    const response = await api.get(`/api/contest/benefit/${contestId}`);
    return response.data;
  }

  async updateBenefit(benefitId: string, benefitData: Partial<Benefit>): Promise<ApiResponse<Benefit>> {
    const response = await api.put(`/api/contest/benefit/${benefitId}`, benefitData);
    return response.data;
  }

  async deleteBenefit(benefitId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/api/contest/benefit/${benefitId}`);
    return response.data;
  }

  // ========== USER ENDPOINTS ==========
  async createUser(userId: string): Promise<ApiResponse<any>> {
    const response = await api.post('/api/contest/user', { user_id: userId });
    return response.data;
  }

  async getUser(filter: object = {}): Promise<ApiResponse<any>> {
    const params = new URLSearchParams();
    params.append('filter', JSON.stringify(filter));
    const response = await api.get(`/api/contest/user?${params.toString()}`);
    return response.data;
  }

  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    const response = await api.delete('/api/contest/user', { data: { id: userId } });
    return response.data;
  }

  // ========== NEW ENDPOINTS FROM POSTMAN COLLECTION ==========

  // ========== CONTEST MANAGEMENT (NEW API STRUCTURE) ==========
  async createContestJSON(contestData: {
    title: string;
    description: string;
    category: string;
    start_date: string;
    end_date: string;
    registration_fee?: number;
    max_contestants?: number;
    voting_enabled?: boolean;
  }): Promise<ApiResponse<Contest>> {
    const response = await api.post('/api/v1/contest/', contestData);
    return response.data;
  }

  async listContests(params: {
    page?: number;
    limit?: number;
    status?: string;
  } = {}): Promise<ApiResponse<PaginatedResponse<Contest>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);

    const url = `/api/v1/contest/list${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  async updateContestJSON(contestId: string, contestData: Partial<Contest>): Promise<ApiResponse<Contest>> {
    const response = await api.put(`/api/v1/contest/${contestId}`, contestData);
    return response.data;
  }

  // ========== CONTESTANT MANAGEMENT (NEW API STRUCTURE) ==========
  async subscribeToContestJSON(subscriptionData: {
    contest_id: string;
    stage_name: string;
    bio?: string;
    age?: number;
  }): Promise<ApiResponse<Contestant>> {
    const response = await api.post('/api/v1/contest/contestant', subscriptionData);
    return response.data;
  }

  async getContestantsNew(contestId: string): Promise<ApiResponse<Contestant[]>> {
    const response = await api.get(`/api/v1/contest/contestant/${contestId}/all`);
    return response.data;
  }

  async getSingleContestant(contestantId: string): Promise<ApiResponse<Contestant>> {
    const response = await api.get(`/api/v1/contest/contestant/${contestantId}`);
    return response.data;
  }

  // ========== VOTING SYSTEM (NEW ENDPOINTS) ==========
  async castFreeVote(voteData: {
    contestant_id: string;
    contest_id: string;
    vote_count?: number;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/vote/free', voteData);
    return response.data;
  }

  async initializePaidVote(voteData: {
    contestant_id: string;
    vote_price_id: string;
    round_id: string;
    amount: number;
    payWithWallet: boolean;
    paymentReference?: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/vote/paid-init', voteData);
    return response.data;
  }

  async getVoteLeaderboard(contestId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`/api/v1/contest/vote/leaderboard/${contestId}`);
    return response.data;
  }

  // ========== ADMIN DASHBOARD ==========
  async getAdminDashboard(): Promise<ApiResponse<any>> {
    const response = await api.get('/api/v1/contest/admin/dashboard');
    return response.data;
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    const response = await api.get('/api/v1/contest/admin/dashboard/stats');
    return response.data;
  }

  async getVoterAnalytics(): Promise<ApiResponse<any>> {
    const response = await api.get('/api/v1/contest/admin/analytics/voter');
    return response.data;
  }

  // ========== BADGE SYSTEM ==========
  async createBadge(badgeData: {
    contestant_id: string;
    badge_type: string;
    title: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/badge', badgeData);
    return response.data;
  }

  async getBadge(badgeId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/api/v1/contest/badge/${badgeId}`);
    return response.data;
  }

  // ========== PUBLIC VOTING ==========
  async getPublicVotingInterface(): Promise<ApiResponse<any>> {
    const response = await api.get('/api/v1/contest/public/voting');
    return response.data;
  }

  async getPublicContestants(contestId: string): Promise<ApiResponse<Contestant[]>> {
    const response = await api.get(`/api/v1/contest/public/contestants?contest_id=${contestId}`);
    return response.data;
  }

  async voteForContestantPublic(voteData: {
    contestant_id: string;
    contest_id: string;
    vote_count?: number;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/public/vote', voteData);
    return response.data;
  }

  // ========== CONTESTANT PORTAL ==========
  async getContestantPortal(contestantId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/api/v1/contest/contestant/portal/${contestantId}`);
    return response.data;
  }

  async generateCertificate(certificateData: {
    contestant_id: string;
    certificate_type: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/contestant/certificate/generate', certificateData);
    return response.data;
  }

  // ========== BOOTCAMP MANAGEMENT ==========
  async createBootcampPhase(phaseData: {
    contest_id: string;
    phase_name: string;
    start_date: string;
    end_date: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/bootcamp/phase', phaseData);
    return response.data;
  }

  async getBootcampLeaderboard(phaseId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`/api/v1/contest/bootcamp/leaderboard/${phaseId}`);
    return response.data;
  }

  // ========== NOTIFICATIONS ==========
  async sendNotification(notificationData: {
    recipient_id: string;
    title: string;
    message: string;
    type: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/notification/send', notificationData);
    return response.data;
  }

  async getNotificationHistory(userId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`/api/v1/contest/notification/history/${userId}`);
    return response.data;
  }

  // ========== CONTEST ORGANIZER ==========
  async registerOrganizer(organizerData: {
    organization_name: string;
    contact_person: string;
    email: string;
    phone: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/organizer/register', organizerData);
    return response.data;
  }

  async getOrganizer(organizerId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/api/v1/contest/organizer/${organizerId}`);
    return response.data;
  }

  // ========== MONITORING & SECURITY ==========
  async getMonitoringDashboard(): Promise<ApiResponse<any>> {
    const response = await api.get('/api/v1/contest/admin/monitoring/dashboard');
    return response.data;
  }

  async detectFraud(fraudData: {
    contest_id: string;
    check_type: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/admin/monitoring/fraud/detect', fraudData);
    return response.data;
  }

  // ========== QUALIFICATION SYSTEM ==========
  async startQualificationProcess(qualificationData: {
    contest_id: string;
    qualification_criteria: {
      minimum_votes?: number;
      minimum_engagement?: number;
    };
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/qualification/start', qualificationData);
    return response.data;
  }

  async getQualificationDashboard(contestId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/api/v1/contest/qualification/dashboard/${contestId}`);
    return response.data;
  }

  // ========== VOTE MANAGEMENT (UPDATED) ==========
  async buyVotesNew(buyData: {
    contest_id: string;
    vote_package: string;
    quantity: number;
    amount: number;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/buy/vote', buyData);
    return response.data;
  }

  async verifyVotePayment(verificationData: {
    transaction_reference: string;
    payment_gateway: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post('/api/v1/contest/verify/buy/vote', verificationData);
    return response.data;
  }

  async getVotePricesNew(contestId: string): Promise<ApiResponse<VotePrice[]>> {
    const response = await api.get(`/api/v1/contest/vote/price/${contestId}`);
    return response.data;
  }
}

export default new VotingService();
export type { VoteRule, Round, Contestant, Contest, VotePrice, Prize, Benefit };

