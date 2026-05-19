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
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />

                <Route
                    path="accommodations"
                    element={
                        <ProtectedRoute>
                            <AccommodationsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="accommodations/:id"
                    element={
                        <ProtectedRoute>
                            <AccommodationDetailsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="hosts"
                    element={
                        <ProtectedRoute>
                            <HostsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="hosts/:id"
                    element={
                        <ProtectedRoute>
                            <HostDetailsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="countries"
                    element={
                        <ProtectedRoute>
                            <CountriesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="countries/:id"
                    element={
                        <ProtectedRoute>
                            <CountryDetailsPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;