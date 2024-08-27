import React from 'react';
import CardTechnicien from './cardTechnicien';

const ListTechnicien = ({ techniciens, renderMenu }) => {
    return (
        <>
            {techniciens.map((technicien, index) => (
                <CardTechnicien key={index} technicien={technicien} index={index} renderMenu={renderMenu} />
            ))}
        </>
    );
};

export default ListTechnicien;
