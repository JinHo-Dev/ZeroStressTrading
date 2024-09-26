import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { db } from "~/db.server";
import argon2 from "argon2";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState(1);

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const emailFocused = () => {
    setIsEmailFocused(true);
  };

  const emailBlured = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsEmailFocused(false);
  };

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const passwordFocused = () => {
    setIsPasswordFocused(true);
  };

  const passwordBlured = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setIsPasswordFocused(false);
  };

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (emailInput.current?.matches(":autofill")) {
        setIsPasswordFocused(true);
        emailInput.current?.focus();
      }
    }, 500);
  }, []);

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
            <div
              onClick={(e) => {
                e.currentTarget.querySelector("input")?.focus();
              }}
              css={css`
                border: solid 1px rgba(0, 0, 20, 0.1);
                border-radius: ${email.length === 0 ? "10px" : "10px 10px 0 0"};
                height: 70px;
                width: calc(100% - 40px);
                margin-left: 20px;
                overflow: hidden;
                transition-duration: 0.15s;
              `}
            >
              <div
                css={
                  isEmailFocused || email
                    ? css`
                        position: absolute;
                        font-size: 14px;
                        color: rgba(0, 0, 20, 0.6);
                        margin-left: 12px;
                        margin-top: 6px;
                        line-height: 28px;
                        transition-duration: 0.15s;
                      `
                    : css`
                        position: absolute;
                        font-size: 18px;
                        color: rgba(0, 0, 20, 0.4);
                        margin-left: 12px;
                        margin-top: 0px;
                        line-height: 70px;
                        transition-duration: 0.15s;
                      `
                }
              >
                이메일 주소
              </div>
              <input
                type="email"
                name="email"
                value={email}
                required
                onFocus={emailFocused}
                onBlur={emailBlured}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                ref={emailInput}
                css={css`
                  background: none;
                  border: none;
                  border-radius: 10px 10px 0 0;
                  height: 70px;
                  width: 100%;
                  padding: 14px;
                  padding-top: 30px;
                  font-size: 18px;
                  border-radius: 0;
                  outline: 0;
                `}
              />
            </div>

            <div
              onClick={(e) => {
                e.currentTarget.querySelector("input")?.focus();
              }}
              css={css`
                border: solid ${email.length === 0 ? "0" : "1px"}
                  rgba(0, 0, 20, 0.1);
                border-top: none;
                position: relative;
                border-radius: 0 0 10px 10px;
                width: 100%;
                height: ${email.length === 0 ? "0" : "70px"};
                overflow: hidden;
                width: calc(100% - 40px);
                margin-left: 20px;
                overflow: hidden;
                transition-duration: 0.15s;
              `}
            >
              <div
                css={
                  isPasswordFocused || password
                    ? css`
                        position: absolute;
                        font-size: 14px;
                        color: rgba(0, 0, 20, 0.6);
                        margin-left: 12px;
                        margin-top: 6px;
                        line-height: 28px;
                        transition-duration: 0.15s;
                      `
                    : css`
                        position: absolute;
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
                name="password"
                value={password}
                autoComplete="new-password"
                required
                onFocus={passwordFocused}
                onBlur={passwordBlured}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                ref={passwordInput}
                css={css`
                  background: none !important;
                  border: none;
                  border-radius: 10px 10px 0 0;
                  height: 70px;
                  width: 100%;
                  padding: 14px;
                  padding-top: 30px;
                  font-size: 18px;
                  border-radius: 0;
                  outline: 0;
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
