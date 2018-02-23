## step 1

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

## step 2

I added the following code to mySQL workbench
![workbench2](/images/workbench2.png)

After selecting you see this
![workbench3](/images/workbench3.png)

## step 3
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





