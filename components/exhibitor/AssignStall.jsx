import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/config";
import toast from "react-hot-toast";

function AssignStall({ exhibitorId }) {
  const [data, setData] = useState([]);
  const [assignedToExhibitor, setAssignedToExhibitor] = useState("");
  const [stallNumber, setStallNumber] = useState("");
  // Create a state variable to store the selected exhibitor
  const [selectedExhibitor, setSelectedExhibitor] = useState(null);

  // Function to handle changes in the Select component
  const handleExhibitorChange = (selectedOption) => {
    setSelectedExhibitor(selectedOption);
  };

  useEffect(() => {
    // alert(exhibitorId);

    const fetchExhibitorInfo = async () => {
      const { data, error } = await supabase
        .from("exhibitor")
        .select("company_name")
        .eq("id", exhibitorId);

      if (data) {
        // setAssignedToExhibitor(data)
        setAssignedToExhibitor(data[0].company_name);
      }

      if (error) {
        alert(error);
      }
    };

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("stalls")
        .select("stall_number");

      if (data) {
        // alert("data fetched ✅");
        // console.log(data);
        setData(data);
      }

      if (error) {
        // alert("error fetching data ⛔️");
        console.log(error);
      }
    };

    fetchData();
    fetchExhibitorInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formattedData = data.map((item) => ({
    value: item.stall_number,
    label: item.stall_number,
  }));

  const setExhibitorStallStatus = async () => {
    const selectedExhibitorData = selectedExhibitor.value;
    console.log(selectedExhibitorData);
    const { error } = await supabase
      .from("exhibitor")
      .update({
        is_stall_assigned: true,
        assigned_stall: selectedExhibitorData,
      })
      .eq("id", exhibitorId);

    setStallNumber(selectedExhibitorData);
  };

  // const setStallAssignedToStatus = async () => {
  //   alert(stallNumber);
  //   const { error } = await supabase
  //     .from("stalls")
  //     .update({
  //       exhibitor: assignedToExhibitor,
  //     })
  //     .eq("stall_number", stallNumber);

  //   if (error) {
  //     console.log(error);
  //   }
  // };

  // Function to handle the submit button click
  const handleSubmit = () => {
    setExhibitorStallStatus();
    window.location.reload(); // This line will refresh the page

    // window.location.reload();
    // toast.success("Stall Assigned");
    // setStallAssignedToStatus();
    // if (selectedExhibitor) {
    // Log the selected exhibitor data in an array format
    // You can perform further actions with the selected exhibitor data here
    // } else {
    //   console.log("No exhibitor selected");
    // }
  };

  return (
    <div>
      {/* Dialog component for assigning a stall */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-start px-2 py-0! font-normal"
          >
            <Store className="mr-2 h-4 w-4" />
            Assign Stall
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader className="w-[100%] h-[40px] flex justify-center items-center">
            <DialogTitle className="text-[30px]">Assign Stall</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {/* Select component for choosing the exhibitor */}
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="exhibitor">Exhibitor</Label>
              <Select
                options={formattedData}
                value={selectedExhibitor}
                className="w-[100%]"
                onChange={handleExhibitorChange}
              ></Select>
            </div>
          </div>
          {/* <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter> */}
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Save and Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AssignStall;
