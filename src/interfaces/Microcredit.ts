interface Contribution {
  id: string;
  lenderAccountId: string;
  lenderFullname: string;
  borrowerFullname: string;
  microcreditId: string;
  amount: number;
  createdDate: string;
  expiredDateMicrocredit: string;
  transactionStatus: string;
}

export interface Microcredit {
  id: string;
  borrowerAccountId: string;
  amount: number;
  remainingAmount: number;
  createdDate: string;
  expirationDate: string;
  title: string;
  description: string;
  transactionStatus: string;
  contributions: Contribution[];
}