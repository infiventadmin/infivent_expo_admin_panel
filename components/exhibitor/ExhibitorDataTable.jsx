"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
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
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/exhibitor/DeleteDialog";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Plus, X } from "lucide-react";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
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
// import data from "@/data/tableData";
import countryNames from "@/data/countries";
import Edit from "@/components/exhibitor/Edit";
import ConfirmExhib from "@/components/exhibitor/ConfirmExhib";
import AssignStall from "./AssignStall";
import supabase from "@/supabase/config";

export const columns = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company_name")}</div>
    ),
  },
  {
    accessorKey: "participant_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("participant_name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  // {
  //   accessorKey: "stallpref",
  //   header: "Approved",
  //   cell: ({ row }) => (
  //     <div className="flex justify-center">{row.getValue("stallpref")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "assigned_stall",
  //   header: "Assigned Stall",
  //   cell: ({ row }) => (
  //     <div className="flex justify-center">
  //       {row.getValue("assigned_stall")
  //         ? `${row.getValue("assigned_stall")}`
  //         : "⛔️"}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "created_at",
  //   header: "Reg. at",
  //   // cell: ({ row }) => (
  //   //   <div className="capitalize">{row.getValue("created_at")}</div>
  //   // ),
  //   cell: ({ row }) => {
  //     const date = new Date(row.getValue("created_at"));
  //     const options = { year: "numeric", month: "short", day: "numeric" };
  //     const formattedDate = date.toLocaleDateString(undefined, options);
  //     return <div className="capitalize">{formattedDate}</div>;
  //   },
  // },
  {
    id: "actions",
    // enableHiding: false,
    header: "Actions",

    cell: ({ row }) => {
      // const [data, setData] = useState([]);
      const datas = row.original;

      // useEffect(() => {
      //   const fetchData = async () => {
      //     const { data, error } = await supabase
      //       .from("exhibitor")
      //       .select("id, name, email, company_name, is_approved_by_admin");

      //     if (data) {
      //       // alert("data fetched ✅");
      //       console.log(data);
      //       setData(data);
      //     }

      //     if (error) {
      //       alert("error fetching data ⛔️");
      //       console.log(error);
      //     }
      //   };

      //   fetchData();
      // }, []);

      // console.log(data);
      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">span</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className=" h-fit">
              <AlertDialogHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <AlertDialogTitle>Details</AlertDialogTitle>
                  </div>
                  <div>
                    <AlertDialogCancel variant="ghost" className="h-5 w-5 p-0">
                      <X />
                    </AlertDialogCancel>
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogDescription className="flex flex-col gap-[10px]">
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">Product Category: </h1>
                  <p className="font-normal text-base">{datas.product}</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">Mobile Number:</h1>
                  <p className="font-normal text-base">{datas.phone_number}</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">Designation:</h1>
                  <p className="font-normal text-base">{datas.designation}</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">City:</h1>
                  <p className="font-normal text-base">{datas.city}</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">State:</h1>
                  <p className="font-normal text-base">{datas.country}</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">Country:</h1>
                  <p className="font-normal text-base">{datas.country}</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">Blood Group:</h1>
                  <p className="font-normal text-base">O+</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">Role:</h1>
                  <p className="font-normal text-base">Exhibitor</p>
                </div>
                <div className="flex gap-[20px]">
                  <h1 className="font-bold text-base">Assigned Stalls:</h1>
                  <Badge variant="outline">{datas.assigned_stall}</Badge>
                  <Badge variant="outline">T29</Badge>
                </div>
              </AlertDialogDescription>
              {/* <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter> */}
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <ConfirmExhib exhibitorid={datas.id} />
              <AssignStall exhibitorId={datas.id} />
              <Edit exhibitorid={datas.id} />
              <DeleteDialog exhibitorid={datas.id} />
            </DropdownMenuContent>
          </DropdownMenu>

          <Toaster />
        </div>
      );
    },
  },
];

const exhibitor = ["Exhibitor", "Overseas"];
const categories = [
  "Boiler Manufacturer",
  "Boiler component Manufacturer",
  "Turbine Manufacturer",

  "Authorised Dealer/ Trader/ Distributer",
  "Distributor",
  "Technology Service Provider",
  "Other, please Specify",
];

const optionsExhibitor = exhibitor.map((exhibitors) => ({
  value: exhibitors,
  label: exhibitors,
}));

