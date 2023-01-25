 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import './ERC165.sol';
import './interfaces/IERC721.sol';


   /* 
    
        building out the mintin function:
    a. nft to point to an address
    b. keep track of the token ids
    c. keep track of token owner addressses to token ids
    d. keep track of how many tokens an owner addresss has
    e. create an event the  emits a transfer log
    
    */
contract ERC721 is ERC165, IERC721 {

 
 
 //mapping from token id to the owner
 mapping (uint256 => address) private _tokenOwner;

//mapping from owner to number of owned tokens
 mapping (address => uint256) private _tokensOwnedCount;

 //mapping from token id to approved addresses

 mapping (uint256 => address) private _tokenApproval;


 

  constructor(){
        _registerInterface(bytes4(keccak256('balanceOf(bytes4)')^
        keccak256('OwnerOf(bytes4)')^keccak256('transferFrom(bytes4)')
        ));
     } 

 function balanceOf(address _owner) public override view returns (uint256)  {
    require(_owner != address(0), 'ERC721: Address  should not be 0');
    return _tokensOwnedCount[_owner];
 }

 //Find an owner of NFT
 function ownerOf(uint256 _tokenId) public override view returns(address) {
    address owner = _tokenOwner[_tokenId];
    require(owner != address(0));
    return owner;
 }

function _exists(uint256 tokenId) internal view returns(bool){
    address owner = _tokenOwner[tokenId];
    return owner !=address(0);
}

 //building a mintin function

 // function _mint is virtual , because we are overwriting it in ERC721Enumerable.sol, and also using it in NFT.sol
 function _mint (address to , uint256 tokenId) internal virtual{
    //requires that address is not 0
    require(to != address(0), 'The required address should not be 0'); // require address not to be 0
    //requires that token does not exiists
    require(!_exists(tokenId), 'ERC721: token already minted'); 
    _tokenOwner[tokenId] = to;
    //keeping track of each address that is minting and adding one
    _tokensOwnedCount[to] +=1;

    emit Transfer(address(0), to, tokenId);
    
 }

 function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
   require(_to !=address(0), 'Error ERC721 Transfer');
   require(ownerOf(_tokenId) == _from, 'Error ERC721 ,Trying to transfer a token the address does not own ');
   
   _tokenOwner[_tokenId] = _to;
   _tokensOwnedCount[_from] -=1;
   _tokensOwnedCount[_to] +=1;

   emit Transfer(_from, _to, _tokenId);
 }

   function approve(address _to, uint256 _tokenId)  public {
      address owner = ownerOf(_tokenId);
      require (_to !=owner, 'Error aproval to current owner');
      require (msg.sender == owner, 'Current caller is not the owner of the token');
      _tokenApproval[_tokenId] = _to;
      emit Approval(owner, _to, _tokenId);

   }

   function isApprovedOrOwner(address spender, uint256 _tokenId) internal view returns(bool){
      require(_exists(_tokenId),'token does not exist');
      address owner  = ownerOf(_tokenId);
      return(spender == owner);   
      }

   function transferFrom(address _from, address _to, uint256 _tokenId) public override {
   require(isApprovedOrOwner(msg.sender, _tokenId));
   _transferFrom (_from, _to, _tokenId);
 }

}