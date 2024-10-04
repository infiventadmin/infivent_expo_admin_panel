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

export function ResetExhibitorbadges({
  exhibitorid,
  exhibitorbadges,
  companyname,
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteClick = async () => {
    // When "Delete" button is clicked, hide the alert
    setShowDeleteAlert(false);

    console.log(exhibitorid);
    console.log(exhibitorbadges);
    console.log(companyname);

    const { error } = await supabase
      .from("exhibitor")
      .update({
        exhiBadges_totalBadges: null,
        exhiBadges_usedBadges: null,
        exhiBadges_name: null,
        exhiBadges_designation: null,
        exhiBadges_email: null,
        exhiBadges_mobile: null,
        exhiBadges_bloodGroup: null,
        exhiBadges_assistanceName: null,
        exhiBadges_assistanceContact: null,
        exhiBadges_assistanceEmail: null,
        oem_exhibitorBadges_formId: null,
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
            {exhibitorbadges}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Reset exhibitor badges details of {companyname}?
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
