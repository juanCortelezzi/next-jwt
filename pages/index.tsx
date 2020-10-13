import Head from "next/head";
import Link from "next/link";
import { Typography, Box } from "@material-ui/core";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h2" component="h1">
        Home
      </Typography>
      <Box>
        <Link href="/secret">
          <a>Secret Route</a>
        </Link>
      </Box>
      <Box>
        <Link href="/login">
          <a>Log In</a>
        </Link>
      </Box>
      <Box>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </Box>
    </div>
  );
}
