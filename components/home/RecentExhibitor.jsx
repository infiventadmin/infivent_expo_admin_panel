import React, { useState, useEffect } from "react"; // Import React if not already imported
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import data from "@/data/tableData";
import supabase from "@/supabase/config";

export function RecentExhibitor() {
  const [updtedData, setUpdatedData] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [stall, setStall] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchExhiData = async () => {
      const { error, data } = await supabase
        .from("exhibitor")
        .select("id, name, company_name, assigned_stall")
        .order("created_at", { ascending: true });

      if (error) {
        console.log("error:", error);
      } else {
        console.log(data);
        setCompanyName(data.company_name);
        setName(data.name);
        setId(data.id);
        setStall(data.assigned_stall);
        setUpdatedData(data);
        console.log(updtedData);
      }
    };
    fetchExhiData();
  }, []);
  return (
    <div className="space-y-8">
      {updtedData.map((data, index) => (
        <div key={data.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${data.id}.png`} alt="Avatar" />
            <AvatarFallback>
              {data.company_name.charAt(0)}
              {data.company_name.split(" ").slice(-1)[0].charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {data.company_name}
            </p>
            <p className="text-sm text-muted-foreground">{data.name}</p>
          </div>
          <div className="ml-auto font-medium">{data.assigned_stall}</div>
        </div>
      ))}
    </div>
  );
}
