"use client";
import React, { useState } from "react";
import styles from "@/styles/app/(main)/oem/oem.module.scss";
import { Button } from "@/components/ui/button";
import { Datatable } from "@/components/oem/Datatable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Page = () => {
  const [viewToggle, setViewToggle] = useState(false);

  const handleClick = () => {
    setViewToggle(!viewToggle);
  };

  return (
    <div className="px-2">
      <div>
        <br></br>
        <div className={styles.heading}>
          <h1 className={styles.h1}>OEM FORMS</h1>
        </div>
        <div className={styles.flex_one}>
          {/* <Link className={styles.card} href="/oem/userProfile">
            <div>
              {" "}
              <h1>User Profile</h1> <p>Exhibitor User Profile.</p>{" "}
            </div>
          </Link> */}

          <Card className={styles.card}>
            <Link href="/oem/userProfile">
              <CardHeader>
                <CardTitle>
                  <h1>User Profile</h1>
                </CardTitle>
                <CardDescription>
                  <p>Exhibitor User Profile</p>
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className={styles.card}>
            <Link href="/oem/fascia">
              <CardHeader>
                <CardTitle>
                  <h1>Fascia Board Name</h1>
                </CardTitle>
                <CardDescription>
                  <p>Exhibitor Stall Fascia</p>
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
          {/* <Link className={styles.card} href="/oem/exhibitorBadges">
            <div>
              {" "}
              <h1 className={styles.h1}>Exhibitor Badges</h1>{" "}
              <p>Information about people who will be manning at stall.</p>{" "}
            </div>
          </Link> */}
          <Card className={styles.card}>
            <Link href="/oem/exhibitorBadges">
              <CardHeader>
                <CardTitle>
                  <h1 className={styles.h1}>Exhibitor Badges</h1>
                </CardTitle>
                <CardDescription>
                  <p>Information about people who will be manning at stall</p>
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
        <div className={styles.flex_two}>
          <Card className={styles.card}>
            <Link href="/oem/powerRequirement">
              <CardHeader>
                <CardTitle>
                  <h1>Power Requirement</h1>
                </CardTitle>
                <CardDescription>
                  <p>Exhibitor Stall Power Requirement</p>
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
          <Card className={styles.card}>
            <Link href="/oem/furniture">
              <CardHeader>
                <CardTitle>
                  <h1>Furniture</h1>
                </CardTitle>
                <CardDescription>
                  <p>Exhibitor Furniture</p>
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
          {/* <Card className={styles.card}>
            <Link href="/oem/hostAndHostess">
              <CardHeader>
                <CardTitle>
                  <h1>Host & Hostess</h1>
                </CardTitle>
                <CardDescription>
                  <p>Exhibitor Stall Host And Hostess</p>
                </CardDescription>
              </CardHeader>
            </Link>
          </Card> */}
        </div>
        {viewToggle ? (
          <>
            <div className={styles.flex_two}>
              <Link className={styles.card} href="/oem/boothContractor">
                <div>
                  {" "}
                  <h1 className="font-semibold text-[16px]">
                    Booth Contractor Authorisation
                  </h1>{" "}
                  <p className="font-normal text-[14px] text-[#71717a]">
                    Exhibitor Booth Contractor Authorisation.
                  </p>{" "}
                </div>
              </Link>
              <Link className={styles.card} href="/oem/catalogue">
                <div>
                  <h1 className="font-semibold text-[16px]">Catalogue</h1>{" "}
                  <p className="font-normal text-[14px] text-[#71717a]">
                    Catalogue containing Exhibitor Data.
                  </p>
                </div>
              </Link>
              <Link className={styles.card} href="/oem/participation">
                <div>
                  {" "}
                  <h1 className="font-semibold text-[16px]">
                    Participation
                  </h1>{" "}
                  <p className="font-normal text-[14px] text-[#71717a]">
                    Exhibitor Participation.
                  </p>{" "}
                </div>
              </Link>
            </div>
            <div className={styles.flex_three}>
              <Link className={styles.card} href="/oem/indemnityUndertaking">
                <div>
                  <h1 className="font-semibold text-[16px]">Undertaking </h1>{" "}
                  <p className="font-normal text-[14px] text-[#71717a]">
                    Exhibitor Undertaking.
                  </p>{" "}
                </div>
              </Link>
              <Link className={styles.card} href="/oem/participation">
                <div>
                  <h1 className="font-semibold text-[16px]">Advertisement </h1>{" "}
                  <p className="font-normal text-[14px] text-[#71717a]">
                    Exhibitor Advertisement.
                  </p>{" "}
                </div>
              </Link>
              <Link className={styles.card} href="/oem/participation">
                <div>
                  <h1 className="font-semibold">Sponsorship </h1>{" "}
                  <p className="font-normal text-[14px] text-[#71717a]">
                    Exhibitor Sponsorship.
                  </p>{" "}
                </div>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
        <div className=" mt-5 flex items-center justify-center w-full">
          {/* <Button onClick={handleClick}>
            {!viewToggle ? "View More" : "View Less"}
          </Button> */}
        </div>
      </div>

      <div className={styles.table}>
        <Datatable />
      </div>
    </div>
  );
};

export default Page;
