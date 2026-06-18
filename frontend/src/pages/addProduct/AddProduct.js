import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { createProduct, selectIsLoading } from "../../redux/features/product/productSlice"

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
}

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const isLoading = useSelector(selectIsLoading);

    const { name, category, quantity, price } = product;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setProductImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const generateSKU = (category) => {
        const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now()
        const sku = letter + "-" + number
        return sku;
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("sku", generateSKU(category));
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", productImage);

        console.log(...formData);

        await dispatch(createProduct(formData));

        navigate("/dashboard");

    };

    return (
        <div>
            {isLoading && <Loader />}
            <div className="page-title-row">
                <div>
                    <span className="page-kicker">Catalog setup</span>
                    <h3>Add New Product</h3>
                    <p>Create a product record with stock, price, and a visual reference.</p>
                </div>
            </div>
            <ProductForm
                product={product}
                productImage={productImage}
                imagePreview={imagePreview}
                description={description}
                setDescription={setDescription}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
            />
        </div>
    )
}

export default AddProduct
