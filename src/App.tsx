import { Route, Routes } from "react-router";
import Homepage from "./pages/homepage/Homepage";
import Layout from "./components/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="category/:categoryID" element={<Homepage />} />
                <Route path="products/:productID" element={<Homepage />} />
            </Route>
        </Routes>
    );
}

export default App;
