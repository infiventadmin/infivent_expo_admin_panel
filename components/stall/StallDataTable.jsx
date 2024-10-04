// "use client";
// import React, { useState } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Image from "next/image";
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
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Download, Plus, Pencil, Trash2 } from "lucide-react";
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
// import Select from "react-select";
// import data from "@/data/tableData";
// import countryNames from "@/data/countries";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import Controls from "./Controls";
// import styles from "@/styles/app/(main)/stall/stall.module.scss";
// import supabase from "@/supabase/config";

// export const columns = [
//   {
//     accessorKey: "",
//     header: "Stall No.",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("")}</div>,
//   },

//   {
//     accessorKey: "",
//     header: "Stall Type",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("")}</div>,
//   },
//   {
//     accessorKey: "",
//     header: "Dimension",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("")}</div>,
//   },
//   {
//     accessorKey: "",
//     header: "Area",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("")}</div>,
//   },
//   {
//     accessorKey: "",
//     header: "Open side",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("")}</div>,
//   },
//   {
//     accessorKey: "companyname",
//     header: "Exhibitor",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("companyname")}</div>
//     ),
//   },

//   {
//     id: "actions",
//     header: "Action",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       // const [showDeleteAlert, setShowDeleteAlert] = useState(false);
//       const handleDeleteClick = () => {
//         // When "Delete" button is clicked, toggle the alert visibility
//         console.log("deleted");
//         // setShowDeleteAlert(true);
//       };
//       return (
//         <div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>

//               <DropdownMenuItem>
//                 {" "}
//                 <Pencil className="mr-2 h-4 w-4" />
//                 Edit
//               </DropdownMenuItem>
//               <AlertDialog>
//                 <AlertDialogTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="w-full flex justify-start px-2 py-0! font-normal text-red-500"
//                   >
//                     <Trash2 className="mr-2 h-4 w-4" color="#ee1b1b" />
//                     Delete
//                   </Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                   <AlertDialogHeader>
//                     <AlertDialogTitle>
//                       Are you absolutely sure?
//                     </AlertDialogTitle>
//                     <AlertDialogDescription>
//                       This action cannot be undone. This will permanently delete
//                       the exhibitor and remove your data from our servers.
//                     </AlertDialogDescription>
//                   </AlertDialogHeader>
//                   <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <Button variant="destructive" onClick={handleDeleteClick}>
//                       Delete
//                     </Button>
//                   </AlertDialogFooter>
//                 </AlertDialogContent>
//               </AlertDialog>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           {/* {showDeleteAlert && (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>
//                 Your session has expired. Please log in again.
//               </AlertDescription>
//             </Alert>
//           )} */}
//         </div>
//       );
//     },
//   },
// ];

// const stalltype = ["Bare", "Shell"];

// const optionsstalltype = stalltype.map((stalltypes) => ({
//   value: stalltypes,
//   label: stalltypes,
// }));

// const optionsCountry = countryNames.map((country) => ({
//   value: country,
//   label: country,
// }));

// export function StallDataTable() {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [rowSelection, setRowSelection] = useState({});

//   // form data
//   const [formData, setFormData] = useState({
//     stallno: "",
//     stalltype: "",
//     badges: "",
//     extrabadges: "",
//     foodcoupon: "",
//     extrafood: "",
//     tables: "",
//     chairs: "",
//     powersocket: "",
//     dustbin: "",
//     spotlight: "",
//     hall: "",
//     length: "",
//     width: "",
//     area: "",
//     height: "",
//     openside: "",
//   });

//   const handleFormSubmit = () => {
//     console.log("Form Data:", formData);
//   };
//   const handleCountryChange = (selectedOption) => {
//     setFormData({
//       ...formData,
//       country: selectedOption.value,
//     });
//   };

//   const handleStallChange = (selectedOption) => {
//     setFormData({
//       ...formData,
//       stalltypes: selectedOption.value,
//     });
//   };

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

//   const handleExport = async () => {
//     const { data, error } = await supabase
//       .from("stalls")
//       .select(
//         "stall_number, stall_area, sides_open, stall_type, location_type, exhibitor, contact_person, contact_number, email, product_details"
//       )
//       .csv();
//     if (data) {
//       const csvData = new Blob([data], { type: "text/csv" });
//       const csvUrl = URL.createObjectURL(csvData);

//       const currentDate = new Date().toISOString().slice(0, 10);
//       const fileName = `stalls_${currentDate}.csv`;

//       const downloadLink = document.createElement("a");
//       downloadLink.href = csvUrl;
//       downloadLink.download = fileName;
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//     }

