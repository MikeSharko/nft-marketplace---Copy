import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBCardTitle,
    MDBCardFooter,
    MDBFooter,
  } from "mdb-react-ui-kit";

const NftCards = (props) => {
    const allNfts = props.allNfts
    const checked = props.checked
    const ownerOfNfts = props.ownerOfNfts
    const setState = props.setState
    const thisAccount = props.thisAccount
  return (
    <div className="row textCenter container-fluid ml-auto">

      {allNfts.map((nft, key) => {
       
       if (!checked) {
          
            return (
             
              <div >
                <MDBCard
                  className="token img bg-light shadow"
                  style={{ maxWidth: "15rem" }}
                >
                  <MDBCardImage src={nft} position="top" className="" />
                  <MDBCardBody className="bg-light">
                    <MDBCardTitle className="text-dark">
                      {" "}
                      NFT key: {key}
                    </MDBCardTitle>
                    <MDBCardText className="text-dark font-weight-light ">
                      <span className="">Owner of current NFT:</span>{" "}
                      {ownerOfNfts[key]}
                    </MDBCardText>
                    {/* <MDBCardText className='text-dark'>NFT location: <span>{kryptoBird}</span> </MDBCardText> */}

                    <MDBBtn href={nft} className="mr-1">
                      Download
                    </MDBBtn>
                    <MDBBtn
                      href="#mint"
                      className=""
                      onClick={() => {
                        setState({ stateKey: key });
                      }}
                    >
                      Transfer
                    </MDBBtn>
                  </MDBCardBody>
                  <MDBCardFooter></MDBCardFooter>
                </MDBCard>
              </div>
             
          );  
        } else if (
            checked &&
            ownerOfNfts[key] == thisAccount
        ) {
          return (
            <div>
              <div>
                <MDBCard
                  className="token img bg-light shadow"
                  style={{ maxWidth: "15rem" }}
                >
                  <MDBCardImage src={nft} position="top" className="" />
                  <MDBCardBody className="bg-light">
                    <MDBCardTitle className="text-dark">
                      {" "}
                      NFT key: {key}
                    </MDBCardTitle>
                    <MDBCardText className="text-dark font-weight-light ">
                      <span className="">Owner of current NFT:</span>{" "}
                      {ownerOfNfts[key]}
                    </MDBCardText>
                    {/* <MDBCardText className='text-dark'>NFT location: <span>{kryptoBird}</span> </MDBCardText> */}

                    <MDBBtn href={nft} className="mr-1">
                      Download
                    </MDBBtn>
                    <MDBBtn
                      href="#mint"
                      className=""
                      onClick={() => {
                        setState({ stateKey: key });
                      }}
                    >
                      Transfer
                    </MDBBtn>
                  </MDBCardBody>
                  <MDBCardFooter></MDBCardFooter>
                </MDBCard>
              </div>
            </div>
          );
        }
      })}


    </div>
  );
};

export default NftCards;
