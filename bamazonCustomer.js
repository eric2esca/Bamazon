var mysql = require("mysql");
var inquirer = require("inquirer");
var chosenItem;
var stock = 0;
var total = 0;

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon"
});

connection.connect(function(err){
	if(err) throw err;
	displayProducts();
});

//Initial display of the products-------------------------------------------------------
function displayProducts(){
	var query = "SELECT position,item_id,product_name,department_name,price,stock_quantity FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;

		console.log("---------------------------------------------------------------------------------------");
		for(var i = 0; i < res.length; i++){
			console.log(
			`Item #${res[i].position}, item id: ${res[i].item_id}, product name: ${res[i].product_name}, department name: ${res[i].department_name}, price: $${res[i].price}, stock: ${res[i].stock_quantity}`	
				);
		}
		console.log("---------------------------------------------------------------------------------------");
		options();
	})
}
//----------------------------------------------------------------------------------------

//main function---------------------------------------------------------------------------
function options(){

	connection.query("SELECT * FROM products", function(err, results){
		if(err) throw err;
	

		inquirer
			.prompt([
				{
					name: "choice",
					type: "input",
					message: "Enter the product ID number of the item you'd like to buy!"
				}
			])
			.then(function(answer){

				console.log(`This is number you typed in ${answer.choice}`);

				for(var i = 0; i< results.length; i++){
					if(parseInt(results[i].item_id) === parseInt(answer.choice)){
						chosenItem = results[i];
					}	
				}
				console.log(`${chosenItem.stock_quantity} available in stock`)
				unitsNeeded();
			});
	});		
}
//--------------------------------------------------------------------------------------------

//This function allows the client to pick number of products they want to buy -------------
function unitsNeeded(){

	inquirer
	.prompt([
		{
			name: "units",
			type: "input",
			message: "Enter the number of units you'd like to buy!"
		}
	])
	.then(function(answer){
		if(parseInt(chosenItem.stock_quantity) >= parseInt(answer.units)){
			console.log(`You are now the owner of ${answer.units} ${chosenItem.product_name}(s)!!!`);
			total = parseInt(chosenItem.price)* parseInt(answer.units);
			console.log(`Your total price is $${total}!`)
			stock = parseInt(chosenItem.stock_quantity) - parseInt(answer.units); 
			console.log(`this is the stock leftover ${stock}`);
			updateStock();
			options();
			//update stock function
		}
		else{
			console.log(`There is not enough in stock for that`);
			options();
		}
	});
}
//---------------------------------------------------------------------------------------------

//Update after a purchase
function updateStock(){

	connection.query(
			"UPDATE products SET ? WHERE ?",
			[
				{
					stock_quantity: stock
				},
				{
					item_id: chosenItem.item_id
				}
			],
			function(error){
				if(error) throw err;
				console.log(`stock updated!`)
			}
	);
}
//------------------------------------------------------------------------------------------------