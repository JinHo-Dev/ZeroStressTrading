import { css } from "@emotion/react";
import { Form } from "@remix-run/react";
import { ReactNode, useRef } from "react";

export default function RevealName() {
  const fileSelector = useRef<HTMLInputElement>(null);

  return (
    <Form
      method="post"
      css={css`
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 1;
      `}
    >
      <ul>
        <li></li>
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
  );
}
