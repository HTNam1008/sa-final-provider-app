// app/(DashboardLayout)/campaign/types/index.ts

export interface Campaign {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: CampaignStatus;
    initial: number;
    remaining: number; // percentage of vouchers remaining
    paid: boolean; // indicates payment status
}

export type CampaignStatus = 'ENDED' | 'NOT_ACCEPTED' | 'PENDING';