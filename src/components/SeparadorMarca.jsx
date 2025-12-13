import React from "react";

export const SeparadorMarca = ({ titulo }) => {
  return (
    <div className="d-flex align-items-center gap-3 my-4">
      <h5 className="m-0 fw-bold text-uppercase">{titulo}</h5>
      <hr className="flex-grow-1 m-0" />
    </div>
  );
};

export default SeparadorMarca;
