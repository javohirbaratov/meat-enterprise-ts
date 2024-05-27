import React from "react";
import styles from "./productCard.module.css";

export interface IProductCardProps {
  title: string | number;
  caption: string;
  isSelected?: boolean;
  prefix?: string;
  category?: string;
}

const ProductCard: React.FC<IProductCardProps> = ({
  title,
  caption,
  isSelected = false,
  prefix = 'kg',
  category = ""
}) => {
  return (
    <div
      className={[styles.productCard, isSelected ? styles.selected : ""].join(
        " "
      )}
    >
      <div className={styles.productCardBody}>
        <div style={{display: "flex", justifyContent: "end"}}>
          <p className={styles.productCardCaption}>{category}</p>
        </div>
        <h2 className={styles.productCardTitle}>
          {title} <small className={styles.productCardPrefix}>{prefix}</small>
        </h2>
        <p className={styles.productCardCaption}>{caption}</p>
      </div>
    </div>
  );
};

export default ProductCard;
