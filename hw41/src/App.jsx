import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  //Handler open form to add
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  //Open form to edit
  const handleEditProduct = (product) => {
    setIsFormOpen(true);
    setEditingProduct(product);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <Provider store={store}>
      <div className="p-6 max-w-6xl mx-auto">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className="text-3xl font-bold mb-6">Product Management</h1>
          <Button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            startIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </div>

        {isFormOpen && (
          <ProductModal
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            productToEdit={editingProduct}
            onCancel={handleCloseForm}
          />
        )}

        <ProductList onEdit={handleEditProduct} />
      </div>
    </Provider>
  );
}

export default App;
