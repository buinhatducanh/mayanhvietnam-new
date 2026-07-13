import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brands from "./pages/Brands";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "san-pham", Component: Products },
      { path: "san-pham/:slug", Component: ProductDetail },
      { path: "thuong-hieu", Component: Brands },
      { path: "lien-he", Component: Contact },
      { path: "*", Component: Home },
    ],
  },
]);
