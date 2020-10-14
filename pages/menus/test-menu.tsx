import Head from "next/head";
import { Typography, Grid, Container } from "@material-ui/core";
import DishCard from "../../components/card";

export default function TestMenu() {
  const dummyData = [
    {
      title: "bondio",
      description: "bondio a las brasas hecha con amor y hierbas ahumadas a la parrilla",
      price: 3000,
      image: "/test-images/meat.jpg",
    },
    {
      title: "salmon",
      description: "bondio a las brasas hecha con amor y hierbas ahumadas a la parrilla",
      price: 50,
      image: "/test-images/meat.jpg",
    },
    {
      title: "falopa",
      description: "bondio a las brasas hecha con amor y hierbas ahumadas a la parrilla",
      price: 5040,
      image: "/test-images/meat.jpg",
    },
    {
      title: "medialunas",
      description: "bondio a las brasas hecha con amor y hierbas ahumadas a la parrilla",
      price: 300,
      image: "/test-images/meat.jpg",
    },
  ];
  return (
    <Container maxWidth="xl">
      <Head>
        <title>Test Menu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h2" component="h1" align="center">
        Test Menu
      </Typography>
      <Grid container spacing={2} direction="row">
        {dummyData.map((e) => {
          return (
            <Grid item key={e.title} xs={12} sm={6} md={4} lg={3}>
              <DishCard productData={e} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
