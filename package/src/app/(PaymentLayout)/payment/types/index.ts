// app/(DashboardLayout)/campaign/types/index.ts

export interface Payment {
    id: string;
    campaign: string;
    date: string;
    status: PaymentStatus;
    totalFee: number;
    paid: boolean; // indicates payment status
}

export type PaymentStatus = 'COMPLETED' | 'NOT COMMPLETE';