// import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import Footer from './Footer';
import React, { Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddJewellery from "./pages/AddJewellery";
import AboutUs from "./pages/AboutUs";
import Layout from "./pages/Layout";
import JewelleryContract from './build/JewelleryContract.json';
import Main from './Main';


class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      // if ethereum blockchain found, connect
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      // if local blockchain like ganache
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      // if no blockchain
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0]);
    this.setState({account:accounts[0]})
    const networkId = await web3.eth.net.getId()
    console.log(networkId)

    const networkData = JewelleryContract.networks[networkId]

    if(networkData) {
      var apc = 0
      const contractInfo = new web3.eth.Contract(JewelleryContract.abi, networkData.address)
      this.setState({ contractInfo })
      console.log(contractInfo)
      const jewelleryCount = await contractInfo.methods.getJewelleryCount().call()
      console.log("Jewellery Count:", jewelleryCount.toString());
      this.setState({ jewelleryCount }) 

      for (var i = 1; i <= jewelleryCount; i++) {
        const jewelInfo = await contractInfo.methods.listOfJewels(i).call()
     
        this.setState({
          listOfJewels: [...this.state.listOfJewels, jewelInfo]
        })
          
        if (jewelInfo.status ==  '0') {
          console.log("STATUS ZERO")
          apc++;
        }

        console.log(this.state.listOfJewels);
      }

      this.setState({
        availableJewelleryCount: apc
      })
    } else {
      window.alert('Jewellery contract not deployed to detected network.')
    } 


  }

  // initializes and declares variables
  constructor(props) {
    super(props)
    this.state = {
      account: '',  
      jewelleryCount: 0,    
      listOfJewels: [],
    }
    this.addJewellery = this.addJewellery.bind(this)
    this.purchaseJewellery = this.purchaseJewellery.bind(this)
  }

  addJewellery(jewelName, jewelType, jewelMaterial, gemstoneType, productionDate, description,  price) {    
    this.state.contractInfo.methods.addJewellery(jewelName, jewelType, jewelMaterial, gemstoneType, productionDate, description,  price).send({ from: this.state.account })
  }

  purchaseJewellery(id, price) {
    console.log("Price")
    console.log(price)

    this.state.contractInfo.methods.purchaseJewellery(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => { })    

  }
  render () { 
    return (
      <div>
        <NavBar account={this.state.account}></NavBar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="AddJewellery" element={<AddJewellery jewelleryCount={this.state.jewelleryCount} 
                                                    account={this.state.account} 
                                                    addJewellery={this.addJewellery}/>}/>
              <Route path="AddJewellery" element={<AddJewellery/>} />
              <Route path="AboutUs" element={<AboutUs />} />
              <Route index element={<Main jewelleryCount={this.state.availableJewelleryCount} 
                                          account={this.state.account} 
                                          listOfJewels = {this.state.listOfJewels}
                                          purchaseJewellery = {this.purchaseJewellery}
                                      />} />
            </Route>
          </Routes>
        </BrowserRouter> 
        <Footer></Footer>
      </div>
    )
  };
}

export default App;