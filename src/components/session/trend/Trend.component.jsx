import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function Trend() {
  const [topSellers, setTopSeller] = useState([]);
  const [topFeatures, setTopFeature] = useState([]);
  const [hottrends, setHotTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topSeller = await productApi.getTopSeller();
        setTopSeller(topSeller);
        const topFeature = await productApi.getTopFeatured();
        setTopFeature(topFeature);
        const hotTrend = await productApi.getHotTrend();
        setHotTrends(hotTrend);
      } catch (error) {
        console.error("error");
      }
    };
    fetchData();
  }, []);

  return (
    <section className="trend spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Hot Trend</h4>
              </div>
              {hottrends.map((product, index) => (
                <div key={index} className="trend__item" >
                  <Link to={`/product/${product.productId}`}>
                    <div className="trend__item__pic">
                      <img src={JSON.parse(product.image).image1} alt="true" />
                    </div>
                    <div className="trend__item__text">
                      <h6>{product.name}</h6>
                      <Box component="fieldset" mb={3} borderColor="transparent">
                        <Rating name="read-only" value={5} readOnly />
                      </Box>
                      {/* <div className="rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div> */}
                      <div className="product__price">
                        {product && product.price
                          ? product.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                          : null}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Best seller</h4>
              </div>
              {topSellers.map((product, index) => (
                <div className="trend__item" key={index}>
                  <Link to={`/product/${product.productId}`}>
                    <div className="trend__item__pic">
                      <img src={JSON.parse(product.image).image1} alt="true" />
                    </div>
                    <div className="trend__item__text">
                      <h6>{product.name}</h6>
                      <div className="rating">
                        <Box
                          component="fieldset"
                          mb={3}
                          borderColor="transparent"
                        >
                          <Rating name="read-only" value={5} readOnly />
                        </Box>
                      </div>
                      <div className="product__price">
                        {product && product.price
                          ? product.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                          : null}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Feature</h4>
              </div>
              {topFeatures.map((product, index) => (
                <div key={index} className="trend__item">
                  <Link to={`/product/${product.productId}`}>
                    <div className="trend__item__pic">
                      <img src={JSON.parse(product.image).image1} alt="true" />
                    </div>
                    <div className="trend__item__text">
                      <h6>{product.name}</h6>
                      <div className="rating">
                        <Box
                          component="fieldset"
                          mb={3}
                          borderColor="transparent"
                        >
                          <Rating name="read-only" value={5} readOnly />
                        </Box>
                      </div>
                      <div className="product__price">
                        {product && product.price
                          ? product.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                          : null}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trend;
