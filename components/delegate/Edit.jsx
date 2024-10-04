"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import countryNames from "@/data/countries";
import supabase from "@/supabase/config";
const Edit = () => {
  return (
    <div>Edit</div>
  )
}

export default Edit