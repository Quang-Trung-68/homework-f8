import { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchStr, setSearchStr] = useState("");
  console.log(searchStr);

  const products = useSelector((state) => state.products);
  console.log(products);

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

  const onSearch = (searchValue) => {
    setSearchStr(searchValue);
  };
  const productsSearching = products.filter((product) =>
    product.name.toLowerCase().includes(searchStr.toLowerCase())
  );
  console.log(productsSearching);
  return (
    <>
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

        <TextField
          id="search-outlined"
          label="Search by name"
          variant="outlined"
          value={searchStr}
          onChange={(e) => onSearch(e.target.value)}
        />

        {isFormOpen && (
          <ProductModal
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            productToEdit={editingProduct}
            onCancel={handleCloseForm}
          />
        )}

        <ProductList onEdit={handleEditProduct} products={productsSearching} />
      </div>
    </>
  );
}

export default App;
