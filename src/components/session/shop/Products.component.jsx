import Pagination from "./Pagination.component";

function Products() {
  return (
    <div className="col-lg-9 col-md-9">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-1.jpg"
            >
              <div className="label new">New</div>
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-1.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Furry hooded parka</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-2.jpg"
            >
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-2.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Flowy striped skirt</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 49.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-3.jpg"
            >
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-3.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Croc-effect bag</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-4.jpg"
            >
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-4.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Dark wash Xavi jeans</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item sale">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-5.jpg"
            >
              <div className="label">Sale</div>
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-5.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Ankle-cuff sandals</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">
                $ 49.0 <span>$ 59.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-6.jpg"
            >
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-6.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Contrasting sunglasses</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-7.jpg"
            >
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-7.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Circular pendant earrings</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-8.jpg"
            >
              <div className="label stockout stockblue">Out Of Stock</div>
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-8.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Cotton T-Shirt</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="product__item sale">
            <div
              className="product__item__pic set-bg"
              data-setbg="img/shop/shop-9.jpg"
            >
              <div className="label">Sale</div>
              <ul className="product__hover">
                <li>
                  <a href="img/shop/shop-9.jpg" className="image-popup">
                    <span className="arrow_expand" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="#">Water resistant zips backpack</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">
                $ 49.0 <span>$ 59.0</span>
              </div>
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}
export default Products;
