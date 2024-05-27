import React from 'react';

interface Printh5Props {
    txt: string | undefined
}

const Printh5: React.FC<Printh5Props> = ({
    txt
}) => {
    return (
        <h5 style={{
            paddingBottom: ".5rem",
              fontWeight: "bold",
              fontSize: "16px",
        }}>
            {txt}
        </h5>
    );
};

export default Printh5;