import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { InstituteRegister } from "./pages/Institute_Registration/InstituteRegister";
import { Verification } from "./pages/Verification/Verification";
import { Staffing } from "./pages/Staffing/Staffing";
import { Academics } from "./pages/Academics/Academics";
import { Workload } from "./pages/Workload/Workload";
import { NOC } from "./pages/NOC/NOC";
import { Assets } from "./pages/Assets/Assets";
import { LegalCases } from "./pages/Legal_Cases/LegalCases";
import { Students } from "./pages/Students/Students";
import { RTI } from "./pages/RTI/RTI";
import { Settings } from "./pages/Settings/Settings";
import { Reports } from "./pages/Reports/Reports";
import { Grievance } from "./pages/Grievance/Grievance";
import { InstituteProfile } from "./pages/Institute_Registration/InstituteProfile";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  // Check if user is logged in for root route
  const isAuthenticated = () => {
    return localStorage.getItem("user") && localStorage.getItem("role");
  };

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE","JD","DIRECTOR","SECRETARY"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/institute-registration">
          <Route
            path="register"
            element={
              <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE"]}>
                <InstituteRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE"]}>
                <InstituteProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/verification/application"
          element={
            <ProtectedRoute allowedRoles={["JD","DIRECTOR","SECRETARY"]}> 
              <Verification />
            </ProtectedRoute>
          }
        />

        <Route
          path="/grievance"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE","JD","DIRECTOR","SECRETARY"]}>
              <Grievance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staffing"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","JD"]}>
              <Staffing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE","JD","DIRECTOR","SECRETARY"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academics"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE"]}>
              <Academics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workload"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE","JD"]}>
              <Workload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/noc"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE","JD","DIRECTOR","SECRETARY"]}>
              <NOC />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assets"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE"]}>
              <Assets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/legal-cases"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE"]}>
              <LegalCases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE"]}>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rti"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","INSTITUTE","JD","DIRECTOR","SECRETARY"]}> 
              <RTI />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","JD","DIRECTOR","SECRETARY"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
