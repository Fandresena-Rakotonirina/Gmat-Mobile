import React from 'react';
import CardUser from './cardUser';

const ListUser = ({ users, renderMenu }) => {
    return (
        <>
            {users.map((user, index) => (
                <CardUser key={index} user={user} index={index} renderMenu={renderMenu} />
            ))}
        </>
    );
};

export default ListUser;
