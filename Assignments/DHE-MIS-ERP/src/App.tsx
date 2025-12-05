// import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { InstituteRegister } from "./pages/Institute_Registration/InstituteRegister";

import { Verification } from "./pages/Verification/Verification";
import { Staffing } from "./pages/Staffing/Staffing";
import { Academics } from "./pages/Academics/Academics";
import { Workload } from "./pages/Workload/Workload";
import { NOC } from "./pages/NOC/NOC";
import { Assets } from "./pages/Assets/Assets";
import { LegalCases } from "../src/pages/Legal_Cases/LegalCases";
import { Students } from "./pages/Students/Students";
import { RTI } from "./pages/RTI/RTI";
import { Settings } from "./pages/Settings/Settings";
import { Reports } from "./pages/Reports/Reports";
import  {Grievance} from "./pages/Grievance/Grievance";
import { InstituteProfile } from "./pages/Institute_Registration/InstituteProfile";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
         {/* Parent */}
  <Route path="institute-registration" >
    
    {/* Children */}
    <Route path="register" element={<InstituteRegister />} />
    <Route path="profile" element={<InstituteProfile />} />
  
  </Route>
        
        <Route path="/verification">
          <Route path="Application" element={<Verification/>}></Route>
        </Route>
        <Route path="/grievance" element={<Grievance />} />
        <Route path="/staffing" element={<Staffing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/workload" element={<Workload />} />
        <Route path="/noc" element={<NOC />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/legal-cases" element={<LegalCases />} />
        <Route path="/students" element={<Students />} />
        <Route path="/rti" element={<RTI />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  );
}

export default App;
