const express = require("express");
const app=express();
const port=8080;
const path=require("path");
const{v4: uuidv4}=require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let posts=[{
    id:uuidv4(),
    username:"apnacollge",
    content:"l love coding"
},
{
    id:uuidv4(),
    username:"priys",
    content:"l love anime"
},
{
    id:uuidv4(),
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
   posts.push({   id: uuidv4(),username,content});
   res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
 let post=posts.find((p)=>id ===p.id);
    console.log("Found post:", post);
 res.render("show.ejs",{post});
//   res.send("request working");
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
     if (!post) {
        return res.status(404).send("Post not found");
    }
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
     console.log("Requested ID:", id);
    console.log("Available IDs:", posts.map(p => p.id));
    let post=posts.find((p)=>id===p.id);
        console.log("Found post:", post);
    res.render("edit.ejs",{post});
})
app.listen(port,()=>{
console.log("Listeing to port:8080");
});