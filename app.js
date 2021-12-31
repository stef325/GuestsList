const NodeCouchDb = require('node-couchdb');
const server = require('./server')


const couch = new NodeCouchDb({
    auth:{
        user:  process.env.DB_USER,
        password: process.env.DB_PASS
    }

})
const dbname = process.env.DB_NAME
const urlView = process.env.VIEW_URL


couch.listDatabases().then(function(dbs){
    console.log(dbs)
});




//create
server.post("/guests/add", function (req,res) {
    let name = req.body.name;
    let age = req.body.age;

    couch.uniqid().then(function (params) {
        let id = params[0];
        couch.insert(dbname, {
            _id: id,
            name: name,
            age: age
        }).then(({data, headers, status}) => {
            res.redirect("/");
        }, err => {
            res.send(err);
        });
    });

})

//read
server.get("/", function (req, res) {
    couch.get(dbname, urlView).then(({data, headers, status}) => {
        console.log(data.rows)
        res.render("index",{
            guests: data.rows
        })
    }, err => {
        res.send(err);
    });
})

//update
server.post("/guests/updt/:id", function (req,res) {
    const name = req.body.name;
    const age = req.body.age;
    couch.update(dbname, {
        _id: req.params.id,
        _rev: req.body.rev,
        name: name,
        age: age
    }).then(({data, headers, status}) => {
        res.redirect("/");
    }, err => {
        res.send(err);
    });
    

})


//delete
server.post("/guests/del/:id", function (req,res) {
    couch.del(dbname, req.params.id, req.body.rev).then(({data, headers, status}) => {
        res.redirect("/");
    }, err => {
        res.send(err);
    });
    

})




