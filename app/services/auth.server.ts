import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { db } from "~/db.server";
import argon2 from "argon2";

export let authenticator = new Authenticator<string>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;
    let user = await login(email, password);
    return user;
  }),
  // startegy name
  "user-pass",
);

const login = async (email: string, password: string) => {
  const authUser = await db.users.findUnique({
    where: {
      userId: email,
    },
  });

  if (!authUser || !(await argon2.verify(authUser.pw || "", password))) {
    throw new AuthorizationError("invalid username or password", {
      name: "invalidCredentials",
      message: "invalid username or password",
      cause: "invalidCredentials",
    });
  }
  return email;
};
