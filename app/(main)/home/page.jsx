"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/home/Overview";
import { RecentExhibitor } from "@/components/home/RecentExhibitor";
import { useState, useEffect } from "react";
import supabase from "@/supabase/config";
import { Chart } from "react-google-charts";

export const data2 = [
  ["Country", "Popularity"],

  ["Afghanistan", 100],
  ["Albania", 100],
  ["Algeria", 300],
  ["Andorra", 300],
  ["Angola", 300],
  ["Antigua and Barbuda", 300],
  ["Argentina", 700],
  ["Armenia", 700],
  ["Australia", 700],
  ["Austria", 700],
  ["Azerbaijan", 700],
  ["Bahamas", 700],
  ["Bahrain", 400],
  ["Bangladesh", 400],
  ["Barbados", 400],
  ["Belarus", 400],
  ["Belgium", 400],
  ["Belize", 400],
  ["Benin", 400],
  ["Bhutan", 500],
  ["Bolivia", 500],
  ["Bosnia and Herzegovina", 500],
  ["Botswana", 500],
  ["Brazil", 500],
  ["Brunei", 500],
  ["Bulgaria", 600],
  ["Burkina Faso", 600],
  ["Burundi", 600],
  ["Cabo Verde", 600],
  ["Cambodia", 600],
  ["Cameroon", 700],
  ["Canada", 700],
  ["Central African Republic", 700],
  ["Chad", 800],
  ["Chile", 800],
  ["China", 800],
  ["Colombia", 800],
  ["Comoros", 800],
  ["Congo (Congo-Brazzaville)", 800],
  ["Costa Rica", 900],
  ["Croatia", 900],
  ["Cuba", 900],
  ["Cyprus", 900],
  ["Czechia (Czech Republic)", 900],
  ["Democratic Republic of the Congo (Congo-Kinshasa)", 900],
  ["Denmark", 900],
  ["Djibouti", 50],
  ["Dominica", 50],
  ["Dominican Republic", 50],
  ["East Timor (Timor-Leste)", 50],
  ["Ecuador", 50],
  ["Egypt", 50],
  ["El Salvador", 50],
  ["Equatorial Guinea", 50],
  ["Eritrea", 1000],
  ["Estonia", 1000],
  ["Eswatini", 1000],
  ["Ethiopia", 1000],
  ["Fiji", 1000],
  ["Finland", 1000],
  ["France", 1000],
  ["Gabon", 1000],
  ["Gambia", 30],
  ["Georgia", 30],
  ["Germany", 30],
  ["Ghana", 30],
  ["Greece", 30],
  ["Grenada", 30],
  ["Guatemala", 30],
  ["Guinea", 30],
  ["Guinea-Bissau", 20],
  ["Guyana", 20],
  ["Haiti", 20],
  ["Honduras", 20],
  ["Hungary", 20],
  ["Iceland", 20],
  ["India", 1500],
  ["Indonesia", 20],
  ["Iran", 20],
  ["Iraq", 80],
  ["Ireland", 80],
  ["Israel", 80],
  ["Italy", 80],
  ["Ivory Coast", 80],
  ["Jamaica", 80],
  ["Japan", 80],
  ["Jordan", 80],
  ["Kazakhstan", 80],
  ["Kenya", 80],
  ["Kiribati", 90],
  ["Kuwait", 90],
  ["Kyrgyzstan", 90],
  ["Laos", 90],
  ["Latvia", 90],
  ["Lebanon", 90],
  ["Lesotho", 90],
  ["Liberia", 90],
  ["Libya", 90],
  ["Liechtenstein", 90],
  ["Lithuania", 70],
  ["Luxembourg", 70],
  ["Madagascar", 70],
  ["Malawi", 70],
  ["Malaysia", 70],
  ["Maldives", 70],
  ["Mali", 70],
  ["Malta", 40],
  ["Marshall Islands", 40],
  ["Mauritania", 40],
  ["Mauritius", 40],
  ["Mexico", 40],
  ["Micronesia", 40],
  ["Moldova", 40],
  ["Monaco", 1900],
  ["Mongolia", 350],
  ["Montenegro", 350],
  ["Morocco", 350],
  ["Mozambique", 350],
  ["Myanmar (formerly Burma)", 350],
  ["Namibia", 350],
  ["Nauru", 1000],
  ["Nepal", 140],
  ["Netherlands", 140],
  ["New Zealand", 140],
  ["Nicaragua", 140],
  ["Niger", 140],
  ["Nigeria", 140],
  ["North Macedonia (formerly Macedonia)", 170],
  ["Norway", 170],
  ["Oman", 170],
  ["Pakistan", 170],
  ["Palau", 170],
  ["Palestine State", 170],
  ["Panama", 170],
  ["Papua New Guinea", 170],
  ["Paraguay", 140],
  ["Peru", 140],
  ["Philippines", 140],
  ["Poland", 140],
  ["Portugal", 100],
  ["Qatar", 100],
  ["Romania", 25],
  ["Russia", 1200],
  ["Rwanda", 25],
  ["Saint Kitts and Nevis", 25],
  ["Saint Lucia", 25],
  ["Saint Vincent and the Grenadines", 36],
  ["Samoa", 36],
  ["San Marino", 36],
  ["Sao Tome and Principe", 36],
  ["Saudi Arabia", 36],
  ["Senegal", 130],
  ["Serbia", 130],
  ["Seychelles", 130],
  ["Sierra Leone", 130],
  ["Singapore", 130],
  ["Slovakia", 130],
  ["Slovenia", 10],
  ["Solomon Islands", 10],
  ["Somalia", 10],
  ["South Africa", 10],
  ["South Sudan", 10],
  ["Spain", 10],
  ["Sri Lanka", 10],
  ["Sudan", 120],
  ["Suriname", 120],
  ["Sweden", 120],
  ["Switzerland", 120],
  ["Syria", 120],
  ["Tajikistan", 120],
  ["Tanzania", 120],
  ["Thailand", 150],
  ["Togo", 150],
  ["Tonga", 150],
  ["Trinidad and Tobago", 150],
  ["Tunisia", 150],
  ["Turkey", 150],
  ["Turkmenistan", 150],
  ["Tuvalu", 150],
  ["Uganda", 160],
  ["Ukraine", 160],
  ["United Arab Emirates", 160],
  ["United Kingdom", 160],
  ["United States of America", 160],
  ["Uruguay", 160],
  ["Uzbekistan", 160],
  ["Vanuatu", 190],
  ["Vatican City (Holy See)", 190],
  ["Venezuela", 190],
  ["Vietnam", 190],
  ["Yemen", 190],
  ["Zambia", 190],
  ["Zimbabwe", 190],
  // Add more countries and their popularity values here
];
const data = [
  {
    name: "Category1",
    total: 500,
  },
  {
    name: "Category2",
    total: 1000,
  },
  {
    name: "Category3",
    total: 1800,
  },
  {
    name: "Category4",
    total: 1200,
  },
  {
    name: "Category5",
    total: 1800,
  },
];
export default function DashboardPage() {
  //Total exhibitors
  const [totalEntriesExhibitor, setTotalEntriesExhibitor] = useState(0);

  const fetchTotalExhibitors = async () => {
    const { data, error } = await supabase.from("exhibitor").select("id");

    if (error) {
      console.log("error fetching supabase exhis", error);
    } else {
      console.log(data);
      setTotalEntriesExhibitor(data.length);
    }
  };

  //Total Delegates
  const [totalEntriesDelegate, setTotalEntriesDelegates] = useState(0);

  const fetchTotalDelegates = async () => {
    const { error, data } = await supabase.from("delegate").select("id");

    if (error) {
      console.log("error: ", error);
    } else {
      setTotalEntriesDelegates(data.length);
    }
  };

  //Total Visitors
  const [totalEntriesVisitor, setTotalEntriesVisitor] = useState(0);

  const fetchTotalVisitors = async () => {
    const { error, data } = await supabase.from("visitor").select("id");

    if (error) {
      console.log("Error: ", error);
    } else {
      setTotalEntriesVisitor(data.length);
    }
  };
  useEffect(() => {
    fetchTotalExhibitors();
    fetchTotalDelegates();
    fetchTotalVisitors();
  }, []);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-3">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className=" text-[18px] font-medium bg-[#423A8E] py-1 px-4  rounded-md text-white">
                      Exhibitor
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#423A8E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-7 w-7 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-[40px] font-bold ">
                      {totalEntriesExhibitor}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[18px] font-medium bg-[#423A8E] py-1 px-4  rounded-md text-white">
                      Delegate
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#423A8E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-7 w-7 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-[40px] font-bold">
                      {totalEntriesDelegate}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[18px] font-medium bg-[#423A8E] py-1 px-4  rounded-md text-white">
                      Visitors
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#423A8E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-7 w-7 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-[40px] font-bold">
                      {totalEntriesVisitor}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[18px] font-medium bg-[#423A8E] py-1 px-4  rounded-md text-white">
                      Vendors
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#423A8E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-7 w-7 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-[40px] font-bold">1</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Exhibitor Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3 h-[440px] overflow-hidden">
                  <CardHeader>
                    <CardTitle className=" ">Recent Exhibitors</CardTitle>
                    {/* <CardDescription className="">
                      You made 265 sales this month.
                    </CardDescription> */}
                  </CardHeader>
                  <ScrollArea className="h-[345px]">
                    <CardContent>
                      <RecentExhibitor />
                    </CardContent>
                  </ScrollArea>
                </Card>

                <Card className="col-span-8 h-[640px] overflow-hidden">
                  <CardHeader>
                    <CardTitle className=" ">Exhibitor Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      chartEvents={[
                        {
                          eventName: "select",
                          callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();
                            if (selection.length === 0) return;
                            const region = data[selection[0].row + 1];
                            console.log("Selected : " + region);
                          },
                        },
                      ]}
                      chartType="GeoChart"
                      width="100%"
                      height="400px"
                      data={data2}
                      options={{
                        displayMode: "regions",
                        region: "world",
                        resolution: "countries",
                        colorAxis: { colors: ["#BCC1F3"] }, // Set the color scale
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
