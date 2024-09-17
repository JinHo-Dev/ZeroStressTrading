export default interface TradeItem {
  tradeId: string;
  tradeName?: string;
  createDate?: string;
  updateDate?: string;
  completeDate?: string;
  isComplete?: boolean;
  isCancel?: boolean;
  sellerId?: string;
  buyerId?: string;
  itemId?: string;
  detail?: object;
  minPrice?: number;
  maxPrice?: number;
  currentPrice?: number;
  priceUnit?: string;
}
