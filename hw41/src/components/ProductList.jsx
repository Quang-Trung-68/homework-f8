import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';

const ProductList = ({ onEdit }) => {
  // ✅ VÍ DỤ MẪU - Lấy products từ Redux store
  const products = useSelector(state => state.products);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List ({products.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 🔥 BẠN LÀM: Map qua products và render ProductItem */}
        {products.map(product => (
          // TODO: Render ProductItem với props phù hợp
          <ProductItem key={product.id} product={product} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;