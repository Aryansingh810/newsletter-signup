const express = require("express");
const bodyparser = require("body-parser");
const request=require("request");
const https = require("https");

const app = express();

app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static("public"));


app.post("/",function(req,res)
{
  const firstname = req.body.first;
  const lastname=req.body.last;
  const email = req.body.mail;


const data = {
  members :
  [
    {
      email_address : email,
      status : "subscribed",
      merge_fields :
      {
        FNAME : firstname,
        LNAME : lastname

      }
    }
  ]
}

const jsondata = JSON.stringify(data);



 const url = " https://us18.api.mailchimp.com/3.0/lists/afffe76d12";

 const options = {
   method : "POST",
   auth : "aruu1:bfaaa06290cf7c4f9c5774b0de0979d3-us18"
 }



const request = https.request(url,options,function(response)
{
response.on("data",function(data)
{
if(response.statusCode===200)
{
  res.sendFile(__dirname+"/success.html");
}
else {
  {
    res.sendFile(__dirname+"/failure.html");
  }
}
  console.log(JSON.parse(data));
})
})
request.write(jsondata);
request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})





app.get("/",(req,res)=>{
res.sendFile(__dirname+"/signup.html")
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started at port 3000");
})


// api key
// bfaaa06290cf7c4f9c5774b0de0979d3-us18

// list id
// afffe76d12
