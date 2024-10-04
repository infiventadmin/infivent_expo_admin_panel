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

export function DeleteDialog({ speakerid }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteClick = async () => {
    // When "Delete" button is clicked, hide the alert
    setShowDeleteAlert(false);

    const { error } = await supabase
      .from("speakers")
      .delete()
      .eq("id", speakerid);

    if (error) {
      alert("error");
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
            <Trash2 className="mr-2 h-4 w-4" color="#ee1b1b" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              exhibitor and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeleteClick}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
