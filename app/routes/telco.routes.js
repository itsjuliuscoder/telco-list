module.exports = app => {
	const telcos = require("../controllers/telco.controller.js");

	// create a new controller 
	app.post("/telcos", telcos.create);

	// retrieve all telcos 
	app.get("/telcos", telcos.findAll);

	// Retrieve a single Customer with customerId
	app.get("/telcos/:telcoId", telcos.findOne);

	// retrieve a single customer with customerId
	app.put("/telcos/:telcoId", telcos.update);

	// create a new Customer 
	app.delete("/telcos/:telcoId", telcos.delete);

	// create a new customer 
	app.delete("/telcos", telcos.deleteAll);
};