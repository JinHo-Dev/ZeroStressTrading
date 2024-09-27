import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { db } from "~/db.server";
import argon2 from "argon2";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import LabeledInput from "~/components/LabeledInput";

export default function Welcome() {
  const emailInput = useRef<HTMLInputElement>(null);
  const [emailValue, setEmailValue] = useState("");

  return (
    <>
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            position: absolute;
            width: 100%;
            height: fix-content;
            bottom: 20px;
          `}
        >
          <Form method="post">
            <LabeledInput
              type="email"
              name="email"
              autoComplete="email"
              placeholder="이메일 주소"
              _ref={emailInput}
              onChange={(e) => {
                setEmailValue(e.currentTarget.value);
              }}
              state={emailValue.length === 0 ? undefined : -1}
            />
            <LabeledInput
              type="password"
              name="password"
              autoComplete="password"
              placeholder="비밀번호"
              state={emailValue.length === 0 ? 0 : 1}
            />
            <button
              css={css`
                background: #8638ea;
                bottom: 10px;
                margin: 20px;
                width: calc(100% - 40px);
                height: 60px;
                border-radius: 10px;
                color: #fff;
                font-weight: bold;
                font-size: 17px;
              `}
            >
              회원가입
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  await db.users.create({
    data: {
      userId: body.get("email") as string,
      pw: await argon2.hash(body.get("password") as string),
    },
  });
  return redirect("/hello");
}
