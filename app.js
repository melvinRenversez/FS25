const content = document.getElementById('content');



fetch("data.json")
    .then(response =>{
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        data.forEach(item => {
            x = `
            
                <a href="${item.lien}" class="item">
                    <h1>${item.nom}</h1>
                    <img src="${item.image}">
                </a>
            
            `
            content.innerHTML += x;
        });
    })
    .catch(err => {
        console.error('Error:', err);

    });