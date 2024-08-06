import React from "react";
import CardMaterielEnPanne from "./cardMaterielEnPanne";

function ListMaterielEnPanne({ details,showModal }) {
  return (
    <>
      {details.map((detail, index) => (
        <CardMaterielEnPanne key={index} detail={detail} showModal={showModal} />
      ))}
    </>
  );
}

export default ListMaterielEnPanne;
