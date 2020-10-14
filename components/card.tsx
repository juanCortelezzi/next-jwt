import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useState } from "react";

interface IProps {
  productData: {
    title: string;
    description: string;
    price: number;
    image: string;
  };
}

const DishCard: React.FC<IProps> = ({ productData }) => {
  const { title, description, price, image } = productData;
  const [count, setCount] = useState(0);

  const handlePlus = (e: React.MouseEvent) => {
    e.preventDefault();
    setCount(count + 1);
  };

  const handleMinus = (e: React.MouseEvent) => {
    e.preventDefault();
    if (count <= 0) return;
    setCount(count - 1);
  };

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setCount(0);
  };

  return (
    <Card>
      <CardMedia style={{ height: "400px", backgroundSize: "cover" }} image={image} title={title} />
      <CardContent>
        <Grid container justify="space-between">
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="h6" component="h3">
            ${price}
          </Typography>
        </Grid>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <CardActions>
          <Grid container justify="space-around" alignItems="center">
            <IconButton onClick={handleMinus}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" component="p">
              {count}
            </Typography>
            <IconButton onClick={handlePlus}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleCart}>
              <AddShoppingCartIcon />
            </IconButton>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default DishCard;
