export interface Donation {
  id: string;
  amount: number;
  accountIdDonor: string;
  donorName?: string;
  donorLastName?: string;
  accountIdBeneficiary: string;
  beneficiaryName?: string;
  beneficiaryLastName?: string;
  createdAt: string | number | Date;
  updateAt: string | number | Date;
  formattedDate?: string | undefined;
  formattedTime?: string | undefined;
  status: string;
  transaction?: string;
  description?: string;
}
