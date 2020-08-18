import React from "react";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./ProductsService";
import Modal from "./components/Modal";
import AddEditProductForm from "./components/AddEditProductForm";
function App() {
  const [products, setProducts] = React.useState(() => {
    fetchProducts();
    return [];
  });

  const [
    isShowingAddEditProductModal,
    setIsShowingAddEditProductModal,
  ] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState(null);

  function fetchProducts() {
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        debugger;
      });
  }

  function handleAddProductClick() {
    setIsShowingAddEditProductModal(true);
  }

  function handleCloseModal() {
    setIsShowingAddEditProductModal(false);
  }

  function handleCreateProduct(product) {
    createProduct(product)
      .then((response) => {
        setIsShowingAddEditProductModal(false);
        alert("SUCCESSFULLY CREATE NEW ITEM");
        fetchProducts();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleEditProduct(product) {
    setCurrentProduct(product);
    setIsShowingAddEditProductModal(true);
  }

  function handleUpdateProduct(product) {
    updateProduct(product._id, product)
      .then((response) => {
        setIsShowingAddEditProductModal(false);
        alert("SUCCESSFULLY UPDATED PRODUCT");
        fetchProducts();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleDeleteProduct(product) {
    deleteProduct(product._id)
      .then((respons) => {
        setIsShowingAddEditProductModal(false);
        alert("SUCCESSFULLY DELETED PRODUCT");
        fetchProducts();
      })
      .catch((errors) => {
        alert(errors);
      });
  }
  return (
    <div className="App">
      <button onClick={handleAddProductClick}> CREATE NEW PRODUCT</button>
      {isShowingAddEditProductModal ? (
        <Modal>
          <AddEditProductForm
            existingProduct={currentProduct}
            handleCloseModal={handleCloseModal}
            handleCreateProduct={handleCreateProduct}
            handleUpdateProduct={handleUpdateProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        </Modal>
      ) : null}
      <h1>React Grocery App</h1>
      <ProductGrid
        products={products}
        handleEditProduct={handleEditProduct}
        handleUpdateProduct={handleEditProduct}
        handleCreateProduct={handleCreateProduct}
      />
    </div>
  );
}

export default App;
