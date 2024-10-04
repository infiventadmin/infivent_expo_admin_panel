// "use client";
// import React, { useState, useEffect } from "react";
// import supabase from "@/supabase/config";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { AlertCircle, FileWarning, Terminal } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import data from "@/data/oemData";
// // import { AlertDialogDemo } from "./AlertDialogDemo";

// export const columns = [
//   //   {
//   //     id: "select",
//   //     header: ({ table }) => (
//   //       <Checkbox
//   //         checked={table.getIsAllPageRowsSelected()}
//   //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//   //         aria-label="Select all"
//   //       />
//   //     ),
//   //     cell: ({ row }) => (
//   //       <Checkbox
//   //         checked={row.getIsSelected()}
//   //         onCheckedChange={(value) => row.toggleSelected(!!value)}
//   //         aria-label="Select row"
//   //       />
//   //     ),
//   //     enableSorting: false,
//   //     enableHiding: false,
//   //   },
//   {
//     accessorKey: "company_name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Company Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("company_name")}</div>
//     ),
//   },
//   {
//     accessorKey: "participant_name",
//     header: "Exhibitor Full Name",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("participant_name")}</div>
//     ),
//   },
//   {
//     accessorKey: "designation",
//     header: "Exhibitor Designation",
//     cell: ({ row }) => (
//       <div className="flex justify-center">{row.getValue("designation")}</div>
//     ),
//   },
//   {
//     accessorKey: "country",
//     header: "Exhibitor Country",
//     cell: ({ row }) => (
//       <div className="flex justify-center">{row.getValue("country")}</div>
//     ),
//   },

//   //   {
//   //     accessorKey: "amount",
//   //     header: () => <div className="text-right">Amount</div>,
//   //     cell: ({ row }) => {
//   //       const amount = parseFloat(row.getValue("amount"));

//   //       // Format the amount as a dollar amount
//   //       const formatted = new Intl.NumberFormat("en-US", {
//   //         style: "currency",
//   //         currency: "USD",
//   //       }).format(amount);

//   //       return <div className="text-right font-medium">{formatted}</div>;
//   //     },
//   //   },
//   // {
//   //   id: "actions",
//   //   enableHiding: false,
//   //   cell: ({ row }) => {
//   //     const payment = row.original;

//   //     // const [showDeleteAlert, setShowDeleteAlert] = useState(false);

//   //     const handleDeleteClick = () => {
//   //       // When "Delete" button is clicked, toggle the alert visibility
//   //       console.log("deleted");
//   //       // setShowDeleteAlert(true);
//   //     };
//   //     return (
//   //       <div>
//   //         <DropdownMenu>
//   //           <DropdownMenuTrigger asChild>
//   //             <Button variant="ghost" className="h-8 w-8 p-0">
//   //               <span className="sr-only">Open menu</span>
//   //               <MoreHorizontal className="h-4 w-4" />
//   //             </Button>
//   //           </DropdownMenuTrigger>
//   //           <DropdownMenuContent align="end">
//   //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//   //             <DropdownMenuItem
//   //               onClick={() => navigator.clipboard.writeText(payment.id)}
//   //             >
//   //               Copy payment ID
//   //             </DropdownMenuItem>
//   //             <DropdownMenuSeparator />
//   //             <AlertDialog>
//   //               <AlertDialogTrigger asChild>
//   //                 <Button
//   //                   variant="ghost"
//   //                   className="w-full flex justify-start px-2 py-0! font-normal"
//   //                 >
//   //                   Delete
//   //                 </Button>
//   //               </AlertDialogTrigger>
//   //               <AlertDialogContent>
//   //                 <AlertDialogHeader>
//   //                   <AlertDialogTitle>
//   //                     Are you absolutely sure?
//   //                   </AlertDialogTitle>
//   //                   <AlertDialogDescription>
//   //                     This action cannot be undone. This will permanently delete
//   //                     the exhibitor and remove your data from our servers.
//   //                   </AlertDialogDescription>
//   //                 </AlertDialogHeader>
//   //                 <AlertDialogFooter>
//   //                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//   //                   <Button variant="destructive" onClick={handleDeleteClick}>
//   //                     Delete
//   //                   </Button>
//   //                 </AlertDialogFooter>
//   //               </AlertDialogContent>
//   //             </AlertDialog>
//   //             <DropdownMenuItem>View payment details</DropdownMenuItem>
//   //           </DropdownMenuContent>
//   //         </DropdownMenu>
//   //         {/* {showDeleteAlert && (
//   //           <Alert variant="destructive">
//   //             <AlertCircle className="h-4 w-4" />
//   //             <AlertTitle>Error</AlertTitle>
//   //             <AlertDescription>
//   //               Your session has expired. Please log in again.
//   //             </AlertDescription>
//   //           </Alert>
//   //         )} */}
//   //       </div>
//   //     );
//   //   },
//   // },
// ];

// export function Datatable() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from("exhibitor")
//         .select(
//           "id, name, email,participant_name, company_name, is_approved_by_admin, product, phone_number, designation, city, state, country"
//         );

//       if (data) {
//         // alert("data fetched ✅");
//         console.log(data);
//         setData(data);
//       }

//       if (error) {
//         // alert("error fetching data ⛔️");
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(data);

//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full">
//       <div className="flex items-center py-4">
//         <Input
//           placeholder="Filter company name..."
//           value={table.getColumn("companyName")?.getFilterValue() || ""}
//           onChange={(event) =>
//             table.getColumn("companyName")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columns <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 );
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/supabase/config";

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

import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

export function Datatable() {
  const [data, setData] = useState([]);
  const [badgesData, setBadgesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("exhibitor")
        .select(
          "id, name, email,participant_name, company_name, is_approved_by_admin, product, phone_number, designation, city, state, country"
        );

      if (data) {
        setData(data);
      }

      if (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleViewBadges = async (exhibitorId) => {
    const { data, error } = await supabase
      .from("exhibitorbadges")
      .select("*")
      .eq("exhi_id", exhibitorId);

    if (data) {
      setBadgesData(data);
      setIsModalOpen(true);
    }

    if (error) {
      console.log(error);
    }
  };

  const columns = [
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
      accessorKey: "participant_name",
      header: "Exhibitor Full Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("participant_name")}</div>
      ),
    },
    {
      accessorKey: "designation",
      header: "Exhibitor Designation",
      cell: ({ row }) => (
        <div className="flex justify-center">{row.getValue("designation")}</div>
      ),
    },
    {
      accessorKey: "country",
      header: "Exhibitor Country",
      cell: ({ row }) => (
        <div className="flex justify-center">{row.getValue("country")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const exhibitorId = row.original.id;

        return (
          <Button
            variant="outline"
            onClick={() => handleViewBadges(exhibitorId)}
          >
            View All Badges
          </Button>
        );
      },
    },
  ];

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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Exhibitor Badges</h2>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Badge ID</TableHead>
                    <TableHead>Badge Name</TableHead>
                    <TableHead>Issued Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {badgesData.map((badge, index) => (
                    <TableRow key={badge.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{badge.exhiBadges_name}</TableCell>
                      <TableCell>{badge.exhiBadges_designation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
