"use client";
import React, { useEffect, useState } from "react";
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
import { Check } from "lucide-react";
import { XCircle } from "lucide-react";
import supabase from "@/supabase/config";

function ConfirmExhib({ exhibitorid }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isExhibitorApproved, setIsExhibitorApproved] = useState(false);

  useEffect(() => {
    // Fetch the exhibitor's approval status when the component mounts
    const fetchExhibitorStatus = async () => {
      const { data, error } = await supabase
        .from("exhibitor")
        .select("is_approved_by_admin")
        .eq("id", exhibitorid);

      if (data && data.length > 0) {
        setIsExhibitorApproved(data[0].is_approved_by_admin);
      }
    };

    fetchExhibitorStatus();
  }, [exhibitorid]);

  const handleApproveClick = async () => {
    // When "Approve" button is clicked, hide the alert and set the exhibitor as approved
    setShowDeleteAlert(false);
    // alert(exhibitorid);
    setIsExhibitorApproved(true);
    const { error } = await supabase
      .from("exhibitor")
      .update({ is_approved_by_admin: true })
      .eq("id", exhibitorid);

    if (error) {
      alert("error");
    }

    // Show a toast notification for approval
    toast.success("Exhibitor Approved");
  };

  const handleDisapproveClick = async () => {
    // When "Disapprove" button is clicked, hide the alert and set the exhibitor as disapproved
    setShowDeleteAlert(false);
    setIsExhibitorApproved(false);

    const { error } = await supabase
      .from("exhibitor")
      .update({ is_approved_by_admin: false })
      .eq("id", exhibitorid);

    if (error) {
      alert("error");
    }

    // Show a toast notification for disapproval

    toast.success("Exhibitor Disapproved");
  };

  return (
    <div>
      {/* Conditional rendering based on whether exhibitor is approved */}
      {isExhibitorApproved ? (
        // Only "Disapprove Exhibitor" button is shown
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex justify-start px-2 py-0! font-normal "
              onClick={() => setShowDeleteAlert(true)}
            >
              <XCircle
                strokeWidth={3}
                className="mr-2 h-4 w-4 text-red-500 font-bold"
              />
              Disapprove Exhibitor
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
              <Button variant="destructive" onClick={handleDisapproveClick}>
                Disapprove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        // "Confirm Exhibitor" button
        <AlertDialog
          open={showDeleteAlert}
          onClose={() => setShowDeleteAlert(false)}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex justify-start px-2 py-0! font-normal "
              onClick={() => setShowDeleteAlert(true)}
            >
              <Check
                strokeWidth={3}
                className="mr-2 h-4 w-4 text-[#5CB85C] font-bold"
              />
              Confirm Exhibitor
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
              <Button className="bg-[#5CB85C]" onClick={handleApproveClick}>
                Approve
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default ConfirmExhib;
