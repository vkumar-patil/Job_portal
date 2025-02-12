import { Routes, Route } from "react-router-dom";
import Register from "./COMPONANT/Register";
import Login from "./COMPONANT/Login";
import Seekers from "./Seekers/Seekers";
import Jobdetails from "./Seekers/Jobdetails";
import ApplyFom from "./Seekers/ApplyFom";
import JobpostFom from "./COMPONANT/Employers/JobpostFom";
import EmployDetail from "./COMPONANT/Employers/EmployerDetail";
import EjobDetails from "./COMPONANT/Employers/Ejobdetails";
import ApplyedFoms from "./Seekers/ApplyedFoms";
import {Userprovider}  from "./COMPONANT/Employers/useContext";
function App() {
  return (
    <Userprovider>
      <Routes>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Seekers" element={<Seekers />}></Route>
        <Route path="/Jobdetails/:id" element={<Jobdetails />}></Route>
        <Route path="/ApplyFom/:id" element={<ApplyFom />}></Route>
        <Route path="/JobpostFom" element={<JobpostFom />}></Route>
        <Route path="/EmployDetail" element={<EmployDetail />}></Route>
        <Route path="/EjobDetails/:id" element={<EjobDetails />}></Route>
        <Route path="/ApplyedFoms" element={<ApplyedFoms />}></Route>
      </Routes>
   </Userprovider>
  );
}

export default App;
