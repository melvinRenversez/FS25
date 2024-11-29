const content = document.getElementById('items');


function getAbreviations(month) {
    const months = {
        janvier: "jan",
        fevrier: "fév",
        mars: "mar",
        avril: "avr",
        mai: "mai",
        juin: "jun",
        juillet: "jul",
        aout: "aou",
        septembre: "sep",
        octobre: "oct",
        novembre: "nov",
        décembre: "dec"
    };

    const lowerCaseMonth = month.toLowerCase();

    return months[lowerCaseMonth] || "Mois inconnu";
}


function start(data) {
    content.innerHTML = '';
    data.forEach(item => {
        let month = getAbreviations(item.month);
        const x = `
            <div class="item ${item.id}" id="item">
                <p class="id">${month} </p>
                <p class="nom">${item.name}</p>
            </div>
        `;
        content.innerHTML += x;
    });
    startInf()
}

function searchByMonth(data, month){
    if (month == "vide"){
        content.innerHTML = '';
        data.forEach(item => {
            let month = getAbreviations(item.month);
            const x = `
                <div class="item ${item.id}" id="item">
                    <p class="id">${month} </p>
                    <p class="nom">${item.name}</p>
                </div>
            `;
            content.innerHTML += x;
        });
        getButtons()

    }else{
        const filteredData = data.filter(item => 
            item.month && item.month.toLowerCase().startsWith(month.toLowerCase())
        );
    
        let contentHTML = '';
        filteredData.forEach(item => {
            let month = getAbreviations(item.month);
            const x = `
                <div class="item ${item.id}" id="item"> 
                    <p class="id">${month} </p>
                    <p>${item.name}</p> 
                </div>
            `;
            contentHTML += x;
        });
    
        content.innerHTML = contentHTML;
        getButtons()
    }
}


function search(data, searchTerm) {
    const filteredData = data.filter(item => 
        item.name && item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    let contentHTML = '';
    filteredData.forEach(item => {
        let month = getAbreviations(item.month);
        const x = `
            <div class="item ${item.id}" id="item"> 
                <p class="id">${month} </p>
                <p>${item.name}</p> 
            </div>
        `;
        contentHTML += x;
    });

    content.innerHTML = contentHTML;
    getButtons()
}


fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        start(data);

        
        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', (event) => {
            const searchTerm = event.target.value;
            if (searchTerm) {
                search(data, searchTerm);
            } else {
                start(data);
            }
        });


        const monthSelector = document.getElementById('monthSelector');
        monthSelector.addEventListener('change', (e)=>{
            value = e.target.value;
            console.log(value);
            searchByMonth(data, value);
        })


    })
    .catch(err => {
        console.error('Error:', err);
    });
