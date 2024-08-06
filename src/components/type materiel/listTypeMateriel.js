import React from 'react';
import CardTypeMateriel from './cardTypeMateriel'; // Assurez-vous que le chemin est correct

const ListTypeMateriel = ({ details, renderMenu }) => {
    return (
        <>
            {details.map((detail, index) => (
                <CardTypeMateriel key={index} detail={detail} index={index} renderMenu={renderMenu} />
            ))}
        </>
    );
};

export default ListTypeMateriel;
