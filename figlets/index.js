const figlet= require("figlet");
figlet("Priya",function(err,data){
    if(err){
        console.log("something went wrong");
        consolr.dir(err);
        return;
    }
    console.log(data);
});