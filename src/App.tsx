import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import RepositoriesProvider from "./contexts/repositories/RepositoriesProvider";

const App = () => {
  return (
    <RepositoriesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </RepositoriesProvider>
  );
};

export default App;
