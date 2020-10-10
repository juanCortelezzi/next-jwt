import Head from "next/head";
import Link from "next/link";
import { Typography /*, Button*/ } from "@material-ui/core";

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
      <Link href="/secret">
        <a>Secret Route</a>
      </Link>
    </div>
  );
}
