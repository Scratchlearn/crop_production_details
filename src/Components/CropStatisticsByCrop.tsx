import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import dataset from "../Manufac _ India Agro Dataset.json"; // Import dataset for use
import './styles.css'; // Import the CSS file for styling

function CropStatisticsByCrop() {
    const [tableData2, setTableData2] = useState([]); // State to store table data for Table 2

    // useEffect hook to process dataset and generate table data
    useEffect(() => {
        const cropStats = {}; // Object to track yield and area by crop

        // Loop through each item in the dataset
        dataset.forEach(item => {
            const cropName = item["Crop Name"]; // Extract crop name
            const yieldValue = parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0; // Extract yield and ensure it's a number
            const areaValue = parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0; // Extract area and ensure it's a number

            // Aggregate yield and area for each crop
            if (!cropStats[cropName]) {
                cropStats[cropName] = {
                    cropName,
                    totalYield: yieldValue,
                    totalArea: areaValue,
                    count: 1,
                };
            } else {
                cropStats[cropName].totalYield += yieldValue;
                cropStats[cropName].totalArea += areaValue;
                cropStats[cropName].count += 1;
            }
        });

        // Convert cropStats to an array and calculate averages for each crop
        const finalData2 = Object.values(cropStats).map(item => ({
            cropName: item.cropName,
            averageYield: item.totalYield / item.count, // Average yield per crop
            averageArea: item.totalArea / item.count,   // Average area per crop
        }));

        // Set the state with processed data
        setTableData2(finalData2);
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <div className="table-container">
            <h2>Table 2: Average Yield and Area by Crop</h2>
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Crop</th>
                        <th>Average Yield of the Crop between 1950-2020</th>
                        <th>Average Cultivation Area of the Crop between 1950-2020</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData2.map((row) => (
                        <tr key={row.cropName}>
                            <td>{row.cropName}</td>
                            <td>{row.averageYield.toFixed(3)}</td> {/* Display average yield to 3 decimal places */}
                            <td>{row.averageArea.toFixed(3)}</td> {/* Display average area to 3 decimal places */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CropStatisticsByCrop;
