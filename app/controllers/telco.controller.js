const Telco = require("../models/telco.model.js");

// add a new telco
exports.create = (req, res) => {
	//validate requests 
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}

	//create a new telco
	const telco = new Telco({
		telcoName: req.body.telcoName,
		telcoCode: req.body.telcoCode,
		telcoCounName: req.body.telcoCounName,
		telcoCounCode: req.body.telcoCounCode,
		telcoCcy: req.body.telcoCcy
	});

	//Save new telco
	Telco.create(telco, (err, data) => {
		if (err)
			res.status(500).send({
				message: 
					err.message || "Some error occurred while creating the Telco."
			});
		else res.send(data);
	});
};

// retrieve all telco from the database 
exports.findAll = (req, res) => {
  Telco.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// retrieve telco by id
exports.findOne = (req, res) => {
  Telco.findById(req.params.telcoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.telcoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.telcoId
        });
      }
    } else res.send(data);
  });
};


//update telco details
exports.update = (req, res) => {
	// Validate request 
	if (!req.body) {
		res.status(400).send({
			message: `Not found Customer with id ${req.params.telcoId}.`
		});
	}
	Telco.updateById(
		req.params.telcoId,
		new Telco(req.body), 
		(err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404),send({
						message: 'Not found customer with id ${req.params.telcoId}.'
					});
				} else {
					res.status(500).send({
						message: "Error updating Customer with id " + req.params.telcoId
					});
				}
			} else res.send(data);
		}
	);
};

//delete telco by id
exports.delete = (req, res) => {
	Customer.remove(req.params.telcoId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Telco with id ${req.params.telcoId}.`
				});
			} else {
				res.status(500).send({
					message: "Could not delete Telco with id " + req.params.telcoId
				});
			}
		} else res.send({ message: `Telco was deleted successfully` });
	});
};

//delete all telco details
exports.deleteAll = (req, res) => {
	Telco.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: 
					err.message || "Some error occured while removing customers."
			});
		else res.send({ messgae: `All Telco were deleted successfully!` });
	});
};
