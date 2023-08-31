
const displayJewel = async (jewelCount, contract) => {
  jewelCount = await contract.methods.getJewelleryCount().call();
  $(".head2").html(jewelCount);
  console.log("jewelCount")
  OwnerMe = await contract.methods.getOwnerId().call();
  $(".head4").html(OwnerMe);
  console.log("OwnerMe")

  $('#jewelRow').empty(); // Clear the existing jewelry rows
  $.getJSON('./jewel.json', function(data) {
    var jewelRow = $('#jewelRow');
    var jewelTemplate = $('#jewelTemplate');

    for (i = 0; i < data.length; i ++) {
      jewelTemplate.find('.panel-title').text(data[i].jewelName);
      jewelTemplate.find('img').attr('src', data[i].picture);
      jewelTemplate.find('.material').text(data[i].jewelMaterial);
      jewelTemplate.find('.gemstone').text(data[i].gemstoneType);
      jewelTemplate.find('.date').text(data[i].productionDate);
      jewelTemplate.find('.price').text(data[i].price);
      jewelTemplate.find('.description').text(data[i].description);
      jewelTemplate.find('.btn-buy').attr('data-id', data[i].id);        
      jewelRow.append(jewelTemplate.html());
    }
  });
  // // Retrieve and display jewelry data from the contract
  // for (let i = 0; i < jewelCount; i++) {
  //   const jewelryData = await contract.methods.getJewellery(i).call();

  //   var jewelRow = $('#jewelRow');
  //   var jewelTemplate = $('#jewelTemplate');

  //     for (i = 0; i < data.length; i ++) {
  //       jewelTemplate.find('.panel-title').text(jewelryData.jewelName);
  //       jewelTemplate.find('img').attr('src', "images/" + jewelryData.jewelName + ".png");
  //       jewelTemplate.find('.material').text(jewelryData.jewelMaterial);
  //       jewelTemplate.find('.gemstone').text(jewelryData.gemstoneType);
  //       jewelTemplate.find('.date').text(jewelryData.productionDate);
  //       jewelTemplate.find('.price').text(jewelryData.price);
  //       jewelTemplate.find('.description').text(jewelryData.description);
  //       jewelTemplate.find('.btn-buy').attr('data-id', jewelryData.id);        
  //       jewelRow.append(jewelTemplate.html());

  //     // Append the jewelry row to the main container
  //     $('#jewelRow').append(jewelRow);
  //   }
  // }
};

const addJewelInfo = (jewel, contract, accounts) => {
  let name;
  $("#jewel_name").on("change", (e) => {
    name = e.target.value;
  });
  let type;
  $("#jewel_type").on("change", (e) => {
    type = e.target.value;
  });
  let material;
  $("#jewel_material").on("change", (e) => {
    material = e.target.value;
  });
  let gem;
  $("#jewel_gem").on("change", (e) => {
    gem = e.target.value;
  });
  let DoP;
  $("#jewel_DoP").on("change", (e) => {
    DoP = e.target.value;
  });
  let desc;
  $("#jewel_description").on("change", (e) => {
    desc = e.target.value;
  });
  let price;
  $("#jewel_price").on("change", (e) => {
    price = e.target.value;
  });

  $("#formAddJewel").on("submit", async (e) => {
    e.preventDefault();
    console.log(name);

    await contract.methods
      .addJewellery(name, type, material, gem, DoP, desc, price)
      .send({ from: accounts[0], gas: "1000000" })
      .then(function (receipt) {
        console.log(receipt);
        // Once the jewel is added successfully, display it on the index.html page
        displayJewel(jewel, contract);
      });
    window.open("/index.html");
    console.log("appended a new jewel");
  });
};


 
async function jewelApp() {
  const web3 = await getWeb3();
  console.log(web3);
  const accounts = await web3.eth.getAccounts();
  console.log("accounts")
  //console.log(accounts);
  const contract = await getContract(web3);
  console.log(contract);
  let jewelCount; // Declare the jewelCount variable
  // Retrieve the current jewel count
  jewelCount = await contract.methods.getJewelleryCount().call();  
  displayJewel(jewelCount, contract); // Pass the jewelCount to the displayJewel function
  addJewelInfo(jewelCount, contract, accounts); // Pass the jewelCount to the addJewelInfo function
}
jewelApp();