const optionsCountry = countryNames.map((country) => ({
  value: country,
  label: country,
}));

const optionsCategory = categories.map((category) => ({
  value: category,
  label: category,
}));

export function ExhibitorDataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("exhibitor")
        .select(
          "id, name,participant_name, email, company_name, is_approved_by_admin, product, phone_number, designation, city, state, country, assigned_stall"
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

  // console.log(data);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // form data
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    email: "",
    designation: "",
    phone_number: "",
    // exhibitors: "",
    city: "",
    state: "",
    country: "",
    password: "",
    // confirmPassword: "",
    category: "",
    assigned_stall: "", //dropdown
  });

  const handleFormSubmit = async () => {
    console.log("Form Data:", formData);
    const { data, error } = await supabase.from("exhibitor").insert(formData);

    if (error) {
      alert(error);
      console.log(error);
    } else {
      toast.success("Exhibitor Added");
    }
    window.location.reload();
  };
  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption.value,
    });
  };
  const handleexhibitorChange = (selectedOption) => {
    setFormData({
      ...formData,
      exhibitors: selectedOption.value,
    });
  };
  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption.value,
    });
  };

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
      .from("exhibitor")
      .select(
        "name, email, phone_number, designation, company_name, company_website, address_line_one, address_line_two, city, state, country, pincode, category, product"
      )
      .csv();
    if (data) {
      const csvData = new Blob([data], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvData);

      const currentDate = new Date().toISOString().slice(0, 10);
      const fileName = `exhibitors_${currentDate}.csv`;

      const downloadLink = document.createElement("a");
      downloadLink.href = csvUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    if (error) {
      alert("error fetching csv data");
    }
  };

  return (
    <div className="w-[100%] px-8 pt-3">
      {/* <h1 className="text-3xl font-semibold">Exhibitor</h1> */}

      {/* Search-bar, Export-CSV, Add-Exhibitor, Columns Visibility: START*/}
      <div className="flex justify-between py-4">
        {/* Search Bar: START */}
        <Input
          placeholder="Filter company name..."
          value={table.getColumn("company_name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("company_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Search Bar: END */}

        {/* Export-CSV, Add-Exhibitor, Columns Visibility: START */}
        <div className=" flex gap-[20px]">
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>

          {/* Add Exhibitor Model: START */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {" "}
                <Plus className="mr-2 h-4 w-4" /> Add Exhibitor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader className="w-[100%] h-[40px] flex justify-center items-center">
                <DialogTitle className="text-[30px]">Add Exhibitor</DialogTitle>
                {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
              </DialogHeader>
              <div className="grid grid-cols-2 gap-[30px] py-4">
                {/* Company Representative Name */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="name" className="text-right">
                    Company Representative Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Company Name */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="companyname" className="text-right">
                    Company Name
                  </Label>
                  <Input
                    id="companyname"
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Email Address */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="email" className="text-right">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Designation */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="designation" className="text-right">
                    Designation
                  </Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Phone Number */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Exhibitor */}
                {/* <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="country">Exhibitor</Label>
                  <Select
                    options={optionsExhibitor}
                    value={optionsExhibitor.find(
                      (options) => options.value === formData.country
                    )}
                    className="w-[100%]"
                    onChange={handleexhibitorChange}
                  ></Select>
                </div> */}
                {/* City */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* State */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="state" className="text-right">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Country */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    options={optionsCountry}
                    value={optionsCountry.find(
                      (options) => options.value === formData.country
                    )}
                    className=" w-[100%]"
                    onChange={handleCountryChange}
                  ></Select>
                </div>

                {/* Password */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Confirm Password */}
                {/* <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="confirmPassword" className="text-right">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div> */}
                {/* category */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    options={optionsCategory}
                    value={optionsCategory.find(
                      (options) => options.value === formData.country
                    )}
                    onChange={handleCategoryChange}
                  ></Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleFormSubmit}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Add Exhibitor Model: END */}

          {/* Column Visibility: START */}
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
          {/* Column Visibility: END */}
        </div>
        {/* Export-CSV, Add-Exhibitor, Columns Visibility: END */}
      </div>
      {/* Search-bar, Export-CSV, Add-Exhibitor, Columns Visibility: END*/}

      {/* Table-columns, Table-rows START */}
      <div className="rounded-md">
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
        <Toaster />
      </div>
      {/* Table-columns, Table-rows END */}
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
