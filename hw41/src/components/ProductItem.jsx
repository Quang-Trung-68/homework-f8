import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/actions/productActions';

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
    onEdit(product)
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-xl font-bold text-green-600">${product.price}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <p className="text-sm mb-4">{product.description}</p>
      
      <div className="flex space-x-2">
        {/* 🔥 BẠN LÀM: Button Edit */}
        <button 
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        
        <button 
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;