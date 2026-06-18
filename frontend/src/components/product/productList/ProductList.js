import React, { useEffect, useState } from 'react';
import "./productList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import Search from '../../search/Search';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice';
import ReactPaginate from "react-paginate";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice';
import { Link } from 'react-router-dom';

const ProductList = ({ products, isLoading }) => {
    const [search, setSearch] = useState("");
    const filteredProducts = useSelector(selectFilteredProducts);

    const dispatch = useDispatch();

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    const delProduct = async (id) => {
        await dispatch(deleteProduct(id));
        await dispatch(getProducts());
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: "Delete Product",
            message: "Are you sure you want to delete this product.",
            buttons: [
                {
                    label: "Delete",
                    onClick: () => delProduct(id),
                },
                {
                    label: "Cancel",
                    // onClick: () => alert('Click No')
                },
            ],
        });
    };

    //   Begin Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredProducts]);

    const handlePageClick = (event) => {
        if (filteredProducts.length === 0) return;
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
    };
    //   End Pagination

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({ products, search }))
    }, [products, search, dispatch]);

    return (
        <div className="product-list">
            <div className="table inventory-panel">
                <div className="table-toolbar">
                    <div>
                        <span className="page-kicker">Catalog</span>
                        <h3>Inventory Items</h3>
                        <p>{filteredProducts.length} matching items in your current view.</p>
                    </div>
                    <div className="table-actions">
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Link className="--btn --btn-primary" to="/add-product">
                            <FiPlus />
                            Add Product
                        </Link>
                    </div>
                </div>

                {isLoading && <SpinnerImg />}

                <div className="table-scroll">
                    {!isLoading && products.length === 0 ? (
                        <p className="empty-state">No products yet. Add your first item to start tracking inventory.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    currentItems.map((product, index) => {
                                        const { _id, name, category, price, quantity } = product;
                                        return (
                                            <tr key={_id}>
                                                <td>{itemOffset + index + 1}</td>
                                                <td className="item-name">{shortenText(name, 22)}</td>
                                                <td>{category}</td>
                                                <td>{"$"}{price}</td>
                                                <td>{quantity}</td>
                                                <td>{"$"}{price * quantity}</td>
                                                <td className="icons">
                                                    <span title="View product">
                                                        <Link aria-label={`View ${name}`} to={`/product-detail/${_id}`}>
                                                            <AiOutlineEye />
                                                        </Link>
                                                    </span>
                                                    <span title="Edit product">
                                                        <Link aria-label={`Edit ${name}`} to={`/edit-product/${_id}`}>
                                                            <FaEdit />
                                                        </Link>
                                                    </span>
                                                    <span title="Delete product">
                                                        <button aria-label={`Delete ${name}`} type="button" onClick={() => confirmDelete(_id)}>
                                                            <FaTrashAlt />
                                                        </button>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="activePage"
                />
            </div>
        </div>
    )
}

export default ProductList
