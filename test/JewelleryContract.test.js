const JewelleryContract = artifacts.require('./JewelleryContract.sol') 
contract('JewelleryContract', ([deployer, seller, buyer]) => { 
    let jewelleryContract; let address; 
    let accounts; 
    before(async () => { 
        jewelleryContract = await JewelleryContract.deployed() 
    }) 
    describe('deployment', async () => { 
        it('deploys successfully, address check verified', async () => { 
            const address = await jewelleryContract.address 
            console.log(address); 
            assert.notEqual(address, 0x0) 
            assert.notEqual(address, '') 
            assert.notEqual(address, null) 
            assert.notEqual(address, undefined) 
        }) 
 
        it('has a name verified', async () => { 
            const name = await jewelleryContract.getCompanyName(); 
            assert.equal(name, "Radiance"); 
            console.log(name); 
        }) 
    }) 
 
    describe('adding Jewels', async () => { 
        let result, jewelCount 
        before(async () => { 
            result = await jewelleryContract.addJewellery('Blue Nile', "Ring", "Silver", "Aquamarine, Diamond, Sapphire", "20231408", "Stunning and elegant silver ring paired Aqarmarine as its main stone", "376", web3.utils.toWei('1', 'ether'), {from: seller})
            jewelCount = await jewelleryContract.getJewelleryCount(); 
        }) 
 
        it('creates jewels', async () => {      // SUCCESS   
            assert.equal(jewelCount, 1) 
            const event = result.logs[0].args 
            console.log("Result data  " + event); 
            console.log("Buyer " + buyer); 
            console.log("Seller " + seller); 
            console.log("checks jewellery id"); 
            assert.equal(event.id.toNumber(), 
            jewelCount.toNumber(), 'id is correct') 
            console.log("checks jewellery name"); 
            assert.equal(event.name, 'Blue Nile', 'name is correct') 
            console.log("checks jewellery price"); 
            assert.equal(event.price, '1000000000000000000', 'price is correct') 
            console.log("checks owner id"); 
            assert.equal(event.owner, seller, 'owner is correct') 
            console.log("checks jewellery status"); 
            assert.equal(event.status, 0, 'adding is correct') 
        }) 
 
        it('sells jewellery', async () => { 
            //Track the seller balance before purchase   
            console.log("Track the seller balance"); 
            let SellerBalancebef 
            SellerBalancebef = await web3.eth.getBalance(seller) 
            SellerBalancebef = new web3.utils.BN(SellerBalancebef) 
            console.log("seller balance (before purchase) " + SellerBalancebef) 
            //SUCCESS: Buyer makes purchase         
            result = await jewelleryContract.purchaseJewellery(jewelCount, { from: buyer, value: web3.utils.toWei('1', 'ether') }) 
            //Checks logs   
            const event = result.logs[0].args 
            assert.equal(event.id.toNumber(), jewelCount.toNumber(), 'id is correct') 
            assert.equal(event.status, 1, 'purchased is correct') 
            //Check that seller received funds   
            let newSellerBalance 
            newSellerBalance = await web3.eth.getBalance(seller) 
            newSellerBalance = new web3.utils.BN(newSellerBalance) 
            console.log("seller balance after funds received " + newSellerBalance); 
            //Checks if the expected seller balance is equals to the the seller balance after customer's purchase
            let price 
            price = web3.utils.toWei('1', 'ether') 
            price = new web3.utils.BN(price) 
            const expectedBalance = SellerBalancebef.add(price) 
            assert.equal(newSellerBalance.toString(), expectedBalance.toString()) 
        }) 

        it('Jewellery is sold', async () => { 
            console.log("Check jewelery is sold to the correct buyer")
            const jewelleryDetails = await listOfJewels[jewelCount];
            const newOwner = jewelleryDetails.owner;

            assert.equal(newOwner, buyer, 'Owner has changed to the buyer');
        })
        
        it('Buyer balance is reduced after purchase', async () => {
            const buyerBalanceBefore = await web3.eth.getBalance(buyer);
            const purchasePrice = web3.utils.toWei('1', 'ether');
        
            // Buyer makes the purchase
            await jewelleryContract.purchaseJewellery(jewelCount, { from: buyer, value: purchasePrice });
        
            const buyerBalanceAfter = await web3.eth.getBalance(buyer);
        
            const expectedBalance = new web3.utils.BN(buyerBalanceBefore).sub(new web3.utils.BN(purchasePrice));
        
            assert.equal(
                buyerBalanceAfter.toString(),
                expectedBalance.toString(),
                'Buyer balance is reduced by the purchase amount'
            );
        });
    }) 
})