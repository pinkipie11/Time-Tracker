import React from "react";
import Navroutes from "./routes/Navroutes";
import { TimeProvider } from "./pages/Timer/TimeContext";
import { ProjectProvider } from "./pages/Projects/ProjectProvider";

const App = () => {
  return (
    <div>
      <ProjectProvider>
        <TimeProvider>
          <Navroutes />
        </TimeProvider>
      </ProjectProvider>
    </div>
  );
};

export default App;
