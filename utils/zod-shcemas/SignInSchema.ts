import z from "zod";

const blockedDomains = [
  "example.com",
  "test.com",
  "example.org",
  "test.org",
  "example.net",
  "test.net",
];

export const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (val) => !blockedDomains.some((domain) => val.endsWith("@" + domain)),
      { message: "Please use your real email address" }
    ),
});
