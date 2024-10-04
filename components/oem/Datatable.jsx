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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/config";
import { BadgeCheck, BadgeAlert } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ResetUserProfile } from "./ResetUserProfile";
import { ResetFascia } from "./ResetFascia";
import { ResetExhibitorbadges } from "./ResetExhibitorBadges";
import { ResetPowerRequirement } from "./ResetPowerRequirement";
import { ResetFurniture } from "./ResetFurniture";
import { ResetHostAndHostesses } from "./ResetHostAndHostesses";
import { ResetBooth } from "./ResetBooth";
import { ResetCatalouge } from "./ResetCatalouge";

// import data from "@/data/oemData";
// import { AlertDialogDemo } from "./AlertDialogDemo";

// const somefunc = (companyName) => {
//   alert(`hello ! ${companyName}`);
// };

export const columns = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("company_name")}</div>
    ),
  },
  // {
  //   accessorKey: "id",
  //   header: "Company Id",
  //   cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  // },
  // OEM RESET: User Profile 👇
  {
    accessorKey: "oem_userProfile_formId",
    header: "User Profile",
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div className="flex justify-center">
          {/* {console.log(row.getValue("id"))} */}
          <ResetUserProfile
            exhibitorid={datas.id}
            userProfile={
              row.getValue("oem_userProfile_formId") ? (
                <BadgeCheck stroke="#fff" fill="#2BB673" />
              ) : (
                <BadgeAlert stroke="#fff" fill="#E80000" />
              )
            }
            companyname={row.getValue("company_name")}
          />
        </div>
      );
    },
  },
  // OEM RESET: Fascia Board 👇
  {
    accessorKey: "oem_fascia_formId",
    header: "Fascia Board",
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div className="flex justify-center">
          {/* {console.log(row.getValue("id"))} */}
          <ResetFascia
            exhibitorid={datas.id}
            fascia={
              row.getValue("oem_fascia_formId") ? (
                <BadgeCheck stroke="#fff" fill="#2BB673" />
              ) : (
                <BadgeAlert stroke="#fff" fill="#E80000" />
              )
            }
            companyname={row.getValue("company_name")}
          />
        </div>
      );
    },
  },
  // OEM RESET: Exhibitor Badges 👇
  {
    accessorKey: "oem_exhibitorBadges_formId",
    header: "Exhibitor Badges",
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div className="flex justify-center">
          {/* {console.log(row.getValue("id"))} */}
          <ResetExhibitorbadges
            exhibitorid={datas.id}
            exhibitorbadges={
              row.getValue("oem_exhibitorBadges_formId") ? (
                <BadgeCheck stroke="#fff" fill="#2BB673" />
              ) : (
                <BadgeAlert stroke="#fff" fill="#E80000" />
              )
            }
            companyname={row.getValue("company_name")}
          />
        </div>
      );
    },
  },
  // OEM RESET: Power Requirement 👇
  {
    accessorKey: "oem_powerRequirement_formId",
    header: "Power Requirement",
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div className="flex justify-center">
          {/* {console.log(row.getValue("id"))} */}
          <ResetPowerRequirement
            exhibitorid={datas.id}
            powerRequirement={
              row.getValue("oem_powerRequirement_formId") ? (
                <BadgeCheck stroke="#fff" fill="#2BB673" />
              ) : (
                <BadgeAlert stroke="#fff" fill="#E80000" />
              )
            }
            companyname={row.getValue("company_name")}
          />
        </div>
      );
    },
  },
  // OEM RESET: Furniture 👇
  {
    accessorKey: "oem_furniture_formId",
    header: "Furniture",
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div className="flex justify-center">
          {/* {console.log(row.getValue("id"))} */}
          <ResetFurniture
            exhibitorid={datas.id}
            furniture={
              row.getValue("oem_furniture_formId") ? (
                <BadgeCheck stroke="#fff" fill="#2BB673" />
              ) : (
                <BadgeAlert stroke="#fff" fill="#E80000" />
              )
            }
            companyname={row.getValue("company_name")}
          />
        </div>
      );
    },
  },
  // OEM RESET: Host and Hostesses 👇
  // {
  //   accessorKey: "",
  //   header: "Host and Hostesses",
  //   cell: ({ row }) => {
  //     const datas = row.original;
  //     return (
  //       <div className="flex justify-center">
  //         {/* {console.log(row.getValue("id"))} */}
  //         <ResetHostAndHostesses
  //           exhibitorid={datas.id}
  //           hostandhostesses={
  //             row.getValue("") ? (
  //               <BadgeCheck stroke="#fff" fill="#2BB673" />
  //             ) : (
  //               <BadgeAlert stroke="#fff" fill="#E80000" />
  //             )
  //           }
  //           companyname={row.getValue("company_name")}
  //         />
  //       </div>
  //     );
  //   },
  // },
  // OEM RESET: Booth Contractor 👇
  // {
  //   accessorKey: "oem_booth_formId",
  //   header: "Booth Contractor",
  //   cell: ({ row }) => {
  //     const datas = row.original;
  //     return (
  //       <div className="flex justify-center">
  //         {/* {console.log(row.getValue("id"))} */}
  //         <ResetBooth
  //           exhibitorid={datas.id}
  //           booth={
  //             row.getValue("oem_booth_formId") ? (
  //               <BadgeCheck stroke="#fff" fill="#2BB673" />
  //             ) : (
  //               <BadgeAlert stroke="#fff" fill="#E80000" />
  //             )
  //           }
  //           companyname={row.getValue("company_name")}
  //         />
  //       </div>
  //     );
  //   },
  // },
  // OEM RESET: Catalouge Entry 👇
  {
    accessorKey: "oem_heavyequipment_formId",
    header: "Heavy Equipment",
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div className="flex justify-center">
          {/* {console.log(row.getValue("id"))} */}
          <ResetCatalouge
            exhibitorid={datas.id}
            catalouge={
              row.getValue("oem_heavyequipment_formId") ? (
                <BadgeCheck stroke="#fff" fill="#2BB673" />
              ) : (
                <BadgeAlert stroke="#fff" fill="#E80000" />
              )
            }
            companyname={row.getValue("company_name")}
          />
        </div>
      );
    },
  },
  // OEM RESET: Participation Letter 👇
  // {
  //   accessorKey: "",
  //   header: "Participation Letter",
  //   cell: ({ row }) => (
  //     <div className="border text-center">{row.getValue("")}</div>
  //   ),
  // },
  // // OEM RESET: Advertisement 👇
  // {
  //   accessorKey: "",
  //   header: "Advertisement",
  //   cell: ({ row }) => (
  //     <div className="border text-center">{row.getValue("")}</div>
  //   ),
  // },

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
          "id, company_name, oem_userProfile_formId, oem_fascia_formId, oem_exhibitorBadges_formId, oem_powerRequirement_formId, oem_furniture_formId, oem_heavyequipment_formId, is_approved_by_admin"
        );

      if (data) {
        // alert("data fetched ✅");
        console.log(data);
        setData(data);
      }

      if (error) {
        alert("error fetching data ⛔️");
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
          value={table.getColumn("companyName")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("companyName")?.setFilterValue(event.target.value)
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
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                // className="border border-red-500 py"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="py-2 text-center" key={header.id}>
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
