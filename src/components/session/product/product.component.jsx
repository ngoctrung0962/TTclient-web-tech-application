import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";
import { Fragment } from "react";
import { showNotification, checkQuantity } from "../../../utils/MyUtils";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { insertCartRedux } from "../../../redux/cartRedux";
function Product() {
  const user = useSelector((state) => state.user.currentUser);
  const listCartRedux = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const [value, setValue] = useState(5);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await productApi.getTop8ProductsNewest();
        console.log(products);
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("error");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // categories list rendering using span tag
  const [spans] = useState([
    { id: "All", text: "All products" },
    { id: "Laptop", text: "Laptop" },
    { id: "SmartPhone", text: "SmartPhone" },
  ]);

  // active class state
  const [active, setActive] = useState("All");

  // category state
  const [category, setCategory] = useState([]);
  useEffect(() => {
    filterFunction(category);
  }, [category]);
  // handle change ... it will set category and active states
  const handleChange = (individualSpan) => {
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  };
  // filtered products state
  const [filteredProducts, setFilteredProducts] = useState(products);

  // filter function
  // console.log(products);

  const filterFunction = (text) => {
    if (products.length > 0) {
      const filter = products.filter((product) => {
        return (
          product.category.name === text ||
          text === "All products" ||
          category === "All products"
        );
      });
      console.log(filter);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };

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
          const res = await insertCartRedux(
            dispatch,
            cartItem,
            user.username,
            item.productId
          );
          console.log(res);
          if (res === 200) {
            showNotification("success", "Great", "Add to cart ssuccess", "Ok");
          } else
            showNotification("error", "Oh No", "Not enough, try again", "Ok");
        } else {
          showNotification("error", "Oh No", "Not enough, try again", "Ok");
        }
      }
    }
  };

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="section-title">
              <h4>New products</h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-8">
            <ul className="filter__controls">
              {spans.map((span) => {
                return (
                  <li
                    key={span.id}
                    className={span.id === active ? "active" : ""}
                    onClick={() => handleChange(span)} // handle change
                  >
                    {span.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="row property__gallery">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="col-lg-3 col-md-4 col-sm-6 mix women"
              >
                <Link to={`/product/${product.productId}`}>
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      data-setbg={JSON.parse(product.image).image1}
                      // set style background-image
                      style={{
                        backgroundImage: `url(${JSON.parse(product.image).image1
                          })`,
                        backgroundSize: "contain",
                        backgroundPosition: "center"
                      }}
                    >
                      <div className="label new">New</div>
                      <ul className="product__hover">
                        <li>
                          <a
                            href={JSON.parse(product.image).image1}
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
                          <Link onClick={(e) => addToCart(e, product)} to="/cart">
                            <span className="icon_bag_alt" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <Link to={`/product/${product.productId}`}>
                          {product.name}
                        </Link>
                      </h6>
                      {/* <div className="rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                    </div> */}
                      <Box
                        component="fieldset"
                        mb={3}
                        borderColor="transparent"
                      >
                        <Rating name="read-only" value={value} readOnly />
                      </Box>
                      <div className="product__price">
                        {product && product.price
                          ? product.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                          : null}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>
              <h3>No products</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Product;
