import { AddCircleOutline } from "@mui/icons-material";
import { Grid, Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./totalVolumeCard.module.css";

type TTotalVolumeCardProps = {
  isLoading: boolean;
  title: string | number;
  to?: string;
  prefix?: string;
  foiz?: number
};

const TotalVolumeCard: React.FC<TTotalVolumeCardProps> = ({
  title,
  to,
  isLoading,
  foiz = 0,
  prefix = "kg",
}) => {
  return (
    <Grid container spacing={1} sx={{ mb: 2 }}>
      {!to ? (
        <Grid item xs={12}>
          <div className={styles.totalVolumeCard}>
            {isLoading ? (
              <Skeleton variant="text" height={50} width={"100%"} />
            ) : (
              <>
                <h1 className={styles.totalVolumeCardTitle}>
                  {title}{" "}
                  <span className={styles.totalVolumeCardPrefix}>{prefix}</span>
                </h1>
              </>
            )}
          </div>
        </Grid>
      ) : (
        <>
          <Grid item xs={6}>
            <div className={styles.totalVolumeCard}>
              {isLoading ? (
                <Skeleton variant="text" height={50} width={"100%"} />
              ) : (
                <>
                  <h1 className={styles.totalVolumeCardTitle}>
                    {title}{" "}
                    <span className={styles.totalVolumeCardPrefix}>kg </span>
                    <span className={styles.totalVolumeCardPrefix}>{foiz} %</span>
                  </h1>
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Link
              to={to}
              className={[styles.totalVolumeCard, styles.outlined].join(" ")}
            >
              <AddCircleOutline sx={{ color: "#3bbe92", fontSize: "40px" }} />
            </Link>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default TotalVolumeCard;
