import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { DropsPage, LoginPage, SignupPage } from "./utils/lazyLoad";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DropsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
