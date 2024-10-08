export interface Transaction {
  id: string;
  transaction?: string;
  amount: number;
  senderName: string;
  senderSurname: string;
  senderAccount: string;
  receiverName: string;
  receiverSurname: string;
  receiverAccount: string;
  creationDate: string | number | Date;
  formattedDate?: string | undefined;
  formattedTime?: string | undefined;
  endDate?: string | number | Date;
  status: string;
  description?: string;
}
