
export enum UserRole {
  USER = 'USER',
  TEAM = 'TEAM'
}

export interface User {
  id: string;
  thorxId: string;
  name: string;
  email: string;
  role: UserRole;
  balance: number;
  totalEarnings: number;
  referrals: number;
  referralCode: string;
  avatarSeed?: string;
}

export interface EarningEvent {
  id: string;
  type: 'AD' | 'REFERRAL' | 'TASK';
  amount: number;
  timestamp: string;
  description: string;
}

export interface Withdrawal {
  id: string;
  method: 'JazzCash' | 'EasyPaisa' | 'Bank';
  accountNumber: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
}
