import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface IProps {
  productData: {
    title: string;
    description: string;
    price: number;
    image: string;
  };
}

const DishCardAdmin: React.FC<IProps> = ({ productData }) => {
  const { title, description, price, image } = productData;

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
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default DishCardAdmin;
