import { Typography } from "@mui/material";
import React, { useState } from "react";
import HTable from "./components/HTable";

const initialData = [
    {
        id: "electronics",
        label: "Electronics",
        originalValue: 1500,
        value: 1500,
        children: [
            { id: "phones", label: "Phones", originalValue: 800, value: 800 },
            { id: "laptops", label: "Laptops", originalValue: 700, value: 700 },
        ],
    },
    {
        id: "furniture",
        label: "Furniture",
        originalValue: 1000,
        value: 1000,
        children: [
            { id: "tables", label: "Tables", originalValue: 300, value: 300 },
            { id: "chairs", label: "Chairs", originalValue: 700, value: 700 },
        ],
    },
];

const App = () => {
    const [data, setData] = useState(initialData);

    const updateValue = (id, type, newValue) => {
        const updateRow = (rows) => {
            return rows.map((row) => {
                if (row.id === id) {
                    let updatedValue = row.value;
                    if (type === "percentage") {
                        updatedValue += row.originalValue * (newValue / 100);
                    } else if (type === "value") {
                        updatedValue = parseFloat(newValue);
                    }
                    const variance =
                        ((updatedValue - row.originalValue) /
                            row.originalValue) *
                        100;
                    return {
                        ...row,
                        value: updatedValue,
                        variance: `${variance.toFixed(2)}%`,
                    };
                } else if (row.children) {
                    const updatedChildren = updateRow(row.children);
                    const updatedValue = updatedChildren.reduce(
                        (sum, child) => sum + child.value,
                        0
                    );
                    const variance =
                        ((updatedValue - row.originalValue) /
                            row.originalValue) *
                        100;
                    return {
                        ...row,
                        children: updatedChildren,
                        value: updatedValue,
                        variance: `${variance.toFixed(2)}%`,
                    };
                }
                return row;
            });
        };

        const updatedData = updateRow(data);
        setData(updatedData);
    };

    return (
        <div>
            <Typography variant="h3" textAlign="center">
                Hierarchical Table
            </Typography>
            <HTable data={data} updateValue={updateValue} />
        </div>
    );
};

export default App;
