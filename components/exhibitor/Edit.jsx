"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import Select from "react-select";
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
import countryNames from "@/data/countries";
import supabase from "@/supabase/config";


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

function Edit(id) {
const helloId = id.exhibitorid;
console.log("hello", helloId);
  // form data
 const [formData, setFormData] = useState({
  // updateId:"",
   name: "",
   company_name: "",
   email: "",
   designation: "",
   phone_number: "",
   exhibitors: "",
   city: "",
   state: "",
   country: "",
   password: "",
   confirmPassword: "",
   category: "",
   assigned_stall: "", //dropdown
 });

  // const handleFormSubmit = () => {
  //   console.log("Form Data:", formData);
  // };




    const handleUpdate = async (helloId) => {
      try {
        const { data, error } = await supabase
          .from("exhibitor")
          .select("*")
          .eq("id", helloId)
          .single();
        if (error) {
          throw error;
        }
        if (data) {

         setFormData({
           ...formData, // Spread the existing object to keep its other properties
           id: data.id,
           name: data.name,
           company_name: data.company_name,
           email: data.email,
           designation: data.designation,
          phone_number:data.phone_number,
           exhibitors: data.exhibitors,
           city: data.city,
           state: data.state,
           country: data.country,
           password: data.password,
           confirmPassword: data.confirmPassword,
           category: data.category,
         });

        

        
        } else {
          console.log("row not found");
        }
      } catch (error) {
        console.error("error fetching data:", error.message);
      }
  
      // alert(helloId);
    };
    const updateData = async (e) => {
      e.preventDefault();
      try {
        const { data, error } = await supabase
          .from("exhibitor")
          .update({
            name: formData.name,
            company_name: formData.company_name,
            email: formData.email,
            designation: formData.designation,
            phone_number: formData.phone_number,
            exhibitors: formData.exhibitors,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            category: formData.category,
            // assigned_stall: "",
          })
          .eq("id", helloId)
          .single();
        if (error) {
          console.error("update error", error);
          return;
        }
        console.log("data update", data);
   function showToastAndRefresh(message) {
   
     toast.success(message);

   
     setTimeout(function () {
       
       location.reload();
     }, 1000);
   }
   showToastAndRefresh("Data Updated Successfully !");
      } catch (error) {
        console.error("update error", error);
      }
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
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-start px-2 py-0! font-normal "
            onClick={() => handleUpdate(helloId)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader className="w-[100%] h-[40px] flex justify-center items-center">
            <DialogTitle className="text-[30px]">Edit Exhibitor</DialogTitle>
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
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            {/* Exhibitor */}
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="country">Exhibitor</Label>
              <Select
                options={optionsExhibitor}
                value={optionsExhibitor.find(
                  (options) => options.value === formData.exhibitors
                )}
                className=" w-[100%]"
                onChange={handleexhibitorChange}
              ></Select>
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
            {/* Confirm Password */}
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
            {/* category */}
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
          </div>
          <DialogFooter>
            <Button type="submit" onClick={updateData}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Edit;
