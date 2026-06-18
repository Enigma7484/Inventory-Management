import React, { useEffect } from 'react'
import "./ProductDetail.scss"
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { getProduct } from '../../../redux/features/product/productSlice';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';
import DOMPurify from "dompurify";

const ProductDetail = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const { id } = useParams();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { product, isLoading, isError, message } = useSelector(
        (state) => state.product
    );

    const stockStatus = (quantity) => {
        if (quantity > 0) {
            return <span className="status-pill status-pill--success">In Stock</span>
        }
        return <span className="status-pill status-pill--danger">Out Of Stock</span>
    };

    const formatDate = (date) => date ? new Date(date).toLocaleString("en-US") : "Not available";

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProduct(id));
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch, id]);

    return (
        <div className="product-detail">
            <div className="page-title-row">
                <div>
                    <span className="page-kicker">Catalog record</span>
                    <h3>Product Detail</h3>
                    <p>Review product identity, stock position, and description.</p>
                </div>
                <Link className="--btn --btn-secondary" to="/dashboard">Back to Dashboard</Link>
            </div>
            <Card cardClass="card">
                {isLoading && <SpinnerImg />}
                {product && (
                    <div className="detail">
                        <Card cardClass="group">
                            {product?.image ? (
                                <img src={product.image.filePath} alt={product.image.fileName} />
                            ) : (
                                <p>No image set for this product</p>
                            )}
                        </Card>
                        <div className="detail-main">
                            <div className="detail-heading">
                                <div>
                                    <span className="badge">Name</span>
                                    <h4>{product.name}</h4>
                                </div>
                                {stockStatus(product.quantity)}
                            </div>
                            <div className="detail-grid">
                                <p><b>SKU</b><span>{product.sku}</span></p>
                                <p><b>Category</b><span>{product.category}</span></p>
                                <p><b>Price</b><span>{"$"}{product.price}</span></p>
                                <p><b>Quantity in stock</b><span>{product.quantity}</span></p>
                                <p><b>Total value</b><span>{"$"}{product.price * product.quantity}</span></p>
                            </div>
                            <div className="description-block" dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description)
                            }}>
                            </div>
                            <div className="detail-meta">
                                <code>Created on: {formatDate(product.createdAt)}</code>
                                <code>Last Updated: {formatDate(product.updatedAt)}</code>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default ProductDetail
