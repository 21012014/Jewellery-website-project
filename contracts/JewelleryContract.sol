// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract JewelleryContract{

    enum JewelleryStatus {Available, Sold}
    string companyName;
    uint jewelleryCount;

    address ownerId;

    constructor(){
        companyName = "Radiance";
    }

    // Declaring a structure petDetails
    struct JewelleryDetails {
        uint jewelId;
        string jewelName;
        string jewelType;  // necklace, bracelets, etc
        string jewelMaterial; // silver, gold, platinum, etc
        string gemstoneType; // ruby, emerald, diamond, amethyst, etc
        string productionDate; // when the item was produced or acquired
        string description;
        uint price;
        address payable ownerId;
        JewelleryStatus status;    
        
        }
        
        mapping(uint => JewelleryDetails) public listOfJewels; 

    event JewelleryCreated(
        uint id,
        string name,
        string jewelType,
        string material,
        string gemstoneType,
        string productionDate,
        string description,
        uint price,
        address owner,
        JewelleryStatus status
    );
    
    //create an event
    event JewelleryPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        JewelleryStatus status
    );



    //function to add jewellery to the listOfJewels array
    function addJewellery(string memory jewelName,
                        string memory jewelType, 
                        string memory jewelMaterial, 
                        string memory gemstoneType, 
                        string memory productionDate, 
                        string memory description, 
                        uint256 price) public {
        // Require a valid name
        require(bytes(jewelName).length > 0);
        // Require a valid price
        require(price > 0);
        //Increment jewellery count
        jewelleryCount++;
        //create/add the jewellery                    
        listOfJewels[jewelleryCount] = JewelleryDetails(jewelleryCount, jewelName, jewelType, jewelMaterial, gemstoneType, productionDate, description, price, payable(msg.sender), JewelleryStatus.Available);
        // trigger an event 
        emit JewelleryCreated(jewelleryCount, jewelName, jewelType, jewelMaterial, gemstoneType, productionDate, description, price, payable(msg.sender), JewelleryStatus.Available);
    }

   
    //function get pet count()public{
    function getJewelleryCount() public view returns(uint){
        return jewelleryCount;
    }
    
    //function addPet() public 
    function getCompanyName() public view returns(string memory){
        return companyName;
    }

    function purchaseJewellery(uint _id) public payable {
        // Fetch the product
        JewelleryDetails memory _jewel = listOfJewels[_id];
        // Fetch the owner
        address payable _seller = _jewel.ownerId;
        // Make sure the product has a valid id
        require(_jewel.jewelId > 0 && _jewel.jewelId <= jewelleryCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _jewel.price);
        // Require that the product has not been purchased already
        require(_jewel.status == JewelleryStatus.Available);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _jewel.ownerId = payable(msg.sender);
        // Mark as purchased
        _jewel.status = JewelleryStatus.Sold;
        // Update the product
        listOfJewels[_id] = _jewel;
        // Pay the seller by sending them Ether
        payable(_seller).transfer(msg.value);
        // Trigger an event
        emit JewelleryPurchased(jewelleryCount, _jewel.jewelName, _jewel.price, payable(msg.sender), JewelleryStatus.Sold);
    }


}