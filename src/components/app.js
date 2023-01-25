import React, { Component } from "react";
import { render } from "react-dom";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import NFT from "../abis/NFT.json";
import Mint from "./Mint";
import Navbar from "./Navbar";
import NftCards from "./NftCards";
import Footer from "./Footer";

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
import "./app.css";
import logo3 from "../brand/NFT.png";
import Animation from "./Animation";
import Badges from "./Badges";
import Filter from "./Filter";
// import { Footer } from "react-bootstrap/lib/Modal";


//import { Navbar } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      balanceOf: 0,
      stateKey: "",
      ownerOfNfts: [],
      transferTo: "",
      checked: false,
      allNfts: [],
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //detect an Etherium provider
  async loadWeb3() {
    const provider = await detectEthereumProvider();

    //modern browsers
    // if there is a provider then lets console.log that its working
    if (provider) {
      console.log("ethereum wallet is connnected");
      window.web3 = new Web3(provider);
    } else {
      console.log("No etherium wallet detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log(this.state.account);

    const networkID = await web3.eth.net.getId(); // calling networkID from ganache
    const networkData = NFT.networks[networkID];
    if (networkData) {
      const abi = NFT.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      console.log("-=contract=-", contract);
      this.setState({ contract });
      //call the total supply
      const totalSupp = await contract.methods.totalSupply().call();
      // this.setState({ totalSupply: parseInt(totalSupp._hex) });

      // this if else statement will not throw an error if the account is not connected.
      if (!this.state.account == "") {
        const balanceOf = await contract.methods
          .balanceOf(this.state.account)
          .call();
        this.setState({ balanceOf: parseInt(balanceOf._hex) }); //accessing the object value and converting it to decimal
      } else {
        console.log("Account is not connected");
      }

      for (let i = 1; i <= totalSupp; i++) {
        const NFT = await contract.methods.nftArray(i - 1).call();

        this.setState({
          allNfts: [...this.state.allNfts, NFT],
        });
      }

      for (let i = 0; i <= totalSupp; i++) {
        const _currentOwnerNfts = await contract.methods.ownerOf(i).call();

        this.setState({
          ownerOfNfts: [...this.state.ownerOfNfts, _currentOwnerNfts],
        });
      }
    } else {
      window.alert("Smart contract not deplyed");
    }
  }

  //With minting we are sending info, and we need to specify an account
  mint = (nft) => {
    this.state.contract.methods
      .mint(nft)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({
        NFTz: [...this.state.NFTz, NFT],
        });
      });
  };

  transfer1 = (transfer, nftNumber) => {
    this.state.contract.methods
      .transferFrom(this.state.account, transfer, nftNumber)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({
          NFTz: [...this.state.NFTz, NFT],
        });
      });
    console.log(this.state.account, this.state.transferTo, nftNumber);
  };

  handleClear =() => {
     

 
    
  }


  render() {
    return (
      <div>
        {/* NAVBAR */}
        <Navbar logo={logo3} account={this.state.account} />

        {/* Flying squares animation */}
        <Animation />

        <div className="container-fluid mt-1 context" id="mint">
          {/* Mint component  */}
          <Mint
            mint={(nft) => {
              this.mint(nft);
            }}
          />

          {/* ===========TRANSFER FORM================================= */}
          <div className="container-fluid text-center">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const transfer = this.transfer.value;
                const nftNumber = this.nftNumber.value;
                this.setState({ transferTo: transfer });
                this.transfer1(transfer, nftNumber);
              }}
            >
              <input
                type="text"
                placeholder="address from"
                required
                value={this.state.account}
              />
              <input
                type="text"
                placeholder="address to"
                required
                ref={(input) => (this.transfer = input)}
                 
              />
              <input
                type="number"
                placeholder="auto transfer key"
                required
                ref={(input) => (this.nftNumber = input)}
                value={this.state.stateKey}
              />
              <input
                type="submit"
                className="btn btn-info mb-2 ml-1"
                value="TRANSFER"
              />
              
              <button onClick={() => this.handleClear} className="btn btn-info mb-2 ml-1" >CLEAR</button>
            </form>
            
          </div>
          {/* ============================================ */}

          <hr></hr>
          <div className="container-fluid">
            <Badges
              allNfts={this.state.allNfts}
              balanceOf={this.state.balanceOf}
            />
            <Filter
              checked={this.state.checked}
              setState={(arg) => {
                this.setState(arg);
              }}
            />
          </div>

          <div id="Nft-cards">
            <NftCards
              allNfts={this.state.allNfts}
              checked={this.state.checked}
              ownerOfNfts={this.state.ownerOfNfts}
              setState={(key) => {
                this.setState(key);
              }}
              thisAccount={this.state.account}
            />
          </div>

          
          {/* END of NFT CARD AREA */}

           
          <Footer/>   
        </div>
       
      </div>
      
    );
  }
}
export default App;
