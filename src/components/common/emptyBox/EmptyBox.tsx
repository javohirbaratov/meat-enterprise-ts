import React from "react";
import Image from "../../../assets/images/empty-box.png";
import styles from "./emptyBox.module.css";

const EmptyBox: React.FC = () => {
  return (
    <div className={styles.emptyBox}>
      <img width={120} src={Image} alt="Empty box" />
      <p className={styles.emptyBoxCaption}>Hozircha ma'lumot <br /> topilmadi.</p>
    </div>
  );
};

export default EmptyBox;
