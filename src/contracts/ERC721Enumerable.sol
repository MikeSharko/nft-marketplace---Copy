// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ERC721.sol';

import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is ERC721, IERC721Enumerable {

    uint256[] private _allTokens;

    //mapping from tokenId to position in _allTokens
    mapping (uint256 => uint256) private _allTokensIndex ;
    //mapping of owner to list of all owner tokens list
    mapping (address => uint256[]) private _ownedTokens;
    //mapping from token ID to index of the owner tokens list
    mapping (uint256 => uint256) private _ownedTokensIndex;

  constructor(){
        _registerInterface(bytes4(keccak256('totlaSupply(bytes4)')^
        keccak256('tokenByIndex(bytes4)')^keccak256('tokenOwnerByIndex(bytes4)')
        ));
     } 
   

    //function tokenByIndex()
    //function tokenOfOwnerByIndex(address _owner, uint256 _index) external {}



    function _mint(address to, uint256 tokenId) internal override(ERC721){
        super._mint(to, tokenId);
        //1. add tokens to the owner
        //2. add tokens to our totalSupply - to allTokens
         _adTokensToAllTokenEnumeration(tokenId);
         _addTokensToOwnerEnumeration(to, tokenId);
    }

    //add tokens to the _alltokens arrya and set the position of the index
    function _adTokensToAllTokenEnumeration(uint256 tokenId)  private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokens[to].push(tokenId);
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;

        //1.add address and token ID to the _ownedTokens
        //2. ownedTokensIndex tokenId set to address of ownedTokens position
        // we want to execute this function with minting
    }

    function tokenByIndex(uint256 index) public override  view returns(uint256){
        require(index < totalSupply(), 'Global index is out of bounds');
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint index) public override view  returns (uint256) {
        require (index < balanceOf(owner), 'Owner index is out of bounds');
        return _ownedTokens[owner][index];
    }

    //RETURN THE TOTAL SUPPLY OF THE _ALLTOKENS ARRAY
    function totalSupply() public override view returns (uint256) {
        return _allTokens.length;
    }


}