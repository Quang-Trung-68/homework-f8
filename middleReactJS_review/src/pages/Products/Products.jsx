import { useEffect, useState } from "react";
import ProductsTable from "../../components/ProductsTable";
import { deleteProduct, getProduct, putProduct } from "../../fetchApi/index.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    orderNum: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      name: "",
      categoryId: "",
      orderNum: "",
    });
    setIdEdit(null);
    setIsEdit(false);
    setOpen(false);
  };
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  // const [editingProduct, setEditingProduct]

  const getDataProducts = async () => {
    try {
      const { data } = await getProduct();
      console.log(data);
      console.log("re_get_data");
      setProducts(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProducts();
    console.log(123);
  }, []);

  const onSaveEdit = async () => {
    setIsEdit(false);
    await putProduct(idEdit, { ...formData });
    handleClose();
    setFormData({
      name: "",
      categoryId: "",
      orderNum: 0,
    });
    setIdEdit(null);
    getDataProducts();
  };

  const onSaveDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?"
    );
    if (confirmDelete) {
      await deleteProduct(id);
      handleClose();
      await getDataProducts(); // nhớ thêm await để đảm bảo load lại dữ liệu
    }
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
        idEdit={idEdit}
        setIdEdit={setIdEdit}
        onSaveDelete={onSaveDelete}
      />
    </>
  );
}
