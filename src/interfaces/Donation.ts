export interface Donation {
  id: string;
  amount: number;
  accountIdDonor: string;
  donorName?: string;
  donorLastName?: string;
  accountIdBeneficiary: string;
  beneficiaryName?: string;
  beneficiaryLastName?: string;
  createdAt?: string;
  status: string;
}
