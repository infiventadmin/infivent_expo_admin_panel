import { DelegateDataTable } from "@/components/delegate/DelegateDataTable";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className=" pt-9 p-8">
      <div className="">
        {/* <div className="flex  gap-[30px] w-[100%] h-[150px] ">
          <Card className="overflow-hidden w-[200px] ">
            <CardHeader className="flex  items-center justify-center bg-black text-white  h-[50px] ">
              <CardTitle className="text-[20px] w-[100%] font-large text-white">
                Total
              </CardTitle>
            </CardHeader>

            <CardContent className="h-[100px] flex justify-center items-center">
              <div className="text-[40px] font-bold">895</div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden  w-[525px] ">
            <CardHeader className="flex  items-center justify-center bg-black text-white  h-[50px] ">
              <CardTitle className="text-[20px] font-large text-white">
                Boiler Users
              </CardTitle>
            </CardHeader>
            <div className="flex gap-[17px] px-[10px] pt-[5px] border-blue-500">
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Day 1</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">98</h1>
                </div>
              </div>
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Day 2</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">78</h1>
                </div>
              </div>

              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Day 3</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">88</h1>
                </div>
              </div>
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">All Days</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">980</h1>
                </div>
              </div>
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Total</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">1200</h1>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden w-[525px] ">
            <CardHeader className="flex  items-center justify-center bg-black text-white  h-[50px] ">
              <CardTitle className="text-[20px] font-large text-white">
                Manufacturer and Skill
              </CardTitle>
            </CardHeader>
            <div className="flex gap-[17px] px-[10px] pt-[5px]">
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Day 1</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">98</h1>
                </div>
              </div>
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Day 2</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">78</h1>
                </div>
              </div>

              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Day 3</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">88</h1>
                </div>
              </div>
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">All Days</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">980</h1>
                </div>
              </div>
              <div className=" w-[200px] flex flex-col">
                <div className="text-center">
                  <h1 className="text-[17px] font-[600]">Total</h1>
                </div>
                <Separator />
                <div className="flex items-center justify-center text-center h-[50px]">
                  <h1 className="text-[20px] font-[500]">1200</h1>
                </div>
              </div>
            </div>
          </Card>
        </div> */}

        <DelegateDataTable />
      </div>
    </div>
  );
};

export default page;
