var curentId = 0;

const infIdName = document.getElementById("idName")
const infMounth = document.getElementById("mounth")
const infPriceInput = document.getElementById("priceInput")
const infTonneInput = document.getElementById("tonneInput")
const infTotal = document.getElementById("total")

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
    input.addEventListener('change', () => {
        calculate()
    })
})


function getButtons(){
    
    const buttons = document.querySelectorAll("#item")
    
    console.log(buttons)
    
    buttons.forEach(button =>{
        button.addEventListener('click', () => {
            let itemId = button.children[0].textContent;
            changeId(itemId);
        })
    })

}

var datas = []

var id;
var name;
var mounth;
var bestPrice;

function changeId(newId){
    curentId = newId;
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
    infPriceInput.value = bestPrice;
}

function calculate(){
    const price = parseFloat(infPriceInput.value);
    const tonne = parseFloat(infTonneInput.value);
    const total = price * tonne / 1000;
    infTotal.innerHTML = total;
}


fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            datas = data
        })
        .catch(err => {
            console.error('Error:', err);
        });