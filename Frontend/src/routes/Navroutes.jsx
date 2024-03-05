import { Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Timer from "../pages/Timer/Timer";
import Reports from "../pages/Reports/Reports";
import Insights from "../pages/Insights/Insights";
import Manage from "../routes/Manage";
import Projects from "../pages/Projects/Projects";
import Clients from "../pages/Clients/Clients";
import Team from "../pages/Team/Team";
import Tags from "../pages/Tags/Tags";
import BillableRates from "../pages/BillableRates/BillableRates";
import Admin from "../routes/Admin";
import Organization from "../pages/Organization/Organization";
import Settings from "../routes/Settings";

function Navroutes() {
  return (
    <div>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/manage/:bID" element={<Manage />} />
          <Route path="/manage/projects" element={<Projects />} />
          <Route path="/manage/clients" element={<Clients />} />
          <Route path="/manage/team" element={<Team />} />
          <Route path="/manage/tags" element={<Tags />} />
          <Route path="/manage/billable rates" element={<BillableRates />} />
          <Route path="/admin/:aID" element={<Admin />} />
          <Route path="/admin/organization" element={<Organization />} />
        </Routes>
      </RootLayout>
    </div>
  );
}

export default Navroutes;
