import { useEffect, useState } from "react";
import ProductsTable from "../../components/ProductsTable";
import api from "../../plugins/api";

export default function Products() {
  const { data } = api.get("products");
  console.log(data);

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    orderNum: 0,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isEdit, setIsEdit] = useState(false);

  const getDataProducts = async () => {
    const { data } = await api.get("products");
    console.log(data);
    setProducts(data);
    return data;
  };

  useEffect(() => {
    getDataProducts();
  }, []);

  const onEdit = async (id) => {
    const { data } = await api.put(`products/${id}`, { ...formData });
    return data;
  };

  const onSaveEdit = () => {
    setIsEdit(true);
    onEdit(id);
    handleOpen();
  };

  return (
    <>
      <h1>Quan ly san pham</h1>
      <ProductsTable
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        products={products}
        formData={formData}
        setFormData={setFormData}
        getDataProducts={getDataProducts}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSaveEdit={onSaveEdit}
        onEdit={onEdit}
      />
    </>
  );
}
