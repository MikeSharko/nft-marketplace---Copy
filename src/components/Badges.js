import React from "react";

const Badges = (props) => {
    const balanceOf = props.balanceOf
    const allNfts = props.allNfts
  return (
    <div>
      <h5 className="ml-5 badge badge-warning">
        Market Total [{allNfts.length}] NFT's
      </h5>
      <h5 className="ml-5 badge badge-warning">
        You have [{balanceOf}] NFT's
      </h5>
    </div>
  );
};

export default Badges;
