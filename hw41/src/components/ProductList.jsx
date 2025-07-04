import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";

const ProductList = ({ onEdit }) => {
  // Get products from Redux store

  const products = useSelector((state) => state.products);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Product List ({products.length})
      </h2>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>Category</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            // Render ProductItem
            <ProductItem key={product.id} product={product} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
