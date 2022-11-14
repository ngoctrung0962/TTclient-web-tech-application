import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-7">
            <div className="footer__about">
              <div className="footer__logo">
                <Link
                  onClick={(e) => {
                    window.scrollTo(0, 0);
                  }}
                  to="/"
                >
                  <img src={require("../footer/LogoTechShop.png")} alt="" />
                </Link>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt cilisis.
              </p>
              <div className="footer__payment">
                <a href="#">
                  <img src="img/payment/payment-1.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-2.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-3.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-4.png" alt="" />
                </a>
                <a href="#">
                  <img src="img/payment/payment-5.png" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-5">
            <div className="footer__widget">
              <h6>Quick links</h6>
              <ul>
                <li>
                  <Link
                    onClick={(e) => {
                      window.scrollTo(0, 0);
                    }}
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      window.scrollTo(0, 0);
                    }}
                    to="/shop"
                  >
                    Shop
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="footer__widget">
              <h6>Account</h6>
              <ul>
                <li>
                  <Link to="/account/detail">My Account</Link>
                </li>
                <li>
                  <Link to="/account/history">Orders History</Link>
                </li>
                <li>
                  <Link to="/checkout">Checkout</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-8 col-sm-8">
            <div className="footer__newslatter">
              <h6>NEWSLETTER</h6>
              <form action="#">
                <input type="text" placeholder="Email" />
                <button type="submit" className="site-btn">
                  Subscribe
                </button>
              </form>
              <div className="footer__social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa fa-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            <div className="footer__copyright__text">
              <p>
                Copyright © All rights reserved | This template is made with{" "}
                <i className="fa fa-heart" aria-hidden="true" /> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib{" "}
                </a>
                and customized by{" "}
                <a
                  href="https://github.com/thanhnam2811/client-web-tech-appliances"
                  target="_blank"
                >
                  Group 11
                </a>
              </p>
            </div>
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
