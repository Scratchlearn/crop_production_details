import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import dataset from "../Manufac _ India Agro Dataset.json"; // Import dataset for use
import './styles.css'; // Import the CSS file for styling

function CropProductionByYear() {
    const [tableData1, setTableData1] = useState([]); // State to store table data for Table 1

    // useEffect hook to process dataset and generate table data
    useEffect(() => {
        const yearStats = {}; // Object to track max/min production per year

        // Loop through each item in the dataset
        dataset.forEach(item => {
            const year = String(item.Year.replace("Financial Year (Apr - Mar), ", "")); // Extract year
            const production = parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0; // Convert crop production to number, fallback to 0
            const cropName = item["Crop Name"]; // Extract crop name

            // For max/min crop production by year
            if (!yearStats[year]) {
                yearStats[year] = {
                    year,
                    maxCrop: cropName,
                    minCrop: cropName,
                    maxProduction: production,
                    minProduction: production,
                };
            } else {
                // Update the max and min production for the year
                if (production > yearStats[year].maxProduction) {
                    yearStats[year].maxCrop = cropName;
                    yearStats[year].maxProduction = production;
                }
                if (production >= 0 && production < yearStats[year].minProduction) {
                    yearStats[year].minCrop = cropName;
                    yearStats[year].minProduction = production;
                }
            }
        });

        // Convert yearStats object to an array to use it for rendering in the table
        setTableData1(Object.values(yearStats));
    }, []); // Empty dependency array means this effect runs only once on component mount

    return (
        <div className="table-container">
            <h2>Table 1: Crop Production by Year</h2>
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Crop with Maximum Production</th>
                        <th>Crop with Minimum Production</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData1.map((row) => (
                        <tr key={row.year}>
                            <td>{row.year}</td>
                            <td>{row.maxCrop}</td>
                            <td>{row.minCrop}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CropProductionByYear;
