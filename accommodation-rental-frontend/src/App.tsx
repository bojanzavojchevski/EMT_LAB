import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AccommodationsPage from "./pages/AccommodationsPage";
import AccommodationDetailsPage from "./pages/AccommodationDetailsPage";
import HostsPage from "./pages/HostsPage";
import HostDetailsPage from "./pages/HostDetailsPage";
import CountriesPage from "./pages/CountriesPage";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />

                <Route path="accommodations" element={<AccommodationsPage />} />
                <Route path="accommodations/:id" element={<AccommodationDetailsPage />} />

                <Route path="hosts" element={<HostsPage />} />
                <Route path="hosts/:id" element={<HostDetailsPage />} />

                <Route path="countries" element={<CountriesPage />} />
                <Route path="countries/:id" element={<CountryDetailsPage />} />
            </Route>
        </Routes>
    );
};

export default App;