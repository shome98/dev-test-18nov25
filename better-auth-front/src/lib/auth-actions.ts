import { z } from "zod";
import { authClient } from "./auth-client";
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(128);
const nameSchema = z.string().min(1).max(100);
const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});
export async function signUp(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const data = signUpSchema.parse(rawData);
  try {
    const res = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    return { ok: true, userId: res.data?.user?.id, data: data };
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  const res = await authClient.signOut();
  console.log(res);
  return res;
}

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export async function signIn(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const data = signInSchema.parse(rawData);

  const res = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });

  //   await migrateGuestToUser();
  console.log(res?.data);
  return { ok: true, userId: res.data?.user?.id, data: res.data };
}
