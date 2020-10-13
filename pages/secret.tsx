import Link from "next/link";
import Head from "next/head";
import { Typography, Grid } from "@material-ui/core";
import { NextPageContext, InferGetServerSidePropsType } from "next";
import { withAuth } from "../components/ssrp";

function Secret({ auth }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!auth) {
    return (
      <>
        <Head>
          <title>Redirecting to login</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Typography variant="h2" component="h1">
            You are not signed in
          </Typography>
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        </Grid>
      </>
    );
  }
  return (
    <div>
      <Head>
        <title>Secret</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h2" component="h1">
        Secret
      </Typography>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  return withAuth(ctx);
}

export default Secret;
