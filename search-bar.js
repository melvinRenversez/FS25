const content = document.getElementById('items');

// Fonction pour afficher tous les éléments au chargement
function start(data) {
    content.innerHTML = ''; // Réinitialiser le contenu
    data.forEach(item => {
        const x = `
            <div href="${item.lien}" class="item">
                <p class="id">${item.id} </p>
                <p class="nom">${item.name}</p>
            </div>
        `;
        content.innerHTML += x;
    });
}

// Fonction pour afficher uniquement les éléments correspondant à la recherche
function search(data, searchTerm) {
    const filteredData = data.filter(item => 
        item.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    content.innerHTML = ''; // Réinitialiser le contenu
    filteredData.forEach(item => {
        const x = `
            <div href="${item.lien}" class="item"> 
                <p>${item.id}</p>
                <p>${item.name}</p> 
            </div>
        `;
        content.innerHTML += x;
    });
}

// Récupérer les données JSON
fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        start(data); // Charger tous les éléments au début

        // Ajouter un écouteur à la barre de recherche
        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', (event) => {
            const searchTerm = event.target.value;
            if (searchTerm) {
                search(data, searchTerm); // Afficher les résultats filtrés
            } else {
                start(data); // Réafficher tous les éléments si la barre est vide
            }
        });
    })
    .catch(err => {
        console.error('Error:', err);
    });
