import React from "react";
import styles from "./sectionTitle.module.css"

type TSectionTitleProps = {
  title: string;
};

const SectionTitle: React.FC<TSectionTitleProps> = ({ title }) => {
  return <h3 className={styles.sectionTitle}>{title}</h3>;
};

export default SectionTitle;
