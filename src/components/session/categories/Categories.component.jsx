import { NavLink, Link } from "react-router-dom";
import "./styles.css";
function Categories() {
  return (
    <div>
      <section className="categories">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="categories__item categories__large__item  setbackground">
                <div className="categories__text">
                  <h1 className="Header_Categories">Laptop</h1>
                  <p className="Header_Categories">
                    Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                    incidid-unt labore edolore magna aliquapendisse ultrices
                    gravida.
                  </p>
                  <Link
                    className="Header_Categories"
                    to="/shop"
                    state={{ category: "C01" }}
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div
                className="categories__item categories__large__item set-bg setbackground-Phone"
                data-setbg="/img/categories/IphoneHeader.jpg"
              >
                <div className="categories__text">
                  <h1 className="Header_Categories">Smart Phone</h1>
                  <p className="Header_Categories">
                    Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                    incidid-unt labore edolore magna aliquapendisse ultrices
                    gravida.
                  </p>
                  <Link
                    className="Header_Categories"
                    to="/shop"
                    state={{ category: "C02" }}
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
