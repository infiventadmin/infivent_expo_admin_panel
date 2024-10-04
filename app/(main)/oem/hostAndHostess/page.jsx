import React from "react";
import styles from "@/styles/app/(main)/oem/datatable.module.scss";
import { Datatable } from "@/components/oem/HostAndHostess";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Host and Hostess</h1>
      </div>
      <Datatable />
    </div>
  );
};

export default Page;
