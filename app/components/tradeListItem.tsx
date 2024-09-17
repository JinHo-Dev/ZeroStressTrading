import { Link } from "@remix-run/react";
import type TradeItem from "~/interfaces/tradeItem";

export default function TradeListItem({ tradeItem }: { tradeItem: TradeItem }) {
  return (
    <Link rel="prefetch" relative="path" to={tradeItem.tradeId}>
      <li className="tradeListItem">{tradeItem.tradeName}</li>
    </Link>
  );
}
