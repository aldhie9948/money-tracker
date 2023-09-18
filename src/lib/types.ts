export interface IRequestTransaction {
  category: string;
  description: string;
  status: string;
  nominal: number;
  createdAt?: string;
}

export interface ITransaction {
  id: string;
  description: string;
  status: string;
  category: string;
  nominal: number;
  createdAt: string;
  updatedAt: string;
}
