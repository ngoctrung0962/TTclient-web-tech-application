import { Fragment } from "react";
import Footer from "../../../components/footer/Footer.component";
import Header from "../../../components/header/Header.component";
import Instagram from "../../../components/instagram/Instagram.component";
import OffCanvasMenu from "../../../components/offCanvasMenu/OffCanvasMenu.component";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb.component";
import Shop from "../../../components/session/shop/Shop.component";

function ShopPage() {
  return (
    <Fragment>
      <OffCanvasMenu />
      <Header />
      <Breadcrumb />
      <Shop />
      <Instagram />
      <Footer />
    </Fragment>
  );
}

export default ShopPage;
