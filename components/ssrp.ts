import { NextPageContext } from "next";
import { parseCookies } from "../utils/parseCookies";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export const withAuth = (ctx: NextPageContext) => {
  const { req } = ctx;
  const cookies = parseCookies(req);

  if (!cookies.auth) {
    return { props: { auth: false } };
  }

  const verified = jwt.verify(cookies.auth, process.env.TOKEN_SECRET, (err: JsonWebTokenError) => {
    if (!err) {
      return true;
    } else {
      return false;
    }
  });

  return { props: { auth: verified } };
};
