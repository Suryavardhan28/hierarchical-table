import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import HTableRow from "./HTableRow";

const HTable = ({ data, updateValue }) => {
    const calculateTotal = (rows) => {
        return rows.reduce((total, row) => total + row.value, 0);
    };

    const grandTotal = calculateTotal(data);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography>Label</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>Value</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>Input</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>Allocation %</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>Allocation Val</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>Variance %</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <HTableRow
                        key={row.id}
                        row={row}
                        updateValue={updateValue}
                    />
                ))}
                <TableRow>
                    <TableCell>
                        <Typography>Grand Total</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>{grandTotal}</Typography>
                    </TableCell>
                    <TableCell colSpan="4"></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default HTable;
