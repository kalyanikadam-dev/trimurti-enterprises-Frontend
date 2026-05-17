import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function DataTable({ columns, data }) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {columns.map((column) => (
                        <TableHead key={column.accessorKey} className={column.className}>
                            {column.header}
                        </TableHead>
                    ))}
                </TableHeader>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i}>
                            {columns.map((column) => (
                                <TableCell key={column.accessorKey}>
                                    {column.cell ? column.cell(row) : row[column.accessorKey]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

