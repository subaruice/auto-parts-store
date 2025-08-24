import { Route, Routes } from "react-router";
import Homepage from "./pages/homepage/Homepage";
import ProductList from "./components/ProductList";
import ProductItem from "./components/productItem/ProductItem";
import Bucket from "./components/Bucket";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/profile/Profile";
import Orders from "./pages/profile/Orders";
import PerfosnalInfo from "./pages/profile/PerfosnalInfo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />}>
                <Route index element={<ProductList />} />
                <Route path="category/:categoryID" element={<ProductList />} />
                <Route path="category/:cat/products/:productID" element={<ProductItem />} />
                <Route path="bucket" element={<Bucket />} />
                <Route path="about" element={<About />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="profile/" element={<Profile />}>
                        <Route index element={<PerfosnalInfo />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="*" element={<Profile />} />
                    </Route>
                </Route>
                <Route path="*" element={<ProductList />} />
            </Route>
        </Routes>
    );
}

export default App;
