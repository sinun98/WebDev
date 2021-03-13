	// backend.js
	const express = require('express');
	const app = express();


	const tipps = require("./tipps.json");


	let idCount = tipps.length;
	app.use(express.json());
	app.use(express.static("public"));
	app.use(require("body-parser").json());



	//get all saved tipps
	app.get("/api/fahrer", (req, res) => {

	    if (idCount == 0) {
	        return res.status(404).json({
	            "error": "Keine Tipps gespeichert!"
	        });
	    }

	    return res.status(200).json(tipps);
	});

	//save tipps
	app.post('/api/save', (req, res) => {
		const tipp = req.body;
	    for (var i = 0; i < idCount; i++) {
			//check if tipp is already saved 
	        if (tipps[i].ID == tipp.ID) {



	            return res.status(400).json({
	                "error": "already exists"
	            });

	        }
	    }
	    tipps.id = ++idCount;
	    tipps.push(tipp);

	    res.status(201).json(tipp);
	});


	//get tipp with specific id
	app.get("/api/tipp/:id", (req, res) => {
	    for (var i = 0; i < idCount; i++) {
			//search tipp in tipps.json
	        if (tipps[i].ID == req.params.id) {
	            var i = tipps[i];
	            return res.status(200).json(i);

	        }

	    }



	    return res.status(404).json({
	        error: "not found"
	    });
	});
	//delete tipp
	app.delete("/api/delete/:id", (opt, res) => {
	    var todoIdx = 0
	    var u = tipps[0].ID

	    for (var i = 0; i < idCount; i++) {
			//search array index of requested tipp
	        if (tipps[i].ID == opt.params.id) {

	            todoIdx = i;
	            break;
	        } else {
	            todoIdx = -1;
	        }
	    }


	    if (todoIdx === -1) return res.status(404).json({
	        error: "not found"
	    });
		//delete tipp
	    tipps.splice(todoIdx, 1);

	    --idCount;



	    return res.status(200).json({
	        "status": "success"
	    });
	});
	//edit tipp
	app.patch("/api/edit/:id", (req, res) => {
	    const tipp = req.body;

	    for (var i = 0; i < idCount; i++) {
			//search old tipp
	        if (tipps[i].ID == req.params.id) {
				//replace with new values
	            tipps[i]['Platz1'] = tipp.Platz1;
	            tipps[i]['Platz2'] = tipp.Platz2;
	            tipps[i]['Platz3'] = tipp.Platz3;
	            tipps[i]['Platz4'] = tipp.Platz4;


	            return res.status(200).json({
	                "status": "success"
	            });

	        }

	    }

	    return res.status(404).json({
	        "error": "not found"
	    });


	});




	app.listen(3000);