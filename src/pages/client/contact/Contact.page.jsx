import React from "react";
import Footer from "../../../components/footer/Footer.component";
import Header from "../../../components/header/Header.component";
import Instagram from "../../../components/instagram/Instagram.component";

function Contact() {
  return (
    <>
      <Header />
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__content">
                <div className="contact__address">
                  <h5>Contact info</h5>
                  <ul>
                    <li>
                      <h6>
                        <i className="fa fa-map-marker" /> Address
                      </h6>
                      <p>
                        Số 1 Võ Văn Ngân Phường Trường Thọ Thành Phố Thủ Đức
                      </p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-phone" /> Phone
                      </h6>
                      <p>
                        <span>125-711-811</span>
                        <span>125-668-886</span>
                      </p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-headphones" /> Support
                      </h6>
                      <p>teammate@student.hcmute.edu.vn</p>
                    </li>
                  </ul>
                </div>
                <div className="contact__form">
                  <h5>SEND MESSAGE</h5>
                  <form action="#">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Website" />
                    <textarea placeholder="Message" defaultValue={""} />
                    <button type="submit" className="site-btn">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.484300946451!2d106.76972825056035!3d10.850721392233195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1652153712707!5m2!1svi!2s"
                  height={780}
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Instagram />
      <Footer />
    </>
  );
}

export default Contact;
