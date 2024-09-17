export default interface TradeItem {
  tradeId: string;
  tradeName?: string | null;
  createDate?: string | null;
  updateDate?: string | null;
  completeDate?: string | null;
  isComplete?: boolean | null;
  isCancel?: boolean | null;
  sellerId?: string | null;
  buyerId?: string | null;
  itemId?: string | null;
  detail?: any | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  currentPrice?: number | null;
  priceUnit?: string | null;
}
