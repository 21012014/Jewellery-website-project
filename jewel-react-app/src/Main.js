import React, { Component } from 'react';
import Web3 from 'web3';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllItems: false, // Initially, show only available items
            sortByPriceAscending: true, // Initially, sort by price in ascending order
            sortedListOfJewels: [], // Holds the sorted list of jewelry items
        };
    }
    render() {
        const sortedListOfJewels = [...this.props.listOfJewels].sort((a, b) => {
            const priceA = parseFloat(Web3.utils.fromWei(a.price, 'ether'));
            const priceB = parseFloat(Web3.utils.fromWei(b.price, 'ether'));
            return this.state.sortByPriceAscending ? priceA - priceB : priceB - priceA;
        });
        return (
            <div className="row mx-auto">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center ">
                        <h1 className="display-4 fw-bolder" >Radiate Brilliance</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-sm-8 text-center">
                        <div className="row align-items-center">
                            <h2><span className="head2">{this.props.jewelleryCount}</span> available statement pieces up for sale</h2>
                            <h4> Signed in account: {this.props.account} </h4> <h4 className="head4"> </h4>
                        </div>
                    </div> <p></p><p></p>
                    <div className="text-center mb-4 " style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button className="btn btn-primary bg-dark text-light border-dark" onClick={() => this.setState({showAllItems: !this.state.showAllItems})}>
                            {this.state.showAllItems ? 'Show Available Items' : 'Show All Items'}
                        </button>
                        <button className="btn btn-primary bg-dark text-light border-dark" onClick={() => this.setState({sortByPriceAscending: !this.state.sortByPriceAscending})}>
                            {this.state.sortByPriceAscending ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)'}
                        </button>
                    </div>
                    <br/><hr/><br/>
                </div>
                <div className='container '>
                <div id="jewelRow" className="row"> {sortedListOfJewels.map((jewel, key) => {
                    const priceInEth = Web3.utils.fromWei(jewel.price, 'ether');
                    if (!this.state.showAllItems && JSON.parse(jewel.status) == 1) {
                        // Skip rendering sold items if showAllItems is false
                        return null;
                    }
                    return (
                    <div key={key} className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card mb-4 border border-2 p-3">
                            <img
                                alt="140x140"
                                data-src="holder.js/140x140"
                                className="card-img-top"
                                src={"/images/jewel" + jewel.jewelId.toString() + ".png"}
                                style={{ width: '100%', height: '350px', // Set width and height
                                opacity: !JSON.parse(jewel.status) ? 1 : 0.3, // Adjust the opacity value for sold lamps
                                }} 
                                data-holder-rendered="true"
                            />
                            {JSON.parse(jewel.status == 1) && (
                                            <div
                                                className="sold-overlay"
                                                style={{
                                                    position: 'absolute',
                                                    top: '25%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    color: 'white',
                                                    fontSize: 'large',
                                                    padding: '5px 15px 5px 15px',
                                                    borderRadius: '5px'
                                                }}
                                            >
                                                Sold
                                            </div>
                                        )}
                            <div className="card-body">
                                <h3 className="card-title text-center">{jewel.jewelName}</h3>
                                <h5 className="card-title text-center">{jewel.description}</h5>
                                <h5 className="card-title text-center">Price: {priceInEth} ETH</h5>
                                <hr/>
                                <p className="card-text">Type: {jewel.jewelType}</p>
                                <p className="card-text">Material: {jewel.jewelMaterial}, {jewel.gemstoneType}</p>
                                <p className="card-text">Production Date: {jewel.productionDate}</p>
                                <p className="card-text">Jewellery Owner: {jewel.ownerId}</p>
                                <hr/>
                                <strong className='text-center'>
                                    {
                                        !JSON.parse(jewel.status) ?
                                            <button className="btn btn-primary text-center col-4"
                                                name={jewel.jewelId}
                                                value={jewel.price}
                                                onClick={(event) => {
                                                    console.log("buy clicked")
                                                    this.props.purchaseJewellery(event.target.name, event.target.value)
                                                }}
                                            >Buy</button>
                                            : <p>Sold</p>
                                    }
                                </strong>
                            </div>
                        </div>    
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
        )
    }
}

export default Main;