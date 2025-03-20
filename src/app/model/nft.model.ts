export interface NFT {
  id: number;
  title: string;
  creator: string;
  priceEth: number;
  priceEur: number;
  imageUrl?: string | null;
  description: string;
  tags: string[];
}
