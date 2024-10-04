import React from "react";
import { Datatable } from "@/components/oem/UserProfileDatatable";
import styles from "@/styles/app/(main)/oem/datatable.module.scss";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Exhibitor User Profile</h1>
      </div>
      <Datatable />
    </div>
  );
};

export default Page;
