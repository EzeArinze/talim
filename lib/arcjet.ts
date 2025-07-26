import { env } from "@/types/env";
import arcjet, {
  detectBot,
  slidingWindow,
  shield,
  fixedWindow,
  sensitiveInfo,
  protectSignup,
} from "@arcjet/next";

export {
  detectBot,
  slidingWindow,
  shield,
  fixedWindow,
  sensitiveInfo,
  protectSignup,
};

export default arcjet({
  key: env.ARCJET_KEY,
  characteristics: ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});
