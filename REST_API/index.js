const express = require("express");
const app=express();
const port=8080;
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let posts=[{
    username:"apnacollge",
    content:"l love coding"
},
{
    username:"priys",
    content:"l love anime"
},
{
    username:"aman",
    content:"l love nothing"
}];
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});
app.get("/posts/new",(req,res)=>{
 res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    
   let {username,content}=req.body;
   posts.push({username,content});
   res.redirect("/posts");
})
app.listen(port,()=>{
console.log("Listeing to port:8080");
});