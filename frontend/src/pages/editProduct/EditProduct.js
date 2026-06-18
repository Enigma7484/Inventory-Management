import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);

    const productEdit = useSelector(selectProduct);

    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch, id]);

    useEffect(() => {
        setProduct(productEdit)

        setImagePreview(
            productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
        )

        setDescription(
            productEdit && productEdit.description ? productEdit.description : ""
        )

    }, [productEdit]);

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

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", product?.name);
        formData.append("category", product?.category);
        formData.append("quantity", product?.quantity);
        formData.append("price", product?.price);
        formData.append("description", description);
        if (productImage) {
            formData.append("image", productImage);
        }
        console.log(...formData);

        await dispatch(updateProduct({ id, formData }));
        await dispatch(getProducts());
        navigate("/dashboard");
    };

    return (
        <div>
            {isLoading && <Loader />}
            <div className="page-title-row">
                <div>
                    <span className="page-kicker">Catalog update</span>
                    <h3>Edit Product</h3>
                    <p>Adjust the current item details and keep stock information accurate.</p>
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

export default EditProduct
