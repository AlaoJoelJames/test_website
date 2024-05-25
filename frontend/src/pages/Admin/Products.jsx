import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import "../../styles/Products.css";
import Search from "../../components/Search.jsx";
import ProductItem from "../../components/ProductItem.jsx";
import filterLogo from "../../assets/filter.png";
import plus from "../../assets/plus.png";
import AddProduct from "../../components/addEditProduct.jsx";
import DeleteModal from "../../components/DeleteModal";
import EditProduct from "../../components/addEditProduct.jsx";
import axios from "axios";
import api from "../../api";


function Products() {

    const [show, setShow] = useState(false);

    const handleAddClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const isAdmin = true;
    

    useEffect(() => {
      api
        .get("/api/products/")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, []);
    
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
  
    const handleClose = () => {
      setShowDeleteModal(false);
    };
  
    const handleCloseEditModal = () => {
      setShowEditModal(false);
    };

    const handleDelete = () => {
      api
        .delete(`/api/products/${deleteProductId}/`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          
          fetchProducts();
          setShowDeleteModal(false);

        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    };

    const openDeleteModal = (id) => {
      setDeleteProductId(id);
      setShowDeleteModal(true);
    };
  
  const openEditModal = async (product) => {
  try {
    const response = await api.get(`/api/products/${product.id}/`);
    console.log(response.data);

    fetchProducts();
    setEditProductId(product.id);
    setShowEditModal(true);
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
};

  return (
    <div style={{ padding: "65px" }}>
      <Sidebar></Sidebar>
      <div className="main-content">
        <div
          className="row"
          style={{ display: "flex", borderBottom: "3px solid lightgrey" }}
        >
          <div className="col">
            <h1 class="products-title">Products</h1>
            <p>You can view, add, edit, or delete a product here.</p>
          </div>
          <div
            className="col-3 text-right"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Search></Search>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          {" "}
          <div
            className="col"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div onClick={handleShow} style={{display: 'flex', cursor: 'pointer'}}>
                <div style={{ color: "#0D6EFD" }}>Add a product</div>
                <div>
                    <img
                    src={plus}
                    alt="plus"
                    style={{ marginRight: "3px"}}
                    class="plus"
                    />
                </div>
            </div>
          </div>
          <div
            className="col-2 text-right"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={filterLogo}
              alt="Filter"
              style={{ marginRight: "3px" }}
              class="filterpic"
            />
            <select value="filter" style={{ color: "#0D6EFD" }} className="filter">
              <option value="">Filter</option>
              <option value="category">Category</option>
              <option value="az">A-Z</option>
            </select>
          </div>
          
        </div>
        <div className="container-fluid">
      <div className="row gap-3">
        {products.map((product) => (
          <ProductItem 
            key={product.id}
            product={product} 
            isAdmin={isAdmin} 
            openDeleteModal={openDeleteModal} 
            openEditModal={openEditModal} 
          />
        ))}
      </div>
      </div>
        <AddProduct show={show} handleClose={handleAddClose} />
        <DeleteModal
          show={showDeleteModal}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />

        {showEditModal && (
          <EditProduct
            show={showEditModal}
            handleClose={handleCloseEditModal}
            initialProduct={products.find(
              (product) => product.id === editProductId
            )}
            isEditing={true}
          />
        )}
      </div>

    </div>
    
  );
}

export default Products;
