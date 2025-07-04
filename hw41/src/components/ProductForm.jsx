import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../store/actions/actionCreators";
import { v7 } from "uuid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ProductForm = ({ productToEdit, onCancel }) => {
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });
  // errors of validation form
  const [errors, setErrors] = useState({});
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    console.log(formData);
    // Check name
    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm là bắt buộc";
    }

    // Check price
    if (!formData.price.toString().trim()) {
      newErrors.price = "Giá là bắt buộc";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Giá phải là số dương";
    }

    // Check category
    if (!formData.category.trim()) {
      newErrors.category = "Danh mục là bắt buộc";
    }

    // Check desc
    if (!formData.description.trim()) {
      newErrors.description = "Mô tả là bắt buộc";
    }

    // Check stock
    if (!formData.stock.toString().trim()) {
      newErrors.stock = "Số lượng tồn kho là bắt buộc";
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = "Số lượng phải là số không âm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Load product to form when editing a product
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price,
        category: productToEdit.category,
        description: productToEdit.description,
        stock: productToEdit.stock,
      });
    }
    console.log(productToEdit);
  }, [productToEdit]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
    console.log(formData);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit && validateForm()) {
      dispatch(updateProduct({ id: productToEdit.id, ...formData }));
      onCancel();
    } else if (validateForm()) {
      dispatch(addProduct({ ...formData, id: v7() }));
      onCancel();
    } else {
      console.log(errors);
    }
  };

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {productToEdit ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            sx={{ margin: "10px" }}
            id="name-outlined"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            name="price"
            sx={{ margin: "10px" }}
            id="price-outlined"
            label="Price"
            variant="outlined"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            name="category"
            sx={{ margin: "10px" }}
            id="category-outlined"
            label="Category"
            variant="outlined"
            value={formData.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
          />
          <TextField
            name="description"
            sx={{ margin: "10px" }}
            id="description-outlined"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            name="stock"
            sx={{ margin: "10px" }}
            id="stock-outlined"
            label="Stock"
            variant="outlined"
            value={formData.stock}
            onChange={handleChange}
            error={!!errors.stock}
            helperText={errors.stock}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              {productToEdit ? "Update" : "Add"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
