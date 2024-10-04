"use client";
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import supabase from "@/supabase/config";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data from "@/data/oemData";
// import { AlertDialogDemo } from "./AlertDialogDemo";

export const columns = [
  {
    accessorKey: "assigned_stall",
    header: "Stall Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("assigned_stall")}</div>
    ),
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company_name")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone_number",
    header: "Telephone Number",
    cell: ({ row }) => <div className="">{row.getValue("phone_number")}</div>,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div className="capitalize">{row.getValue("city")}</div>,
  },
  {
    accessorKey: "pincode",
    header: "Post Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("pincode")}</div>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("country")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  // {
  //   accessorKey: "orderItemsFurniture",
  //   header: "Order Items",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("orderItemsFurniture")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "productPriceFurniture",
  //   header: "Product Price",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("productPriceFurniture")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "productQualityFurniture",
  //   header: "Product Quality",
  //   cell: ({ row }) => (
  //     <div className="capitalize">
  //       {row.getValue("productQualityFurniture")}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "totalFurniture",
  //   header: "Total",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("totalFurniture")}</div>
  //   ),
  // },
  {
    accessorKey: "oem_furniture",
    header: "Furniture form Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("oem_furniture")}</div>
    ),
  },

  //   {
  //     accessorKey: "amount",
  //     header: () => <div className="text-right">Amount</div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("amount"));

  //       // Format the amount as a dollar amount
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     // const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  //     const handleDeleteClick = () => {
  //       // When "Delete" button is clicked, toggle the alert visibility
  //       console.log("deleted");
  //       // setShowDeleteAlert(true);
  //     };
  //     return (
  //       <div>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => navigator.clipboard.writeText(payment.id)}
  //             >
  //               Copy payment ID
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <AlertDialog>
  //               <AlertDialogTrigger asChild>
  //                 <Button
  //                   variant="ghost"
  //                   className="w-full flex justify-start px-2 py-0! font-normal"
  //                 >
  //                   Delete
  //                 </Button>
  //               </AlertDialogTrigger>
  //               <AlertDialogContent>
  //                 <AlertDialogHeader>
  //                   <AlertDialogTitle>
  //                     Are you absolutely sure?
  //                   </AlertDialogTitle>
  //                   <AlertDialogDescription>
  //                     This action cannot be undone. This will permanently delete
  //                     the exhibitor and remove your data from our servers.
  //                   </AlertDialogDescription>
  //                 </AlertDialogHeader>
  //                 <AlertDialogFooter>
  //                   <AlertDialogCancel>Cancel</AlertDialogCancel>
  //                   <Button variant="destructive" onClick={handleDeleteClick}>
  //                     Delete
  //                   </Button>
  //                 </AlertDialogFooter>
  //               </AlertDialogContent>
  //             </AlertDialog>
  //             <DropdownMenuItem>View payment details</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //         {/* {showDeleteAlert && (
  //           <Alert variant="destructive">
  //             <AlertCircle className="h-4 w-4" />
  //             <AlertTitle>Error</AlertTitle>
  //             <AlertDescription>
  //               Your session has expired. Please log in again.
  //             </AlertDescription>
  //           </Alert>
  //         )} */}
  //       </div>
  //     );
  //   },
  // },
];

export function Datatable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("exhibitor")
        .select(
          "id, name, company_name, phone_number, city, state, country, pincode, email,assigned_stall, oem_furniture"
        );

      if (data) {
        // alert("data fetched ✅");
        console.log(data);
        setData(data);
      }

      if (error) {
        // alert("error fetching data ⛔️");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter company name..."
          value={table.getColumn("company_name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("company_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
