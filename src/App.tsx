
import CropProductionByYear from "./Components/CropProductionByYear"; // Import Table 1
import CropStatisticsByCrop from "./Components/CropStatisticsByCrop"; // Import Table 2
import './Components/styles.css'; // Import the CSS file
import { MantineProvider } from "@mantine/core"; 

function App() {
  return (
    <MantineProvider>
    <div className="tables-container">
      {/* Display Table 1 and Table 2 side by side */}
      <div className="table-container">
        <CropProductionByYear />
      </div>
      <div className="table-container">
        <CropStatisticsByCrop />
      </div>
    </div>
    </MantineProvider>
  );
}

export default App;
