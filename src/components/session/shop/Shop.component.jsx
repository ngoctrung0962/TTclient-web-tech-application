/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from "react";
import productApi from "../../../api/productApi";
import { Fragment } from "react";
import { insertCartApi, getListCartApi } from "../../../api/cartApi";
import swal from "sweetalert2";
import Rating from "@material-ui/lab/Rating";
import Slider from "@mui/material/Slider";
import Box from "@material-ui/core/Box";
import categoryApi from "../../../api/categoryApi";

import {
  formatVND,
  showNotification,
  checkQuantity,
} from "../../../utils/MyUtils";
import { getAllCarts } from "../../../redux/cartRedux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "./Pagination.component";
import { useSelector, useDispatch } from "react-redux";
let PageSize = 9;

function Shop() {
  const user = useSelector((state) => state.user.currentUser);
  const listCartRedux = useSelector((state) => state.cart.listCart);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [value, setValue] = useState(5);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [filterByPrice, setFilterByPrice] = useState({ min: 0, max: 20000 });
  const [priceShow, setPriceShow] = useState([0, 20000]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await productApi.getAll();
        setProducts(products);
        setFilteredProducts(products);
        const minPrice = await productApi.getMinPrice();
        const maxPrice = await productApi.getMaxPrice();
        const ob = {
          min: minPrice,
          max: maxPrice,
        };
        setFilterByPrice(ob);
        setPriceShow(ob);
        //get category
        const categories = await categoryApi.getAll();
        spans.push({ categoryId: "All", name: "All products" });
        spans.push(...categories);
        if (user) {
          await getAllCarts(dispatch, user.username);
        }
      } catch (error) {
        console.error("error");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // categories list rendering using span tag
  // const [spans] = useState([
  //   { id: "All", text: "All products" },
  //   { id: "Laptop", text: "Laptop" },
  //   { id: "SmartPhone", text: "SmartPhone" },
  // ]);
  const [spans, setSpans] = useState([]);

  // category state
  const location = useLocation();
  const tranformCategory = location.state ? location.state.category : null;
  const [category, setCategory] = useState(
    tranformCategory ? tranformCategory : "All"
  );
  // active class state
  const [active, setActive] = useState(
    tranformCategory ? tranformCategory : "All"
  );

  useEffect(() => {
    filterFunction(category);
  }, [category]);

  // handle change ... it will set category and active states
  const handleChange = (individualSpan) => {
    setActive(individualSpan.categoryId);
    setCategory(individualSpan.categoryId);
    filterFunction(individualSpan.categoryId);
    setCurrentPage(1);
  };
  // filtered products state
  const [filteredProducts, setFilteredProducts] = useState([]);

  // filter function
  const filterFunction = (id) => {
    if (products.length > 0) {
      const filter = products.filter((product) => {
        return (
          (product.category.categoryId === id ||
            id === "All" ||
            category === "All") &&
          product.price >= filterByPrice.min &&
          product.price <= filterByPrice.max
        );
      });
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };

  // Callback filterFunction when filterByPrice changed
  useEffect(() => {
    filterFunction(category);
  }, [filterByPrice]);

  const handelFillterByPrice = () => {
    //   get value number from slider
    const value = document.getElementById("minprice").innerText;
    const priceMin = value.split(".").join("");
    const value2 = document.getElementById("maxprice").innerText;
    const priceMax = value2.split(".").join("");
    //   set filterByPrice state
    setFilterByPrice({
      min: Number(priceMin),
      max: Number(priceMax),
    });
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (filteredProducts.length > 0) {
      return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }
    // return products.slice(firstPageIndex, lastPageIndex);
    return [];
  }, [currentPage, filteredProducts, products]);

  ///handle button add to cart
  const addToCart = async (e, item) => {
    e.preventDefault();
    if (!user) {
      navigate("/signin");
    } else {
      if (item.quantity === 0) {
        showNotification(
          "warning",
          "HUHU OH NO !!!",
          "Not enough products, my friends",
          "Choose others"
        );
      } else {
        const cartItem = {
          id: {
            username: user.username,
            productId: item.productId,
          },
          quantity: 1,
        };
        const resultCheck = await checkQuantity(
          cartItem,
          item.quantity,
          listCartRedux
        );
        if (resultCheck) {
          const res = await insertCartApi(
            cartItem,
            user.username,
            item.productId
          );
          if (res.status === 200) {
            navigate("/cart");
            window.scrollTo(0, 0);
          } else
            showNotification("error", "Oh No", "Not enough, try again", "Ok");
        } else {
          showNotification("error", "Oh No", "Not enough, try again", "Ok");
        }
      }
    }
  };

  // Range slider
  const [valueSlider, setValueSlider] = useState([
    Number(filterByPrice.min),
    Number(filterByPrice.max),
  ]);
  const handleChangeSlider = (event, newValue) => {
    setValueSlider(newValue);
    //change dom min and max price
    document.querySelector("#minprice").innerHTML = Intl.NumberFormat(
      "de-DE"
    ).format(newValue[0]);
    document.querySelector("#maxprice").innerHTML = Intl.NumberFormat(
      "de-DE"
    ).format(newValue[1]);
  };

  return (
    <section className="shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="shop__sidebar">
              {/* Categories */}
              <div className="sidebar__categories">
                <div className="section-title">
                  <h4>Categories</h4>
                </div>
                <div className="categories__accordion">
                  <div className="accordion" id="accordionExample">
                    {spans.map((individualSpan, index) => (
                      <div key={index} className="card">
                        <div className="card-heading active">
                          <a
                            id={individualSpan.categoryId}
                            onClick={() => handleChange(individualSpan)}
                            className={
                              individualSpan.categoryId === active
                                ? "active"
                                : ""
                            }
                          >
                            {individualSpan.name}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Categories */}
              {/* Filter by price */}
              <div className="sidebar__filter">
                <div className="section-title">
                  <h4>Shop by price</h4>
                </div>
                <div className="filter-range-wrap">
                  <div>
                    <Slider
                      max={priceShow.max}
                      min={priceShow.min}
                      value={valueSlider}
                      onChange={handleChangeSlider}
                      valueLabelDisplay="auto"
                    />
                    <div className="range-slider">
                      <div className="price-input">
                        <p>Price:</p>
                        <span> </span>
                        <span id="minprice">
                          {Intl.NumberFormat("de-DE").format(filterByPrice.min)}
                        </span>
                        <span>{" VND "} - </span>
                        <span id="maxprice">
                          {Intl.NumberFormat("de-DE").format(filterByPrice.max)}
                        </span>
                        <span>{" VND "}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <a onClick={() => handelFillterByPrice()} href="#">
                  Filter
                </a>
              </div>
              {/* Filter by price */}
            </div>
          </div>
          {/* Shop */}
          <div className="col-lg-9 col-md-9">
            <div className="row d-flex">
              <Fragment>
                {currentTableData.length > 0 ? (
                  currentTableData.map((individualFilteredProduct) => (
                    <div
                      key={individualFilteredProduct.productId}
                      className="col-lg-4 col-md-6"
                    >
                      <Link
                        to={`/product/${individualFilteredProduct.productId}`}
                      >
                        <div className="product__item">
                          <div
                            className="product__item__pic set-bg"
                            data-setbg={
                              JSON.parse(individualFilteredProduct.image).image1
                            }
                            style={{
                              backgroundImage: `url(${JSON.parse(individualFilteredProduct.image)
                                .image1
                                })`,
                              backgroundSize: "contain",
                              backgroundPosition: "center"
                            }}
                          >
                            {individualFilteredProduct &&
                              individualFilteredProduct.quantity < 1 ? (
                              <div className="label soldout">Sold out</div>
                            ) : (
                              ""
                            )}
                            <ul className="product__hover">
                              <li>
                                <a
                                  href={
                                    JSON.parse(individualFilteredProduct.image)
                                      .image1
                                  }
                                  className="image-popup"
                                >
                                  <span className="arrow_expand" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <span className="icon_heart_alt" />
                                </a>
                              </li>
                              <li>
                                <Link
                                  to="/cart"
                                  onClick={(e) =>
                                    addToCart(e, individualFilteredProduct)
                                  }
                                >
                                  <span className="icon_bag_alt" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="product__item__text">
                            <h6>
                              <Link
                                to={`/product/${individualFilteredProduct.productId}`}
                              >
                                {individualFilteredProduct.name}
                              </Link>
                            </h6>
                            <Box
                              component="fieldset"
                              mb={3}
                              borderColor="transparent"
                            >
                              <Rating name="read-only" value={value} readOnly />
                            </Box>
                            <div className="product__price">
                              {individualFilteredProduct &&
                                individualFilteredProduct.price
                                ? individualFilteredProduct.price.toLocaleString(
                                  "it-IT",
                                  { style: "currency", currency: "VND" }
                                )
                                : null}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>
                    <h3>No product found</h3>
                  </div>
                )}
              </Fragment>

              {/* Pagination */}
              <div className="col-lg-12 text-center pagination_center">
                <Pagination
                  className="pagination__option"
                  currentPage={currentPage}
                  totalCount={filteredProducts.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
          {/* Shop */}
        </div>
      </div>
    </section>
  );
}
export default Shop;
