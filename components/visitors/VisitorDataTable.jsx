"use client";
import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteDialog } from "@/components/visitors/DeleteDialog";
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
import Select from "react-select";
// import data from "@/data/tableData";
import countryNames from "@/data/countries";
import Edit from "@/components/visitors/Edit";
import supabase from "@/supabase/config";

export const columns = [
  {
    accessorKey: "companyName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("companyName")}</div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organisation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Company Representative Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
  {
    accessorKey: "PhoneNumber",
    header: "Mobile No.",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("PhoneNumber")}</div>
    ),
  },

  {
    accessorKey: "city",
    header: "Location",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {/* {row.getValue("city")}, {row.getValue("state")},{" "}
          {row.getValue("country")} */}
          {row.original.city}, {row.original.state}, {row.original.country}
        </div>
      );
    },

    // cell: ({ row }) => (
    //   <div className="capitalize">
    //     {row.getValue("city")}, {row.getValue("state")},{" "}
    //     {row.getValue("country")}
    //   </div>
    // ),
  },
  {
    accessorKey: "regat",
    header: "Reg. at",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("regat")}</div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      // const [showDeleteAlert, setShowDeleteAlert] = useState(false);
      // const handleDeleteClick = () => {
      //   // When "Delete" button is clicked, toggle the alert visibility
      //   console.log("deleted");
      //   setShowDeleteAlert(true);
      // };

      const data = row.original;
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

              <Edit visitorid={data.id} />
              <DeleteDialog visitorid={data.id} />
            </DropdownMenuContent>
          </DropdownMenu>
          <Toaster />
        </div>
      );
    },
  },
];

const categories = [
  "Boiler Manufacturer",
  "Boiler component Manufacturer",
  "Turbine Manufacturer",

  "Authorised Dealer/ Trader/ Distributer",
  "Distributor",
  "Technology Service Provider",
  "Other, please Specify",
];

const optionsCountry = countryNames.map((country) => ({
  value: country,
  label: country,
}));

const optionsCategory = categories.map((category) => ({
  value: category,
  label: category,
}));

export function VisitorDataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("visitor").select();

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

  // form data
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    designation: "",
    phoneNumber: "",
    city: "",
    state: "",
    category: "", //dropdown
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async () => {
    console.log("Form Data:", formData);
    const { data, error } = await supabase.from("visitor").insert(formData);

    if (error) {
      alert(error);
      console.log(error);
    } else {
      toast.success("Visitor Added");
    }
    window.location.reload();
  };
  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption.value,
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
      .from("visitor")
      .select(
        "name, email, phoneNumber, designation, companyName, city, state, country, category, phoneNumber, hear_about_bwe"
      )
      .csv();
    if (data) {
      const csvData = new Blob([data], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvData);

      const currentDate = new Date().toISOString().slice(0, 10);
      const fileName = `visitors_${currentDate}.csv`;

      const downloadLink = document.createElement("a");
      downloadLink.href = csvUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    if (error) {
      alert("error fetching csv data");
      console.log(error);
    }
  };

  return (
    <div className="w-[100%] px-8 pt-4">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Filter company name..."
          value={table.getColumn("companyName")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("companyName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className=" flex gap-[20px]">
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {" "}
                <Plus className="mr-2 h-4 w-4" /> Add Visitors
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader className="w-[100%] h-[40px] flex justify-center items-center">
                <DialogTitle className="text-[30px]">Add Visitors</DialogTitle>
                {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
              </DialogHeader>
              <div className="grid grid-cols-2 gap-[30px] py-4">
                {/*Name */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="name" className="text-right">
                    Name
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
                {/* Comapny Name */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="companyname" className="text-right">
                    Company Name
                  </Label>
                  <Input
                    id="companyname"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
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

                {/* Phone Number */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
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
                {/* Category */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    options={optionsCategory}
                    value={optionsCategory.find(
                      (options) => options.value === formData.category
                    )}
                    onChange={handleCategoryChange}
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
                {/* COnfirm Password */}
                <div className="flex flex-col items-start gap-2">
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
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" onClick={handleFormSubmit}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
