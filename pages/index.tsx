import Head from "next/head";
import Link from "next/link";
import { Typography, Button, Grid, Container } from "@material-ui/core";

export default function Home() {
  return (
    <Container maxWidth="xs">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h2" component="h1" align="center">
        Home
      </Typography>
      <Grid container direction="column" spacing={4} justify="center" alignItems="stretch">
        <Grid item>
          <Link href="/secret" passHref>
            <Button variant="contained" color="primary" fullWidth>
              Secret Route
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/login" passHref>
            <Button variant="outlined" color="secondary" fullWidth>
              Log In
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" passHref>
            <Button variant="outlined" color="secondary" fullWidth>
              Sign Up
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
