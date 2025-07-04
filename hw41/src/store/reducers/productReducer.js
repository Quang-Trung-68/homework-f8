import { ADD_PRODUCT,UPDATE_PRODUCT, DELETE_PRODUCT } from "../actions/productActions";

const initialState = {
  products: [
    { 
      id: 1, 
      name: 'iPhone 15', 
      price: 999, 
      category: 'Phone', 
      description: 'Latest iPhone',
      stock: 50,
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    { 
      id: 2, 
      name: 'Samsung Galaxy S24', 
      price: 899, 
      category: 'Phone', 
      description: 'Android flagship',
      stock: 30,
      createdAt: '2024-01-02T00:00:00.000Z'
    }
  ]
};


const productReducer = (state = initialState, action) => {
    console.log(state);
  switch (action.type) {
    // ✅ VÍ DỤ MẪU - ADD_PRODUCT case
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    
    // 🔥 BẠN LÀM: Hoàn thành các case sau
    case UPDATE_PRODUCT:
      // TODO: Tìm product theo id và cập nhật
      // Gợi ý: Dùng map, kiểm tra id === action.payload.id
      return {
        ...state,
        products: state.products.map(product =>
          // TODO: Điều kiện và logic update
          product.id === action.payload.id ? action.payload : product
        )
      };
    
    case DELETE_PRODUCT:
      // TODO: Xóa product theo id
      // Gợi ý: Dùng filter, loại bỏ product có id === action.payload
      return {
        ...state,
        products: state.products.filter(product=>(
             // TODO: Filter logic
             product.id !== action.payload.id
        ))
      };
    
    default:
      return state;
  }
};

export default productReducer