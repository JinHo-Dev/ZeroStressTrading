import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { db } from "~/db.server";
import argon2 from "argon2";

export default function Welcome() {
  return (
    <Form method="post">
      <input type="email" name="email" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Sign Up</button>
    </Form>
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
  return redirect("hello");
}
