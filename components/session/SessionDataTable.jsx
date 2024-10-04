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
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
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
import countryNames from "@/data/countries";

export const columns = [
  {
    accessorKey: "noofDays",
    header: "No. of Days",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("noofDays")}</div>
    ),
  },

  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "speakerName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("speakerName")}</div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Speaker Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "hallName",
    header: " Hall Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("hallName")}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("startDate")}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("endDate")}</div>
    ),
  },
  // {
  //   accessorKey: "image",
  //   header: "Image",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("image")}</div>
  //   ),
  // },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      // const [showDeleteAlert, setShowDeleteAlert] = useState(false);
      const handleDeleteClick = () => {
        // When "Delete" button is clicked, toggle the alert visibility
        console.log("deleted");
        setShowDeleteAlert(true);
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
                {" "}
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
                      the exhibitor and remove your data from our servers.
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

const optionsCountry = countryNames.map((country) => ({
  value: country,
  label: country,
}));

export function SessionDataTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("session")
        .select(
          "id, hallName, speakerName, noofDays, title, endDate, startDate"
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

  // form data
  const [formData, setFormData] = useState({
    noofDays: "",
    title: "",
    speakerName: "",
    hallName: "",
    startDate: "",
    endDate: "",
    // image: "",
  });

  const handleFormSubmit = async () => {
    console.log("Form Data:", formData);

    const { data, error } = await supabase.from("session").insert(formData);

    if (error) {
      alert(error);
      console.log(error);
    } else {
      toast.success("Exhibitor Addded");
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
      .from("session")
      .select("title, hallName, startDate, endDate, noofDays, speakerName")
      .csv();
    if (data) {
      const csvData = new Blob([data], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvData);

      const currentDate = new Date().toISOString().slice(0, 10);
      const fileName = `sessions_${currentDate}.csv`;

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
                <Plus className="mr-2 h-4 w-4" /> Add Session
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
                {/*No of days */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="noOfDays" className="text-right">
                    No. of Days
                  </Label>
                  <Input
                    id="noOfDays"
                    value={formData.noofDays}
                    onChange={(e) =>
                      setFormData({ ...formData, noofDays: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Title */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Speaker Name */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="speakername" className="text-right">
                    Speaker Name
                  </Label>
                  <Input
                    id="speakername"
                    value={formData.speakerName}
                    onChange={(e) =>
                      setFormData({ ...formData, speakerName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/*  Hall Name */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="hallname" className="text-right">
                    Hall Name
                  </Label>
                  <Input
                    id="hallname"
                    value={formData.hallName}
                    onChange={(e) =>
                      setFormData({ ...formData, hallName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Start Date  */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="startdate" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    mode="single"
                    type="date"
                    id="startdate"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="enddate" className="text-right">
                    End Date
                  </Label>
                  <Input
                    type="date"
                    id="enddate"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* State */}
                {/* <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div> */}
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
