import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/actions/actionCreators";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProductItem = ({ product, onEdit }) => {
  const dispatch = useDispatch();

  // ✅ VÍ DỤ MẪU - Handler xóa product
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

  // 🔥 BẠN LÀM: Handler cho edit
  const handleEdit = () => {
    // TODO: Gọi onEdit với product
    console.log(product);
    onEdit(product);
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
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
