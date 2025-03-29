import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/authenticated/home/Home";
import MainLayout from "./components/layouts/main-layout/MainLayout";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
