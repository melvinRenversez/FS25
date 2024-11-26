const content = document.getElementById('content');

// Fonction pour afficher tous les éléments au chargement
function start(data) {
    content.innerHTML = ''; // Réinitialiser le contenu
    data.forEach(item => {
        const x = `
            <a href="${item.lien}" class="item">
                <div class="info">
                    <p class="id">${item.id} - </p>
                    <p class="nom">${item.nom}</p>
                </div>
                <img src="${item.image}" alt="${item.nom}">
            </a>
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
            <a href="${item.lien}" class="item">
                <div class="info">
                    <h1>${item.id}</h1>
                    <h1>${item.nom}</h1>
                </div>
                <img src="${item.image}" alt="${item.nom}">
            </a>
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
