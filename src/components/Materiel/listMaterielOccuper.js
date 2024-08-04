import React from "react";
import CardMaterielOccuper from "./cardMaterielOccuper";

function ListMaterielOccuper({ details,showModal }) {
  return (
    <>
      {details.map((detail, index) => (
        <CardMaterielOccuper key={index} detail={detail} showModal={showModal} />
      ))}
    </>
  );
}

export default ListMaterielOccuper;
