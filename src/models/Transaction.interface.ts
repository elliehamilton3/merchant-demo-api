export interface Transaction {
  id: string;
  user_id: string;
  merchant_id: string;
  date: string;
  amount: number,
  description: string;
}
