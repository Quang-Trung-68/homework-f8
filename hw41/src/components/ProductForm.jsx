import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ADD_PRODUCT,
  addProduct,
  UPDATE_PRODUCT,
  updateProduct,
} from "../store/actions/productActions";
import { v7 } from "uuid";

const ProductForm = ({ productToEdit, onCancel }) => {
  const dispatch = useDispatch();

  // ✅ VÍ DỤ MẪU - Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });

  // ✅ VÍ DỤ MẪU - Load dữ liệu khi edit
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
  }, [productToEdit]);

  // ✅ VÍ DỤ MẪU - Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  // 🔥 BẠN LÀM: Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Validate form data
    // TODO: Dispatch action tương ứng (add hoặc update)

    // TODO: Reset form và gọi onCancel
    onCancel();
    if (productToEdit) {
      // TODO: Dispatch updateProduct với { ...formData, id: productToEdit.id }
      //   dispatch({
      //     type: UPDATE_PRODUCT,
      //     payload: { ...formData, id: productToEdit.id },
      //   });

      dispatch(updateProduct({ id: productToEdit.id, ...formData }));
    } else {
      // TODO: Dispatch addProduct với formData
      //   dispatch({ type: ADD_PRODUCT, payload: { id: v7(), ...formData } });
      dispatch(addProduct({ ...formData, id: v7() }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {productToEdit ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* 🔥 BẠN LÀM: Tạo các input fields */}
          {/* TODO: Input cho name, price, category, description, stock */}
          {/* TODO: Mỗi input cần có name, value, onChange */}
          <div>
            Name
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            Price
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            Category
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div>
            Description
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            Stock
            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
            >
              {productToEdit ? "Update" : "Add"} Product
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
