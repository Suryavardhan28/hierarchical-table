import {
    Button,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

const HTableRow = ({ row, updateValue, isChild }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePercentageUpdate = () => {
        updateValue(row.id, "percentage", inputValue);
        setInputValue("");
    };

    const handleValueUpdate = () => {
        updateValue(row.id, "value", inputValue);
        setInputValue("");
    };

    const renderChildren = (children) => {
        return children.map((child) => (
            <HTableRow
                key={child.id}
                row={child}
                updateValue={updateValue}
                isChild={true}
            />
        ));
    };

    return (
        <>
            <TableRow>
                <TableCell>{isChild ? `-- ${row.label}` : row.label}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>
                    <TextField
                        variant="standard"
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </TableCell>
                <TableCell>
                    <Button onClick={handlePercentageUpdate}>
                        <Typography>Update %</Typography>
                    </Button>
                </TableCell>
                <TableCell>
                    <Button onClick={handleValueUpdate}>
                        <Typography>Update ₹</Typography>
                    </Button>
                </TableCell>
                <TableCell>{row.variance || "0.00%"}</TableCell>
            </TableRow>
            {row.children && renderChildren(row.children)}
        </>
    );
};

export default HTableRow;
