import { Prisma } from "@prisma/client";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "~/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  let data: Prisma.tradesCreateInput;

  if (request.method === "POST") {
    data = {
      tradeName: body.get("tradeName") as string,
      tradeId: body.get("tradeName") as string,
      createDate: new Date(),
    };

    // 트레이드 이름 규칙 화이트리스트
    data.tradeName = data.tradeName?.replaceAll(
      /[^0-9a-zA-Zㄱ-ㅎ가-힣 ()~#\^+*,._\-]/gi,
      ""
    );

    // tradeId 띄어쓰기 제거
    data.tradeId = (data.tradeName as string).replaceAll(/ /gi, "-");

    // 중복된 tradeName인 경우, tradeId 뒤에 구분 index 부여
    const tradeItem = await db.trades.findFirst({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        tradeName: data.tradeName,
      },
    });

    if (tradeItem) {
      if (tradeItem.tradeId === data.tradeId) {
        data.tradeId += `@2`;
      } else {
        const lastIndexArray = tradeItem.tradeId.match(/(?<=@)\d+$/gi);
        if (lastIndexArray) {
          data.tradeId = `${data.tradeId}@${Number(lastIndexArray[0]) + 1}`;
        }
      }
    }

    await db.trades.create({
      data: data,
    });
    return redirect(`/trade/${data.tradeId}`);
  }
}

export default function Reveal() {
  return (
    <Form method="post">
      <input type="button" value="add Photos" />
      <input type="text" name="tradeName" placeholder="tradeName" />
      <input type="text" name="minPrice" placeholder="minPrice" />
      <input type="text" name="priceUnit" placeholder="priceUnit" />
      <input type="button" value="set Details" />
      <button type="submit">Create</button>
    </Form>
  );
}
