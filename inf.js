var curentId = 0;

const infId = document.getElementById("id")
const infName = document.getElementById("name")
const infMounth = document.getElementById("mounth")
const infImage = document.getElementById("image")
const infPriceInput = document.getElementById("priceInput")
const infTonneInput = document.getElementById("tonneInput")
const infTotal = document.getElementById("total")

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
    input.addEventListener('keydown', () => {
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
var image;
var bestPrice;

function changeId(newId){
    curentId = newId;
    datas.forEach(item => {
        if(item.id == curentId){
            console.log(item);
            id = item.id;
            name = item.name;
            mounth = item.month;
            image = item.courbe;
            bestPrice = item.price;
        }
    })
    updateInf()
    calculate()
}

function updateInf(){
    console.log(id);
    console.log(name);
    console.log(mounth);
    console.log(bestPrice);
    infId.innerHTML = id;
    infName.innerHTML = name;
    infMounth.innerHTML = mounth;  
    infImage.src = image;
    infPriceInput.value = bestPrice;
}

function calculate() {
    const price = parseFloat(infPriceInput.value) || 0;
    let tonne = parseFloat(infTonneInput.value);

    if (isNaN(tonne)) {
        tonne = 0;
    }

    const total = (price * tonne) / 1000;

    if (!isNaN(total)) {
        infTotal.value = total.toFixed(2);
    }
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

function startInf(){
    console.log("Starting info");
    getButtons();
    calculate();
    infId.innerHTML = "FS"
    infName.innerHTML = "Welcome"
    infMounth.innerHTML = "25"
}