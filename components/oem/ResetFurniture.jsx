import React, { useState } from "react";
import toast from "react-hot-toast";
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import supabase from "@/supabase/config";

export function ResetFurniture({ exhibitorid, furniture, companyname }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteClick = async () => {
    // When "Delete" button is clicked, hide the alert
    setShowDeleteAlert(false);

    console.log(exhibitorid);
    console.log(furniture);
    console.log(companyname);

    const { error } = await supabase
      .from("exhibitor")
      .update({
        oem_furniture_queriesName: null,
        oem_furniture_queriesEmail: null,
        oem_furniture_queriesMobile: null,
        oem_furniture_queriesCompany: null,
        oem_furniture_assistanceName: null,
        oem_furniture_assistanceEmail: null,
        oem_furniture_assistanceMobile: null,
        // lol: null,
      })
      .eq("id", exhibitorid);

    if (error) {
      alert("error");
      console.log(error);
    }
    // alert(exhibitorid);
    // Show a toast notification
    toast.success("Deleted Successfully");
    window.location.reload();
  };

  return (
    <div>
      <AlertDialog
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
      >
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-start px-2 py-0! font-normal text-red-500"
            onClick={() => setShowDeleteAlert(true)} // Show the dialog when the button is clicked
          >
            {furniture}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Reset furniture details of {companyname}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              exhibitor and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <Button onClick={handleDeleteClick}>Reset</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