//     if (error) {
//       alert("error fetching csv data");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-[100%] px-8 pt-4">
//       <div className="flex justify-between py-4">
//         <Input
//           placeholder="Filter company name..."
//           value={table.getColumn("companyname")?.getFilterValue() || ""}
//           onChange={(event) =>
//             table.getColumn("companyname")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//         <div className=" flex gap-[20px]">
//           <Button onClick={handleExport}>
//             <Download className="mr-2 h-4 w-4" />
//             Export CSV
//           </Button>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button>
//                 {" "}
//                 <Plus className="mr-2 h-4 w-4" /> Add Stall
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[800px]">
//               <DialogHeader className="w-[100%] h-[40px] flex justify-center items-center">
//                 <DialogTitle className="text-[30px]">Add Stall</DialogTitle>
//                 {/* <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription> */}
//               </DialogHeader>
//               <div className="grid grid-cols-2 gap-[30px] py-4 overflow-y-scroll  h-[400px]">
//                 {/* <ScrollArea className="h-[345px]"> */}
//                 {/*Stallno */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="stallno" className="text-right">
//                     Stall No.
//                   </Label>
//                   <Input
//                     id="stallno"
//                     value={formData.stallno}
//                     onChange={(e) =>
//                       setFormData({ ...formData, stallno: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/*Stall Type */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="stalltype" className="text-right">
//                     Stall Type
//                   </Label>

//                   <Select
//                     options={optionsstalltype}
//                     value={optionsstalltype.find(
//                       (options) => options.value === formData.stalltype
//                     )}
//                     className="w-[100%]"
//                     onChange={handleStallChange}
//                   ></Select>
//                 </div>
//                 {/* Number of badges */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="stallno" className="text-right">
//                     Number of badges
//                   </Label>
//                   <Input
//                     id="badges"
//                     value={formData.badges}
//                     onChange={(e) =>
//                       setFormData({ ...formData, badges: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>

//                 {/* Extra badges */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="stallno" className="text-right">
//                     Extra Badges
//                   </Label>
//                   <Input
//                     id="extrabadges"
//                     value={formData.extrabadges}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         extrabadges: e.target.value,
//                       })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Nuber of food coupons */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="foodcoupon" className="text-right">
//                     Food Coupons
//                   </Label>
//                   <Input
//                     id="foodcoupon"
//                     value={formData.foodcoupon}
//                     onChange={(e) =>
//                       setFormData({ ...formData, foodcoupon: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>

//                 {/* Extra food coupons */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="extrafood" className="text-right">
//                     Extra Food Coupons
//                   </Label>
//                   <Input
//                     id="extrafood"
//                     value={formData.extrafood}
//                     onChange={(e) =>
//                       setFormData({ ...formData, extrafood: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Tables */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="tables" className="text-right">
//                     Tables
//                   </Label>
//                   <Input
//                     id="tables"
//                     value={formData.tables}
//                     onChange={(e) =>
//                       setFormData({ ...formData, tables: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* chair */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="chairs" className="text-right">
//                     Chairs
//                   </Label>
//                   <Input
//                     id="chairs"
//                     value={formData.chairs}
//                     onChange={(e) =>
//                       setFormData({ ...formData, chairs: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Power socket */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="powersocket" className="text-right">
//                     Power Socket
//                   </Label>
//                   <Input
//                     id="powersocket"
//                     value={formData.powersocket}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         powersocket: e.target.value,
//                       })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Dustbin */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="dustbin" className="text-right">
//                     Dustbin
//                   </Label>
//                   <Input
//                     id="dustbin"
//                     value={formData.dustbin}
//                     onChange={(e) =>
//                       setFormData({ ...formData, dustbin: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Spotlight */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="spotlight" className="text-right">
//                     Spotlight
//                   </Label>
//                   <Input
//                     id="spotlight"
//                     value={formData.spotlight}
//                     onChange={(e) =>
//                       setFormData({ ...formData, spotlight: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Hall */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="hall" className="text-right">
//                     Hall
//                   </Label>
//                   <Input
//                     id="hall"
//                     value={formData.hall}
//                     onChange={(e) =>
//                       setFormData({ ...formData, hall: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Length */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="length" className="text-right">
//                     Length
//                   </Label>
//                   <Input
//                     id="length"
//                     value={formData.length}
//                     onChange={(e) =>
//                       setFormData({ ...formData, length: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Width */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="width" className="text-right">
//                     Width
//                   </Label>
//                   <Input
//                     id="width"
//                     value={formData.width}
//                     onChange={(e) =>
//                       setFormData({ ...formData, width: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Area */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="area" className="text-right">
//                     Area
//                   </Label>
//                   <Input
//                     id="area"
//                     value={formData.area}
//                     onChange={(e) =>
//                       setFormData({ ...formData, area: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Height */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="height" className="text-right">
//                     Height
//                   </Label>
//                   <Input
//                     id="height"
//                     value={formData.height}
//                     onChange={(e) =>
//                       setFormData({ ...formData, height: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* Open Side */}
//                 <div className="flex flex-col items-start gap-2">
//                   <Label htmlFor="openside" className="text-right">
//                     Open Sides
//                   </Label>
//                   <Input
//                     id="openside"
//                     value={formData.openside}
//                     onChange={(e) =>
//                       setFormData({ ...formData, openside: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 {/* </ScrollArea> */}
//               </div>

