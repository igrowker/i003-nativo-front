export interface Transaction {
  id: string;
  transaction: string;
  amount: number;
  senderName: string;
  senderSurname: string;
  senderAccount: string;
  receiverName: string;
  receiverSurname: string;
  receiverAccount: string;
  creationDate: string;
  endDate?: string;
  status: string;
  description?: string;
}
