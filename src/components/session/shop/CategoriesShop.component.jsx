function CategoriesShop() {
  return (
    <div className="sidebar__categories">
      <div className="section-title">
        <h4>Categories</h4>
      </div>
      <div className="categories__accordion">
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-heading active">
              <a data-toggle="collapse" data-target="#collapseOne">
                Women
              </a>
            </div>
            <div
              id="collapseOne"
              className="collapse show"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <ul>
                  <li>
                    <a href="#">Coats</a>
                  </li>
                  <li>
                    <a href="#">Jackets</a>
                  </li>
                  <li>
                    <a href="#">Dresses</a>
                  </li>
                  <li>
                    <a href="#">Shirts</a>
                  </li>
                  <li>
                    <a href="#">T-shirts</a>
                  </li>
                  <li>
                    <a href="#">Jeans</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-heading">
              <a data-toggle="collapse" data-target="#collapseTwo">
                Men
              </a>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <ul>
                  <li>
                    <a href="#">Coats</a>
                  </li>
                  <li>
                    <a href="#">Jackets</a>
                  </li>
                  <li>
                    <a href="#">Dresses</a>
                  </li>
                  <li>
                    <a href="#">Shirts</a>
                  </li>
                  <li>
                    <a href="#">T-shirts</a>
                  </li>
                  <li>
                    <a href="#">Jeans</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesShop;