//               <DialogFooter>
//                 <Button type="submit" onClick={handleFormSubmit}>
//                   Save changes
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button>Stall Layout</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[800px]">
//               <DialogHeader className="w-[100%] h-[40px] flex justify-center items-center">
//                 <DialogTitle className="text-[30px]">Stall Layout</DialogTitle>
//                 {/* <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription> */}
//               </DialogHeader>
//               <TransformWrapper>
//                 <Controls />
//                 <TransformComponent>
//                   <div className={styles.img}>
//                     <Image
//                       src="/floorplan.svg"
//                       width={1000}
//                       height={1000}
//                       alt="Floor Plan"
//                       // className={styles.img}
//                     />
//                   </div>
//                 </TransformComponent>
//               </TransformWrapper>
//             </DialogContent>
//           </Dialog>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
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
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Download,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import Select from "react-select";
import supabase from "@/supabase/config";

export const columns = [
  {
    accessorKey: "stall_number",
    header: "Stall No.",
    cell: ({ row }) => <div>{row.getValue("stall_number")}</div>,
  },
  {
    accessorKey: "stall_type",
    header: "Stall Type",
    cell: ({ row }) => <div>{row.getValue("stall_type")}</div>,
  },
  {
    accessorKey: "stall_area",
    header: "Area",
    cell: ({ row }) => <div>{row.getValue("stall_area")}</div>,
  },
  {
    accessorKey: "sides_open",
    header: "Open Side",
    cell: ({ row }) => <div>{row.getValue("sides_open")}</div>,
  },
  // {
  //   accessorKey: "exhibitor",
  //   header: "Exhibitor",
  //   cell: ({ row }) => <div>{row.getValue("exhibitor")}</div>,
  // },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const handleDeleteClick = () => {
        console.log("Deleted");
      };
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex justify-start px-2 py-0! font-normal text-red-500"
                  >
                    <Trash2 className="mr-2 h-4 w-4" color="#ee1b1b" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the stall and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDeleteClick}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function StallDataTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    stall_number: "",
    stall_type: "Bare",
    stall_area: "",
    sides_open: "",
    exhibitor: "",
    contact_person: "",
    contact_number: "",
    email: "",
  });

  const handleFormSubmit = async () => {
    const { error } = await supabase.from("stalls").insert(formData);
    if (error) {
      console.log(error.message);
    } else {
      console.log("Stall added successfully");
      window.location.reload();
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("stalls")
        .select(
          "stall_number, stall_area, sides_open, stall_type, location_type, exhibitor, contact_person, contact_number, email"
        );
      if (data) {
        setData(data);
      }
    };
    getData();
  }, []);

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

  const handleExport = async () => {
    const { data, error } = await supabase
      .from("stalls")
      .select(
        "stall_number, stall_area, sides_open, stall_type, location_type, exhibitor, contact_person, contact_number, email"
      )
      .csv();
    if (data) {
      const csvData = new Blob([data], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvData);

      const currentDate = new Date().toISOString().slice(0, 10);
      const fileName = `stalls_${currentDate}.csv`;

      const downloadLink = document.createElement("a");
      downloadLink.href = csvUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    if (error) {
      alert("Error fetching CSV data");
      console.log(error);
    }
  };

  return (
    <div className="w-[100%] px-8 pt-4">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Filter stall number..."
          value={table.getColumn("stall_number")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("stall_number")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-[20px]">
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Stall
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Add Stall</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-[30px] py-4 px-4 overflow-y-scroll h-[200px]">
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="stall_number">Stall No.</Label>
                  <Input
                    id="stall_number"
                    value={formData.stall_number}
                    onChange={(e) =>
                      setFormData({ ...formData, stall_number: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="stall_type">Stall Type</Label>
                  <Select
                    className="w-[300px]"
                    options={[
                      { value: "Bare", label: "Bare" },
                      { value: "Shell", label: "Shell" },
                    ]}
                    value={{
                      value: formData.stall_type,
                      label: formData.stall_type,
                    }}
                    onChange={(option) =>
                      setFormData({ ...formData, stall_type: option.value })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="stall_area">Area</Label>
                  <Input
                    id="stall_area"
                    value={formData.stall_area}
                    onChange={(e) =>
                      setFormData({ ...formData, stall_area: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="sides_open">Open Side</Label>
                  <Input
                    id="sides_open"
                    value={formData.sides_open}
                    onChange={(e) =>
                      setFormData({ ...formData, sides_open: e.target.value })
                    }
                  />
                </div>
                {/* <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="exhibitor">Exhibitor</Label>
                  <Input
                    id="exhibitor"
                    value={formData.exhibitor}
                    onChange={(e) =>
                      setFormData({ ...formData, exhibitor: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="contact_person">Contact Person</Label>
                  <Input
                    id="contact_person"
                    value={formData.contact_person}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="contact_number">Contact Number</Label>
                  <Input
                    id="contact_number"
                    value={formData.contact_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div> */}
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
        </ScrollArea>
      </div>
    </div>
  );
}
