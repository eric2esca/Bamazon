var mysql = require("mysql");
var inquirer = require("inquirer");

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

function displayProducts(){
	var query = "SELECT position,item_id,product_name,department_name,price,stock_quantity FROM products"
	connection.query(query, function(err, res){
		if(err) throw err;

		for(var i = 0; i < res.length; i++){
			console.log(
			`Item #${res[i].position}, item id: ${res[i].item_id}, product name: ${res[i].product_name}, department name: ${res[i].department_name}, price: $${res[i].price}, stock: ${res[i].stock_quantity}`	
				);
		}
		console.log(res);
		connection.end();
	})
}



// function start(){
// 	inquirer
// 		.prompt({
// 			name: ""
// 		})
// }