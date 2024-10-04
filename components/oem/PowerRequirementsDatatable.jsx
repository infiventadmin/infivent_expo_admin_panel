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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/supabase/config";
import { AlertCircle, FileWarning, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
// import { AlertDialogDemo } from "./AlertDialogDemo";

export const columns = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  // {
  //   accessorKey: "boothTypePowerReqs",
  //   header: "Booth Type",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("boothTypePowerReqs")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "hallPowerReqs",
  //   header: "Hall Number",
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("hallPowerReqs")}</div>,
  // },
  // {
  //   accessorKey: "assigned_stall",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Stall Number
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div className="">{row.getValue("assigned_stall")}</div>,
  // },
  {
    accessorKey: "oem_powerRequirement_companyName",
    header: "Company Name",
    cell: ({ row }) => (
      <div>{row.getValue("oem_powerRequirement_companyName")}</div>
    ),
  },
  {
    accessorKey: "oem_powerRequirement_companyPerson",
    header: "Contact Person",
    cell: ({ row }) => (
      <div>{row.getValue("oem_powerRequirement_companyPerson")}</div>
    ),
  },
  {
    accessorKey: "oem_powerRequirement_companyNumber",
    header: "Mobile Number",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("oem_powerRequirement_companyNumber")}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  // {
  //   accessorKey: "connectedLoadPowerReqs",
  //   header: "Connected Load",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("connectedLoadPowerReqs")}</div>
  //   ),
  // },
  {
    id: "Power",
    header: "Connection",
    cell: ({ row }) => {
      const datas = row.original;

      return (
        <div className=" flex justify-between gap-2">
          <div className="border broder-green-500 w-[50%]">
            <h1 className="text-center">Setup Day</h1>
            <hr></hr>
            <div className=" flex justify-between py-1 px-2">
              <h2>Single Phase:</h2>
              <p>{datas.oem_powerRequirement_setupDaysSinglePhase}</p>
            </div>
            <hr></hr>
            <div className=" flex justify-between py-1 px-2">
              <h2>Three Phase:</h2>
              <p>{datas.oem_powerRequirement_setupDaysThreePhase}</p>
            </div>
          </div>
          <div className="border broder-green-500 w-[50%]">
            <h2 className="text-center">Exhibition Day</h2>
            <hr></hr>

            <div className=" flex justify-between py-1 px-2">
              <h2>Single Phase:</h2>
              <p>{datas.oem_powerRequirement_exhibitionDaysSinglePhase}</p>
            </div>
            <hr></hr>

            <div className=" flex justify-between py-1 px-2">
              <h2>Three Phase:</h2>
              <p>{datas.oem_powerRequirement_exhibitionDaysSinglePhase}</p>
            </div>
          </div>
        </div>
      );
    },
  },
];

export function Datatable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("exhibitor")
        .select(
          "id, oem_powerRequirement_companyName, oem_powerRequirement_companyPerson, oem_powerRequirement_companyNumber, assigned_stall, category, oem_powerRequirement_setupDaysSinglePhase, oem_powerRequirement_setupDaysThreePhase, oem_powerRequirement_exhibitionDaysSinglePhase, oem_powerRequirement_exhibitionDaysSinglePhase"
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

  console.log(data);

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
          value={
            table
              .getColumn("oem_powerRequirement_companyName")
              ?.getFilterValue() || ""
          }
          onChange={(event) =>
            table
              .getColumn("oem_powerRequirement_companyName")
              ?.setFilterValue(event.target.value)
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
