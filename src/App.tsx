import { Route, Routes } from "react-router";
import Homepage from "./pages/homepage/Homepage";
import ProductList from "./components/ProductList";
import ProductItem from "./components/productItem/ProductItem";
import Bucket from "./components/Bucket";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />}>
                <Route index element={<ProductList/>} />
                <Route path="category/:categoryID" element={<ProductList />} />
                <Route path="category/:cat/products/:productID" element={<ProductItem />} />
                <Route path="bucket" element={<Bucket/>}/>
                <Route path="*" element={<ProductList/>}/>
            </Route>
        </Routes>
    );
}

export default App;
