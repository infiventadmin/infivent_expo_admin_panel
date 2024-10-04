import React from "react";
import { useControls } from "react-zoom-pan-pinch";
import styles from "@/styles/app/(main)/stall/stall.module.scss";
import { Button } from "@/components/ui/button";

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <>
      <div className={styles.container}>
        <Button onClick={() => zoomIn()}>Zoom In</Button>
        <Button onClick={() => zoomOut()}>Zoom Out</Button>
        <Button onClick={() => resetTransform()}>Reset</Button>
      </div>
      <br />
    </>
  );
};
export default Controls;
