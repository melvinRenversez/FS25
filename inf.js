var curentId = 0;

const infIdName = document.getElementById("idName")
const infMounth = document.getElementById("mounth")

var datas = []

var id;
var name;
var mounth;
var bestPrice;

function changeId(newId){
    curentId = newId;
    console.log(datas);
    datas.forEach(item => {
        if(item.id == curentId){
            console.log(item);
            id = item.id;
            name = item.name;
            mounth = item.month;
            bestPrice = item.price;
        }
    })
    updateInf()
}

function updateInf(){
    console.log(id);
    console.log(name);
    console.log(mounth);
    console.log(bestPrice);
    infIdName.innerHTML = id;
    infMounth.innerHTML = mounth;   
}


fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            datas = data
        })
        .catch(err => {
            console.error('Error:', err);
        });