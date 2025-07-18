import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import FileUpload from "./pages/FileUpload";
import UploadHistory from "./pages/UploadHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import GoogleMapView from "./pages/GoogleMapView";
import PotreeViewer from "./pages/PotreeViewer";
import { LoadScript } from "@react-google-maps/api";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DataCleaning from "./pages/DataCleaning";
import UploadCenter from "./pages/UploadCenter";
import AdminPage from "./pages/AdminPage/AdminPage";

function AppContent() {
  const location = useLocation();
  const isMapPage =
    location.pathname === "/map" ||
    location.pathname === "/google-map" ||
    location.pathname === "/potree-viewer";

  return isMapPage ? (
    <>
      <Header />
      <Routes>
        <Route path="/google-map" element={<GoogleMapView />} />
        <Route path="/potree-viewer" element={<PotreeViewer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/history" element={<UploadHistory />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  ) : (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/data-cleaning" element={<DataCleaning />} />
        <Route path="/history" element={<UploadHistory />} />
        <Route path="/google-map" element={<GoogleMapView />} />
        <Route path="/potree-viewer" element={<PotreeViewer />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/upload-center" element={<UploadCenter />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LoadScript>
  );
}

export default App;
