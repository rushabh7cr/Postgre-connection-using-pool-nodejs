var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
var pg = require("pg");

var config = {
    user: 'postgres',
    database: 'postgres', 
    password: 'rushabh7cr', 
    port: 5432, 
  };

  var pool = new pg.Pool(config);

app.get("/",function(req,res){
var data = {val:0};
res.render("home",{data:data});
})

app.get("/login",function(req,res){
    res.render("login");
})

app.post("/",function(req,res){
    var name =req.body.name;
    var pass = req.body.password;
    var data = {val:1,name:name , pass:pass}; 
   // res.render("home",{data:data})
    //console.log(name);
   pool.connect(function(err,client,done){
        if (err){
            res.status(400).send(err);
            return;
        }
        url = "select * from rotaract where username=$1 ";
        client.query(url,[name],function(err,result){
            done();
                if(err){
                    res.status(400).send(err);
                    return;
                }
                
                //console.log(result);
                //res.render("home",{data: data});
                
                var x = result.rows[0];
                if (x.password===pass){
                   
                     res.render("home",{data:data})
                }
                else{
                    res.send("Error");
                }
                
        })
    })
    
})

app.listen(4000,function(){
    console.log("running on 4000");
})
