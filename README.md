## Step 1

I made bamazon.sql with the following code 
```
DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	position INT NOT NULL,
	item_id INT NULL,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (position)
);

SELECT * FROM products;
```

## Step 2

I added the following code to mySQL workbench
![workbench2](/images/workbench2.png)

After selecting you see this
![workbench3](/images/workbench3.png)

## Step 3
#### Import Csv file I created
```
1,9891,Television,Electronics,4000,20
2,5452,Xbox One,Electronics,499,34
3,2145,Playstation 4,Electronics,499,35
4,2589,Sweater,Clothes,50,200
5,1423,Dark Blue Jeans,Clothes,45,2000
6,1673,Shirt,Clothes,15,9000
7,1738,Rap CD,Music,20,400
8,9999,Vinyl,Music,30,5
9,4758,Ipod,Electronics,300,50
10,1010,laptop,Electronics,5000,28
```

Then you click this
![workbench4](/images/workbench4.png)

Then you will see this
![workbench5](/images/workbench5.png)

## Step 4

Write some Javascript code to display options in terminal
```
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
	var query = "SELECT position,item_id,product_name,department_name,price,stock_quantity FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;

		console.log(res);
		console.log(query);

		for(var i = 0; i < res.length; i++){
			console.log(
			`Item #${res[i].position}, item id: ${res[i].item_id}, product name: ${res[i].product_name}, department name: ${res[i].department_name}, price: $${res[i].price}, stock: ${res[i].stock_quantity}`	
				);
		}
		console.log(res);
		connection.end();
	})
}
```

###### In the terminal remember to do npm install, npm install inquirer, npm install mysql etc...

## Step 5 
Run node in the terminal 
![terminal2](/images/terminal2.png)

## Step 6

Write a function that lets the client select a product by inserting product id number
```
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
```

## Step 7 

Add a function that asks how many units you need to buy!
1. Ask how many you need to buy
2. Check and see if the store has enough in stock
3. If not let them know there is an insufficient quantity 
4. List the price total

```
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
```

## Step 8 

Update the database quantities
```
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
```

## Finish

Run node in the terminal!
![terminal3](/images/terminal3.png)

![terminal4](/images/terminal4.png)

![terminal5](/images/terminal5.png)

![database1](/images/database1.png)

![database2](/images/database2.png)

# Quick Video Run Through

Please click the image to view the youtube video!
![bamazon1](/images/bamazon1.png)(https://www.youtube.com/watch?v=hSB_gJuO8s4)
