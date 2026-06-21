let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");

btn.addEventListener("click", function () {
  let item = document.createElement("li");
  console.log(inp.value);
  item.innerText = inp.value;
  ul.appendChild(item);
  let delbtn = document.createElement("button");
  delbtn.innerText = "delete";
  item.appendChild(delbtn);
  inp.value = "";
});
ul.addEventListener("click", function (event) {
  if (event.target.nodeName == "BUTTON") {
    let ListItem = event.target.parentElement;
    ListItem.remove();
    console.log("delete");
  }
});
// let delbtns=document.querySelectorAll(".delete");
// for(delbtn of delbtns){
//     delbtn.addEventListener("click",function(){
//        let par=this.parentElement;
//     console.log(par);
//     par.remove();
//   })
// }
