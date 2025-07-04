import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";

const ProductList = ({ onEdit }) => {
  // ✅ VÍ DỤ MẪU - Lấy products từ Redux store
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
            <th>Tên sản phẩm</th>
            <th>Giá bán (VNĐ)</th>
            <th>Số lượng</th>
            <th>Đơn vị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            // TODO: Render ProductItem với props phù hợp
            <ProductItem key={product.id} product={product} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
