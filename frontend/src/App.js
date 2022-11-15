import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import Footer from "./components/Footer/Footer";
import SignUp from "./components/SignUp/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import SignIn from "./components/SignIn/SignIn";
import AddProduct from './components/Add Products/AddProduct';
import ProductsList from './components/Show Products/ProductsList';
import UpdateProducts from  './components/Update Products/UpdateProducts';
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={ <PrivateComponent />}>
            <Route path="/" element={<ProductsList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/updates/:id" element={<UpdateProducts/>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
