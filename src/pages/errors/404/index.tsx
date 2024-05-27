import React from 'react';

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../errors.module.css";

const Index:React.FC = () => {
    // Navigate
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);


    return (
        <div className={styles.content}>
            <img src="/images/illustration_404.svg" alt="404"/>
            <h2 className={styles.title}> Bu sahifani topa olmadik! </h2>
            <Button variant={'contained'} onClick={handleBack}>Orqaga qaytish</Button>
        </div>
    );
};

export default Index;