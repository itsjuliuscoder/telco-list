const sql = require('./db.js');

//customer 
const Telco = function(telco){
	this.telcoName = telco.telcoName;
	this.telcoCode = telco.telcoCode;
	this.telcoCounName = telco.telcoCounName;
	this.telcoCounCode = telco.telcoCounCode;
	this.telcoCcy = telco.telcoCcy;
};

//creates new telco
Telco.create = (newTelco, result) => {
	sql.query("INSERT INTO telco SET ? ", newTelco, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created telco: ", { id: res.insertId, ...newTelco });
		result(null, { id:res.insertId, ...newTelco })
	});
};


//find new telco
Telco.findById = (telcoId, result) => {
	sql.query(`SELECT * FROM telco WHERE id = ${telcoId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log("found telco: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Customer with 
		result({ kind: "not_found" }, null);
	});
};

//find all telcos 
Telco.getAll = result => {
	sql.query("SELECT * FROM telco", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("customers: ", res);
		result(null, res);
	});
};

Telco.updateById = (id, telco, result) => {
	sql.query(
		"UPDATE telco SET telcoName = ?, telcoCode = ?, telcoCounName = ?, telcoCounCode = ?, telcoCcy = ? WHERE id = ?", 
			[telco.telcoName, telco.telcoCode, telco.telcoCounName, telco.telcoCounCode, telco.telcoCcy, id], 
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					result(null, err);
					return;
				}

				if (res.affectedRows == 0) {
					//not found customer with the id 
					result({ kind: "not_found" }, null);
					return;
				}

				console.log("updated telco: ", {id: id, ...telco });
				result(null, { id: id, ...telco });
			}
	);
};

Telco.remove = (id, result) => {
	sql.query("DELETE FROM telco WHERE id = ? ", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found customer with the id
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("deleted customer with id: ", id);
		return(null, res);
	});
};

Telco.removeAll = result => {
	sql.query("DELETE FROM telco", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted  ${res.affectedRows} customers`);
		return(null, res);
	});
};

module.exports = Telco;

