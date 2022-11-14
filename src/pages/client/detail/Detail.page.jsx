import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import productApi from '../../../api/productApi';
import reviewApi from '../../../api/reviewApi';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Header from '../../../components/header/Header.component';
import Footer from '../../../components/footer/Footer.component';
import { useSelector, useDispatch } from 'react-redux';
import { showNotification, checkQuantity } from "../../../utils/MyUtils";
import { getAllCarts, deleteCartRedux, updateCartRedux, insertCartRedux } from '../../../redux/cartRedux'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import { Fragment } from "react";
import { SlidePhoto } from '../../../components/slidephoto';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
  color: {
    color: "red"
  }
}));
function Detail() {
  const classes = useStyles();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const listCart = useSelector((state) => state.cart.listCart);
  const updateCart = useSelector((state) => state.cart.updateItem);
  const deleteCart = useSelector((state) => state.cart.deleteItem);
  const insertCart = useSelector((state) => state.cart.addItem);

  // Product
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({})

  //Product by brandid
  const [brandId, setBrandId] = useState('');
  const [listproducts, setlistProducts] = useState([]);

  //Hiệu ứng loading
  const [loading, setLoading] = useState(true)

  //review by productid
  const [reviews, setReviews] = useState([])

  //Rating product
  const [value, setValue] = useState(5);

  //Rating adcomment for product
  const [valueratingaddreview, setValueratingaddreview] = useState(0);

  //Add comment 
  const [content, setContent] = useState("");

  //start logic for handle adding cart
  const [inputQuantity, setInputQuantity] = useState(1);
  useEffect(async () => {
    if (user) {
      await getAllCarts(dispatch, user.username);
    }
  }, [])

  useEffect(async () => {
    if (user) {
      await getAllCarts(dispatch, user.username);
    }
  }, [updateCart, insertCart, deleteCart])



  //Endd logic for handle adding cart

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(e.target.value)
  }
  const handleDeletereview = async (reviewId) => {
    try {
      await reviewApi.remove(user.username, reviewId)
      const dataFilter = reviews.filter(item => item.reviewId !== reviewId)
      setReviews(dataFilter)
      showNotification('success', 'Delete review success', '', 'OK')
    } catch (error) {
      showNotification('error', 'Delete review fail', '', 'OK')
    }

  }
  const handlesumitAddcomment = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const dataSubmit = {
          content: content,
          rate: valueratingaddreview,
        }
        const resreviews = await reviewApi.add(user.username, productId, (dataSubmit))

        setReviews(state => [...state, resreviews])
        setContent("")
        setValueratingaddreview(0)
      } catch (error) {
      }
    }
    else {
      nav("/signin")
    }

  }
  //Load product
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await productApi.get(`${productId}`);
        setBrandId(res.brand.brandId)
        setProduct(res)
        window.scrollTo(0, 0)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData();
  }, [productId])



  //Load review by productId
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await reviewApi.getreviewbyproductId(productId);
        setReviews(res);
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData();
  }, [productId])

  //load listProduct by brandId
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (brandId) {
        try {
          const res = await productApi.getproductbybrandId(brandId, 2);
          if (!res.status || res.status === 200) {
            setlistProducts(res);
          }
        } catch (error) {
          console.log(error)
        }
      }
      setLoading(false)
    }
    fetchData();
  }, [brandId])
  console.log("product", product)
  console.log("productbybrand", listproducts)
  // Tổng review cho product
  let quantityrv = reviews.length;

  const reviewbyproduct_id = reviews.map((review, index) => {
    return (
      <div key={index}>
        <div className="col-lg-6 col-md-7 col-sm-8">
          <div className="services__item">
            <img src="https://i.pinimg.com/564x/44/15/ba/4415ba5df0f4bfcee5893d6c441577e0.jpg" alt="" />
            <p className="commentName">{review.username}
              {user && review.username === user.username ?

                <DeleteIcon className='margin' onClick={() => handleDeletereview(review.reviewId)} /> : ""}

            </p>
            <p>{review ? review.content : null}</p>
            <p>{review ? review.time.slice(0, 10) : ""}</p>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={review.rate} readOnly />
            </Box>
          </div>
        </div>
      </div>
    )
  })
  const listProductsbybrandId = listproducts.map((product, index) => {
    if (product.productId !== productId) {
      return (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6">
          <Link to={`/product/${product.productId}`}>
            <div className="product__item">
              <div className="product__item__pic set-bg" data-setbg={product ? product.image : null}
                style={{
                  backgroundImage: `url(${product.image ? JSON.parse(product.image).image1 : ""})`,

                  backgroundSize: "contain",
                  backgroundPosition: "center"
                }}>
                {product && product.quantity < 1 ? <div className="label soldout">Sold out</div> : <div className="label new">New</div>}

                <ul className="product__hover">
                  <li><a href="img/product/related/rp-1.jpg" className="image-popup"><span className="arrow_expand" /></a></li>
                  <li><a href="#"><span className="icon_heart_alt" /></a></li>
                  <li><a href="#"><span className="icon_bag_alt" /></a></li>
                </ul>
              </div>
              <div className="product__item__text">
                <h6><Link to={`/product/${product.productId}`} >{product.name}</Link></h6>
                {/* <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div> */}
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <div className="product__price">{product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
              </div>
            </div>
          </Link>
        </div >
      )
    }
  })

  const addToCart = async (e) => {
    e.preventDefault()
    if (!user)
      nav('/signin')
    
    //////
    const input = parseInt(inputQuantity);
    if(input <= 0){
      showNotification("error", "ERROR", "Invalid input quantity", 'OK');
    }
    else{

      if (product.quantity === 0) {
        showNotification("warning", "HUHU OH NO !!!", "Not enough products, my friends", "Choose others");
      }
      else {
        const cartItem = {
          id: {
            username: user.username,
            productId: product.productId,
          },
          quantity: input
        };
        
        const resultCheck = checkQuantity(cartItem, product.quantity, listCart);
        if (resultCheck) {
          const res = await insertCartRedux(dispatch, cartItem, user.username, product.productId);
          if (res !== undefined)
            showNotification("success", "Great", "Add to cart successful", "Ok");
          else
            showNotification("error", "Oh No", "Not enough, try again", "Ok");
        }
        else {
          showNotification("error", "Oh No", "Not enough, try again", "Ok");
        }
      }
    }
  }

  return (
    <>

      <Header />


      <section className="product-details spad">
        <div className="container">

          <div className="row">
            <div className="col-lg-6">
              <div className="product__details__pic" >
                <SlidePhoto imageUrl={product && product.image ? JSON.parse(product.image) : ""} />
                {/* <div className="product__details__pic__left product__thumb nice-scroll"  >
                  <a className="pt active " href="#product-1" >
                    <img src={product.image} alt="" />
                  </a>
                  <a className="pt " href="#product-2">
                    <img src={product.image} alt="" />
                  </a>
                  <a className="pt" href="#product-3">
                    <img src={product.image} alt="" />
                  </a>
                  <a className="pt" href="#product-4">
                    <img src={product.image} alt="" />
                  </a>
                </div>
                <div className="product__details__slider__content  "  >
                  <div className="product__details__pic__slider owl-carousel"  >
                    <img data-hash="product-1" className="product__big__img" src={product.image} alt="" />
                    <img data-hash="product-2" className="product__big__img" src={product.image} alt="" />
                    <img data-hash="product-3" className="product__big__img" src={product.image} alt="" />
                    <img data-hash="product-4" className="product__big__img" src={product.image} alt="" />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__details__text">
                <h3>{product.name}<span>Hãng sản xuất: {product && product.brand ? product.brand.name : null} </span></h3>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <div className="rating">
                  {/* <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" /> */}
                  <span> {quantityrv} reviews</span>
                </div>
                <div className="product__details__price">{product && product.price ? product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : null}   <span></span></div>
                <p>{product.des}</p>
                <div className="product__details__button">
                  <div className="quantity">
                    <span>Quantity:</span>
                    <div className="pro-qty">
                      <input type="number" defaultValue={1} onChange={(e) => e.target.value === '' ? setInputQuantity(1) : setInputQuantity(e.target.value)} />
                    </div>
                  </div>
                  {product && product.quantity > 0 ?
                    <a disabled={product.quantity < 1} href="" className="cart-btn" onClick={(e) => addToCart(e)}><span className="icon_bag_alt" /> Add to cart</a> :
                    <a className="cart-btn sold-out" ><span className="icon_bag_alt" /> Sold out</a>}


                </div>
                <div className="product__details__widget">
                  <ul>
                    <li>
                      <span>Số lượng còn lại: </span>
                      <p>{product.quantity}</p>
                    </li>
                    <li>
                      <span>Màn hình:</span>
                      <p>{product.screen} Inch</p>
                    </li>
                    <li>
                      <span>Camera: </span>
                      <p>{product.frontCam} MP</p>
                    </li>
                    <li>
                      <span>CPU: </span>
                      <p>{product.cpu}</p>
                    </li>
                    <li>
                      <span>RAM: </span>
                      <p>{product.ram} GB</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Specification</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews ({quantityrv})</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6>Description</h6>
                    <p>{product.description}</p>

                  </div>
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <h6>Specification</h6>
                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Thông tin hàng hóa</p>
                    <p>Xuất xứ:  {product && product.brand ? product.brand.location : null}</p>
                    <p>Hãng sản xuất: {product && product.brand ? product.brand.name : null} </p>

                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Thiết kế & Trọng lượng</p>
                    <p>Trọng lượng:  {product ? product.weight : null}</p>

                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Bộ xử lý</p>
                    <p>CPU:  {product ? product.cpu : null}</p>

                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>RAM</p>
                    <p>RAM:  {product ? product.ram : null} GB</p>

                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Màn hình</p>
                    <p>Kích thước màn hình:  {product ? product.screen : null} inch</p>

                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Lưu trữ</p>
                    <p>ROM:  {product ? product.rom : null} GB</p>

                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Camera</p>
                    <p>Cam trước:  {product ? product.frontCam : null} MP</p>
                    <p>Cam sau:  {product ? product.backCam : null} MP</p>

                    <p style={{ fontSize: "16px", fontWeight: "500", color: "black" }}>Pin</p>
                    <p>Dung lượng:  {product ? product.battery : null} </p>

                  </div>


                  <div className="tab-pane" id="tabs-3" role="tabpanel">
                    <h6>Reviews ({quantityrv})</h6>
                    <div className="contact__address avatar-reviewer">
                      <h5>Danh sách bình luận</h5>

                      {reviewbyproduct_id}
                    </div>
                    <div className=" contact__form">
                      <h5>Thêm bình luận</h5>
                      <form onSubmit={handlesumitAddcomment}>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                          <Rating name="simple-controlled" onChange={(event, newValue) => { setValueratingaddreview(newValue); }} value={valueratingaddreview} />
                        </Box>
                        <textarea name="content" placeholder="Hãy nhập bình luận của bạn" value={content} onChange={handleChange} required />
                        <button type="submit" className="site-btn">Add review</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="related__title">
                <h5>RELATED PRODUCTS</h5>
              </div>
            </div>
            {listProductsbybrandId ? listProductsbybrandId : ""}

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Detail;