let btn = document.querySelector("button");
let p = document.querySelector("p");
let config = {
    headers : {
        Accept : "application/json"
    }
}
// let api = axios.get("https://icanhazdadjoke.com/",config);
// setTimeout(()=>{
//     console.log(api.data.joke);
// },2000);

async function facts(){
    let api =  await axios.get("https://icanhazdadjoke.com/",config);
    p.innerText=api.data.joke;
}
btn.addEventListener("click",()=>{
    facts();
});