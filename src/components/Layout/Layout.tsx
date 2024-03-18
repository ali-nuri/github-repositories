import { Outlet } from "react-router-dom";
import Page from "../Page";

const Layout = () => {
  return (
    <Page>
      <Outlet />
    </Page>
  );
};

export default Layout;
