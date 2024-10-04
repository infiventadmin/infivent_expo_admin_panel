import React from "react";
import styles from "@/styles/app/(main)/oem/datatable.module.scss";
import { Datatable } from "@/components/oem/PowerRequirementsDatatable";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Exhibitor Power Requirement</h1>
      </div>
      <Datatable />
    </div>
  );
};

export default Page;
