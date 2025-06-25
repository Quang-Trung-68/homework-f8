const ShowFilter = ({ products }) => {
  // Hàm định dạng tiền tệ VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <>
      {(products.length != 0) ? (products.map(product => (
        <p key={product.id}>
          {`${product.name} - ${formatPrice(product.price)} - ${product.category} - ${product.brand}`}
        </p>
      ))) : "Khong tim thay san pham da chon!"}
    </>
  );
};

export default ShowFilter;