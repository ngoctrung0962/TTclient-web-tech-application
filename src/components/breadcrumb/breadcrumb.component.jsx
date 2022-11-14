import { useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  return (
    <div className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb__links">
              <a href="./index.html">
                <i className="fa fa-home" /> Home
              </a>
              <span>{location.pathname.slice(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
