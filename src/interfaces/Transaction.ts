export interface Transaction {
    id: string;
    transaction: string;
    amount: number;
    senderName: string;
    senderSurname: string;
    senderFullName?: string;
    senderAccount: string;
    receiverName: string;
    receiverSurname: string;
    receiverFullName?: string;
    receiverAccount: string;
    creationDate: string;
    endDate?: string;
    stauts: string;
}