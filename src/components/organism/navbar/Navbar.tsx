import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/">Home</Link>
    </nav>
  );
};

export default Navbar;
