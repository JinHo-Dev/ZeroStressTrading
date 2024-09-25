import { css } from "@emotion/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { authenticator } from "~/services/auth.server";

export default function Hello() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const emailFocused = () => {
    setIsEmailFocused(true);
  };

  const emailBlured = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEmailFocused(event.target.value.length > 0);
  };

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const passwordFocused = () => {
    setIsPasswordFocused(true);
  };

  const passwordBlured = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setIsPasswordFocused(event.target.value.length > 0);
  };

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
          <div
            css={css`
              border: solid 1px rgba(0, 0, 20, 0.1);
              border-radius: 10px 10px 0 0;
              height: 70px;
              width: calc(100% - 40px);
              margin-left: 20px;
              overflow: hidden;
            `}
          >
            <div
              css={
                isEmailFocused
                  ? css`
                      position: absolute;
                      z-index: -1;
                      font-size: 14px;
                      color: rgba(0, 0, 20, 0.6);
                      margin-left: 12px;
                      margin-top: 6px;
                      line-height: 28px;
                      transition-duration: 0.15s;
                    `
                  : css`
                      position: absolute;
                      z-index: -1;
                      font-size: 18px;
                      color: rgba(0, 0, 20, 0.4);
                      margin-left: 12px;
                      margin-top: 0px;
                      line-height: 70px;
                      transition-duration: 0.15s;
                    `
              }
            >
              가입한 이메일 주소
            </div>
            <input
              type="email"
              required
              onFocus={emailFocused}
              onBlur={emailBlured}
              css={css`
                background: none;
                border: none;
                border-radius: 10px 10px 0 0;
                height: 70px;
                width: 100%;
                padding: 14px;
                padding-top: 30px;
                font-size: 18px;
              `}
            />
          </div>

          <div
            css={css`
              border: solid 1px rgba(0, 0, 20, 0.1);
              border-top: none;
              border-radius: 0 0 10px 10px;
              height: 70px;
              width: calc(100% - 40px);
              margin-left: 20px;
              overflow: hidden;
            `}
          >
            <div
              css={
                isPasswordFocused
                  ? css`
                      position: absolute;
                      z-index: -1;
                      font-size: 14px;
                      color: rgba(0, 0, 20, 0.6);
                      margin-left: 12px;
                      margin-top: 6px;
                      line-height: 28px;
                      transition-duration: 0.15s;
                    `
                  : css`
                      position: absolute;
                      z-index: -1;
                      font-size: 18px;
                      color: rgba(0, 0, 20, 0.4);
                      margin-left: 12px;
                      margin-top: 0px;
                      line-height: 70px;
                      transition-duration: 0.15s;
                    `
              }
            >
              비밀번호
            </div>
            <input
              type="password"
              autoComplete="current-password"
              required
              onFocus={passwordFocused}
              onBlur={passwordBlured}
              css={css`
                background: none;
                border: none;
                border-radius: 10px 10px 0 0;
                height: 70px;
                width: 100%;
                padding: 14px;
                padding-top: 30px;
                font-size: 18px;
              `}
            />
          </div>
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
            로그인
          </button>
        </div>
      </div>
      <Form method="post">
        <input type="email" name="email" />
        <input type="password" name="password" />
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/hello",
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  // if already authenticated
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
