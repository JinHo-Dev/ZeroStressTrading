import { css } from "@emotion/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import LabeledInput from "~/components/LabeledInput";
import { authenticator } from "~/services/auth.server";

export default function Hello() {
  const emailInput = useRef<HTMLInputElement>(null);
  const [emailValue, setEmailValue] = useState("");
  const location = useLocation();
  const [backto, setBackto] = useState("");

  useEffect(() => {
    if (location.state?.backto) {
      setBackto(location.state.backto);
    }
  }, [location]);

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
            width: 100%;
            height: 50px;
            & > a > div {
              font-size: 14px;
              margin: 0 20px;
              padding: 10px;
              background-color: #8638ea;
              color: #fff;
              font-weight: bold;
              border-radius: 10px;
            }
          `}
        >
          <Link to="/welcome">
            <div
              css={css`
                float: left;
              `}
            >
              회원가입
            </div>
          </Link>
          <Link to="/welcome">
            <div
              css={css`
                float: right;
              `}
            >
              비밀번호 찾기
            </div>
          </Link>
        </div>
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
              placeholder="가입한 이메일 주소"
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
            <input type="hidden" name="backto" value={backto} />
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
          </Form>
        </div>
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.clone().formData();
  console.log(body.get("backto") as string);
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: (body.get("backto") as string) || "/",
    failureRedirect: "/hello",
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  // if already authenticated
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
