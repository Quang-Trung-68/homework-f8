import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/actions/actionCreators";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProductItem = ({ product, onEdit }) => {
  // Get dispatch
  const dispatch = useDispatch();

  // Handler delete product
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

  // Handler edit
  const handleEdit = () => {
    // Call onEdit func with product
    console.log(product);
    onEdit(product);
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.description}</td>
      <td>{product.stock}</td>
      <td>
        <Button startIcon={<EditIcon />} onClick={handleEdit}>
          Edit
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color={"error"}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ProductItem;
