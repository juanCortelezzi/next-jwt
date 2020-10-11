import { Button, TextField, Grid, Typography, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useState } from "react";

export default function SignUp() {
  const [alertOpen, setAlertOpen] = useState<[boolean, string]>([false, ""]);

  const handleClose = () => {
    setAlertOpen([false, ""]);
  };

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    const { resStatus, msg } = await signUp({
      name: data.name,
      email: data.email,
      pass: data.password,
    });
    if (resStatus !== 200) {
      let errorMsg = "";
      if (Array.isArray(msg)) {
        msg.map((e: { value: string; msg: string; param: string; location: string }) => {
          errorMsg += `${e.msg} `;
        });
      } else {
        errorMsg = msg;
      }
      setAlertOpen([true, errorMsg]);
    }
  };

  const signUp = async ({ name, email, pass }) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass,
      }),
    });
    const data = await response.json();
    return { resStatus: response.status, msg: data.msg };
  };

  return (
    <div>
      <Head>
        <title>Sign Up Next Auth</title>
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
        <Grid item xs={3}>
          <Typography variant="h3" component="h1">
            Sign Up
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={errors.name?.message && true}
              inputRef={register({
                required: "Name is required",
                minLength: {
                  value: 6,
                  message: "At least 6 chareacters",
                },
                maxLength: { value: 70, message: "no more than 70 characters" },
              })}
              helperText={errors.name?.message && errors.name.message}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              error={errors.email?.message && true}
              inputRef={register({
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Not an email",
                },
              })}
              helperText={errors.email?.message && errors.email.message}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              error={errors.password?.message && true}
              inputRef={register({
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 chareacters",
                },
                maxLength: { value: 70, message: "no more than 70 characters" },
              })}
              helperText={errors.password?.message && errors.password.message}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
            />
            <Button
              style={{ marginTop: "1rem", marginBottom: "1.5rem" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Snackbar open={alertOpen[0]} autoHideDuration={6000} onClose={handleClose}>
              <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                {alertOpen[1]}
              </MuiAlert>
            </Snackbar>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
//<Button
//fullWidth
//variant="outlined"
//color="primary"
//onClick={() => {
//router.push("/login");
//}}
//>
//Log In
//</Button>
