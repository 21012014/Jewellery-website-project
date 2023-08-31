import React, { Component } from 'react';
class AddJewel extends Component {
    render() {
        return (
            <div id="content" className="row justify-content-center">
                <div className="col-lg-6 p-3">
                <p> Total no. of jewelleries {this.props.jewelleryCount} </p>
                <h1>Add Jewellery </h1><p></p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const jewelName = this.jewelName.value
                    const jewelType = this.jewelType.value
                    const jewelMaterial = this.jewelMaterial.value
                    const gemstoneType = this.gemstoneType.value
                    const productionDate = this.productionDate.value
                    const description = this.description.value
                    //web3.utils.toWei('1', 'ether')
                    //const price = "1000000000"
                    const price = window.web3.utils.toWei(this.jewelPrice.value.toString(), 'ether')
                    this.props.addJewellery(jewelName, jewelType, jewelMaterial, gemstoneType, productionDate, description,  price)
                }}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="jewelName"
                            type="text"
                            ref={(input) => { this.jewelName = input }}
                            className="form-control"
                            placeholder="Jewellery's name"
                            required />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="jewelType"
                            type="text"
                            ref={(input) => { this.jewelType = input }}
                            className="form-control"
                            placeholder="Jewellery's type"
                            required />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="jewelMaterial"
                            type="text"
                            ref={(input) => { this.jewelMaterial = input }}
                            className="form-control"
                            placeholder="Jewellery's Material"
                            required />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="gemstoneType"
                            type="text"
                            ref={(input) => { this.gemstoneType = input }}
                            className="form-control"
                            placeholder="Jewellery's gemstone"
                            required />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="productionDate"
                            type="text"
                            ref={(input) => { this.productionDate = input }}
                            className="form-control"
                            placeholder="Jewellery's date of production"
                            required />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="description"
                            type="text"
                            ref={(input) => { this.description = input }}
                            className="form-control"
                            placeholder="Jewellery's description"
                            required />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="jewelPrice"
                            type="text"
                            ref={(input) => { this.jewelPrice = input }}
                            className="form-control"
                            placeholder="Jewellery's Price"
                            required />
                    </div>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Add Jewellery</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

export default AddJewel;