"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
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

const optionsCountry = countryNames.map((country) => ({
  value: country,
  label: country,
}));

function Edit({ data }) {
  // form data
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    companyname: "",
    phoneNumber: "",
    email: "",
    city: "",
    state: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      name: data.name || "",
      designation: data.designation || "",
      companyname: data.organisation || "",
      phoneNumber: data.phoneNumber1 || "",
      email: data.email || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      password: "",
      confirmPassword: "",
    });
  }, [data]);

  const handleFormSubmit = () => {
    console.log("Form Data:", formData);
  };
  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption.value,
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-start px-2 py-0! font-normal "
          >
            {" "}
            <Pencil className="mr-2 h-4 w-4" />
            Edit
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
                value={formData.companyname}
                onChange={(e) =>
                  setFormData({ ...formData, companyname: e.target.value })
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
    </div>
  );
}

export default Edit;
