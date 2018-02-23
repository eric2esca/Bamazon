# Bamazon

## Hey Helper probably PAT or STEVEN or POORNIMA

So I am testing stuff on the mySQL workbench to see if things work.  See image below:
![image of mySQL workbench database with mock file](/images/workbench1.png)

### Terminal looks like this

On the terminal its not displaying what I want
![Image of Terminal](/images/terminal1.png)

### What part of my javascript code looks like

```
function displayProducts(){
	var query = "SELECT position,item_id,product_name,department_name,price,stock_quantity FROM products";
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
```

## why is nothing coming back on the terminal?


