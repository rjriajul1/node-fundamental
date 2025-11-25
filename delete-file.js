const { error } = require("console");
const fs = require("fs")
fs.writeFileSync("./output/temp.txt", "This is a temp file");
console.log("Temp file created");


if(fs.existsSync("./output/temp.txt")){
    console.log("fiel exits!!");

    fs.unlinkSync("./output/temp.txt")
    console.log("file deleted");
}


try{
  fs.unlinkSync("./output/temp.txt");
}catch(err){
 console.log("Erro", err.message);
}


fs.writeFile("./output/temp2.txt", "Another temp file", (err)=>{
    if(err) return console.log(err.message);

    console.log("Another temp file created");

    fs.unlink("./output/temp2.txt", (err)=>{
        if(err){
            console.log("err",err.message);
        }else{
            console.log("file temp2 deleted");
        }
    })
})