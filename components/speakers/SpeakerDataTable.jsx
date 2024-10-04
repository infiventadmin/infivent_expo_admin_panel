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
import { DeleteDialog } from "@/components/speakers/DeleteDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import supabase from "@/supabase/config";
import { Label } from "@/components/ui/label";
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
import { Toaster } from "react-hot-toast";
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
import toast from "react-hot-toast";
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
import Edit from "@/components/speakers/Edit";

export const columns = [
  {
    accessorKey: "profile",
    header: "Profile",

    cell: ({ row }) => (
      <div className="capitalize">
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            {row.getValue("name").charAt(0)}
            {row.getValue("name").split(" ").slice(-1)[0].charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Speaker name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  // {
  //   accessorKey: "designation",
  //   header: "Designation",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("designation")}</div>
  //   ),
  // },
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
    accessorKey: "organisation",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("organisation")}</div>
    ),
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
  },
  {
    accessorKey: "phoneNumber1",
    header: "Mobile No.",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phoneNumber1")}</div>
    ),
  },

  // {
  //   accessorKey: "city",
  //   header: "City",
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("city")}</div>,
  // },
  // {
  //   accessorKey: "state",
  //   header: "State",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("state")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "country",
  //   header: "Country",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("country")}</div>
  //   ),
  // },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const datas = row.original;

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

              <Edit data={datas} />
              <DeleteDialog speakerid={datas.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const optionsCountry = countryNames.map((country) => ({
  value: country,
  label: country,
}));

export function SpeakerDataTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("speakers")
        .select("id, name, email, organisation, phoneNumber1");

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

  // form data
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    city: "",
    state: "",
    country: "",
    password: "",
    cpassword: "",
  });

  const handleFormSubmit = async () => {
    console.log("Form Data:", formData);

    const { data, error } = await supabase.from("speakers").insert({
      name: formData.name,
      email: formData.email,
      organisation: formData.companyName,
      phoneNumber1: formData.phoneNumber,
    });

    if (error) {
      alert(error);
      console.log(error);
    } else {
      toast.success("Speaker Added");
    }
    window.location.reload();
  };
  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption.value,
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
      .from("speakers")
      .select(
        "name, designation, companyName, phoneNumber, email, city, state, country"
      )
      .csv();
    if (data) {
      const csvData = new Blob([data], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvData);

      const currentDate = new Date().toISOString().slice(0, 10);
      const fileName = `speakers_${currentDate}.csv`;

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
          value={table.getColumn("companyname")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("companyname")?.setFilterValue(event.target.value)
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
                <Plus className="mr-2 h-4 w-4" /> Add Speaker
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader className="w-[100%] h-[40px] flex justify-center items-center">
                <DialogTitle className="text-[30px]">Add Speaker</DialogTitle>
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
                {/* COnfirm Password */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="confirmPassword" className="text-right">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.cPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cpassword: e.target.value,
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
        <Toaster />
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
