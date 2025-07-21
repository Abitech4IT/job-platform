export interface IJob {
  id: number;
  title: string;
  description: string;
  company: string;
  type: string;
  tags: string[];
  location: string;
  salary: number;
  createdAt: Date;
  updatedAt?: Date;
}
