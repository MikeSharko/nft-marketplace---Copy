// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ERC721Connector.sol';

contract NFT is ERC721Connector{
   
   
   //array to store our NFT's
    string[] public nftArray;
    mapping (string => bool) _nftExists ;

    function mint (string memory _nft) public{
       require(!_nftExists[_nft], 'Error - NFT already exists');
       nftArray.push(_nft);
       uint _id  = nftArray.length -1;
        _mint(msg.sender, _id);
        _nftExists[_nft] = true;
    }



  constructor() ERC721Connector('NFT', 'NFT')
  {
   

  }
 
}