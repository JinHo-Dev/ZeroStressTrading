export default interface BiddingItem {
  biddingId: number;
  tradeId?: string | null;
  userId?: string | null;
  biddingDate?: string | null;
  biddingPrice?: number | null;
  isCancel?: boolean | null;
}
