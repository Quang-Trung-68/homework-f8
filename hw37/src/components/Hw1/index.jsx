import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState, useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ShowFilter from "./ShowFilter.jsx";

const Hw1 = () => {
  // Dữ liệu gốc
  const originalProducts = useMemo(() => [
    {
      id: 1,
      name: "Áo thun thể thao",
      price: 350000,
      category: "Áo",
      brand: "Nike",
    },
    {
      id: 2,
      name: "Quần jogger",
      price: 750000,
      category: "Quần",
      brand: "Adidas",
    },
    {
      id: 3,
      name: "Nón lưỡi trai",
      price: 250000,
      category: "Phụ kiện",
      brand: "Puma",
    },
    { 
      id: 4, 
      name: "Áo hoodie", 
      price: 1200000, 
      category: "Áo", 
      brand: "Nike" 
    },
  ], []);

  // State cho các filter
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const [brand, setBrand] = useState(0);

  // Hàm filter theo giá
  const filterByPrice = (products, priceFilter) => {
    switch (priceFilter) {
      case 0:
        return products; // Tất cả
      case 1:
        return products.filter(product => product.price < 500000);
      case 2:
        return products.filter(product => product.price >= 500000 && product.price < 1000000);
      case 3:
        return products.filter(product => product.price >= 1000000);
      default:
        return products;
    }
  };

  // Hàm filter theo danh mục
  const filterByCategory = (products, categoryFilter) => {
    switch (categoryFilter) {
      case 0:
        return products; // Tất cả
      case 1:
        return products.filter(product => product.category === "Áo");
      case 2:
        return products.filter(product => product.category === "Quần");
      case 3:
        return products.filter(product => product.category === "Phụ kiện");
      default:
        return products;
    }
  };

  // Hàm filter theo brand
  const filterByBrand = (products, brandFilter) => {
    switch (brandFilter) {
      case 0:
        return products; // Tất cả
      case 1:
        return products.filter(product => product.brand === "Nike");
      case 2:
        return products.filter(product => product.brand === "Adidas");
      case 3:
        return products.filter(product => product.brand === "Puma");
      default:
        return products;
    }
  };

  // Sử dụng useMemo để tối ưu hóa việc filter
  // Chỉ tính toán lại khi price hoặc category thay đổi
  const filteredProducts = useMemo(() => {
    console.log("Đang tính toán lại danh sách sản phẩm...");
    
    // Áp dụng filter theo giá trước
    let result = filterByPrice(originalProducts, price);
    
    // Sau đó áp dụng filter theo danh mục
    result = filterByCategory(result, category);

    // Sau đó áp dụng filter theo brand
    result = filterByBrand(result, brand);
    
    return result;
  }, [originalProducts, price, category,brand]);

  // Event handlers
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

   const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  console.log("Render component - Số sản phẩm:", filteredProducts.length);

  return (
    <>
      {/* Form filter theo giá */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="price-select-label">Giá</InputLabel>
        <Select
          labelId="price-select-label"
          id="price-select"
          value={price}
          label="Giá"
          onChange={handleChangePrice}
        >
          <MenuItem value={0}>Tất cả</MenuItem>
          <MenuItem value={1}>{"< 500K"}</MenuItem>
          <MenuItem value={2}>500K - 1 triệu</MenuItem>
          <MenuItem value={3}>{"> 1 triệu"}</MenuItem>
        </Select>
      </FormControl>

      {/* Form filter theo danh mục */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="category-select-label">Danh mục</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Danh mục"
          onChange={handleChangeCategory}
        >
          <MenuItem value={0}>Tất cả</MenuItem>
          <MenuItem value={1}>Áo</MenuItem>
          <MenuItem value={2}>Quần</MenuItem>
          <MenuItem value={3}>Phụ kiện</MenuItem>
        </Select>
      </FormControl>

       {/* Form filter theo brand */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="brand-select-label">Thuong hieu</InputLabel>
        <Select
          labelId="brand-select-label"
          id="brand-select"
          value={brand}
          label="Thuong hieu"
          onChange={handleChangeBrand}
        >
          <MenuItem value={0}>Tất cả</MenuItem>
          <MenuItem value={1}>Nike</MenuItem>
          <MenuItem value={2}>Adidas</MenuItem>
          <MenuItem value={3}>Puma</MenuItem>
        </Select>
      </FormControl>


      {/* Hiển thị kết quả */}
      <ShowFilter products={filteredProducts} />
    </>
  );
};

export default Hw1;