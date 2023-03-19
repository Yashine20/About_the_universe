// Récupérer le nombre de planètes : 60 
// Déduire le nombre de pages : 60 / 10 = 6

// Récupérer toutes les planètes grâce à une boucle 
    // Réaliser requête * 6 : récupération de 10 planètes

// Afficher les 60 planètes récupérées
    // à partir d'un tableau de planètes
    // créer pour chaque planète : tr < td td 
    // inclure les informations de la planète à l'intérieur
    // ajouter le tr dans le tbody

// Ajouter un écouteur d'evenement sur chaque tr (addEventToTr)

// au clique sur un tr > displayDetail() 
// cette fonction va rechercher la planet cliqué dans le 
// tableau "planets" grâce au .find() et afficher ces informations 
// à droite


onInit();

// Variables globales ---------------------------
let planets; 

// Exécutions de fonctions ---------------------------
async function onInit() {
    const nbPages = await getNumberPages();
    planets = await getPlanets(nbPages);
    displayPlanets();
    displayCountPlanets();
};

// Déclarations de fonctions ---------------------------
// planets
async function getNumberPages() {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    return data.count / 10;
};

async function getPlanets(nbPages) {
    let planets = [];
    for (let index = 1; index <= nbPages; index++) {
        const response = await fetch(`https://swapi.dev/api/planets/?page=${index}`);
        const data = await response.json();
        planets = planets.concat(data.results);
    }
    return planets;
};

function displayPlanets() {
    const tbody = document.querySelector('.tbody-planets');
    planets.forEach(planet => {
        const tr = document.createElement('tr');
        tr.addEventListener('click', displayDetail);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = planet.name;
        td2.textContent = planet.terrain;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });
};

function displayCountPlanets() {
    document.querySelector('.countPlanets')
        .textContent = planets.length;
};

// planet-details
function displayDetail(event) {
    // fetch('https://swapi.dev/api/planets/?search=' + event.target.textContent)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         document.querySelector('#name').textContent = data.results[0].name;
    //         document.querySelector('#population').textContent = data.results[0].population;
    //     });

    // Autre solution (meilleure solution : on évite les requêtes) : 
    const planet = planets.find(planet => 
            planet.name === event.target.textContent);
    document.querySelector('#name').textContent = planet.name;
    document.querySelector('#population').textContent = planet.population;
};