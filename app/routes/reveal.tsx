import { Prisma } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import backButtonState from "~/atoms/backButtonState";
import NavigationBar from "~/components/NavigationBar";
import { db } from "~/db.server";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  if (!(await authenticator.isAuthenticated(request))) {
    return redirect("../hello");
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  let data: Prisma.tradesCreateInput;

  if (request.method === "POST") {
    data = {
      tradeName: body.get("tradeName") as string,
      tradeId: body.get("tradeName") as string,
      createDate: new Date(),
      sellerId: await authenticator.isAuthenticated(request),
    };

    // 트레이드 이름 규칙 화이트리스트
    data.tradeName = data.tradeName?.replaceAll(
      /[^0-9a-zA-Zㄱ-ㅎ가-힣 ()~#\^+*,._\-]/gi,
      "",
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
    const createdTradeUrl = encodeURI(`/trade/${data.tradeId as string}`);
    return redirect(createdTradeUrl);
  }
}

export default function Reveal() {
  const [isBackButton, setIsBackButton] = useRecoilState(backButtonState);

  useEffect(() => {
    setIsBackButton(true);
  }, []);

  return (
    <>
      <Form method="post">
        <ul>
          <li>
            <input type="button" value="add Photos" />
          </li>
          <li>
            <input type="text" name="tradeName" placeholder="tradeName" />
          </li>
          <li>
            <input type="text" name="minPrice" placeholder="minPrice" />
          </li>
          <li>
            <input type="text" name="priceUnit" placeholder="priceUnit" />
          </li>
          <li>
            <input type="button" value="set Details" />
          </li>
          <li>
            <button type="submit">Create</button>
          </li>
        </ul>
      </Form>
    </>
  );
}
