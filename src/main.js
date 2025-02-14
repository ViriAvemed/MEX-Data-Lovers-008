const arrayDebug = window.data.debugData(LOL.data); // Variable que contiene la data depurada
const inputName = document.getElementById("id-searchByName"); // Variable que llama a la caja de búsqueda por nombre
const buttonDataBox = document.getElementById("id-dataBox"); // Variable que llama a la caja donde se imprime toda la data
const buttonSearchName = document.getElementById("id-buttonSearchByName"); // Botón para ejecutar la búsqueda por nombre
const deleteDataBox = document.getElementById("id-dataBox"); // Llamado de caja para borrar la data
const selectRol = document.getElementById("id-filterByRol"); // Selector que filtra por rol
const bestAttributes = document.getElementById("id-filterByAttribute"); //Selector que filtra por atributo
const optionToOrder  = document.getElementById("id-orderABC"); //Selector que ordena de la A a la Z



// Función que pinta toda la data a partir de la data filtrada
let printData = (arrayDebug) => {
  deleteDataBox.innerHTML="";
  document.getElementById("id_result").innerHTML =`<img src="IMG/champion.PNG" alt=""><h2>CAMPEONES</h2>`;
  arrayDebug.forEach(element => {
    let card = `<div class="flip-card">\n    <div class="flip-card-inner">\n    <div class="flip-card-front">\n    <img src="${element.splash}" class="i" alt="Imagen de jugador">\n    </div>\n    <div class="flip-card-back">\n    <h1 style="color:#9d7f43;">${element.name}</h1> \n    <h4 style="color:#9d7f43;">"${element.title}"</h4> \n    <p id="tags" class="p">${element.tags}</p>\n    <p class="p">Ataque: ${element.info.attack} ~ Defensa: ${element.info.defense}</p>\n    <p  class="p">Magia: ${element.info.magic} ~ Dificultad: ${element.info.difficulty}</p>\n     <p class="p" >Vida:  ${element.stats.hp} ~ Mana: ${element.stats.mp}</p>\n     <p class="p" >Regen. de vida:  ${element.stats.hpregen} ~ Vida por nivel:  ${element.stats.hpperlevel}</p>\n    <p  class="p" >Vel de mov.:  ${element.stats.movespeed} ~~ Vel. de ataque:  ${element.stats.attackspeedoffset}</p>\n    <p id="attackdamage" class="p" >Daño de ataque:  ${element.stats.attackdamage}</p>\n    </div>\n    </div>\n    </div>`;
    buttonDataBox.insertAdjacentHTML("beforeend", card);
  });
  return printData;
};

// Función que permite la búsqueda por nombre de cada campeón
const SearchChampion = () =>{
  let valueBySearch = inputName.value;
  let printbyname = window.data.campeonesByName(valueBySearch,arrayDebug);
  printData(printbyname);
};

// Función que permite el filtrado por rol
const ShowByRol = () =>{
  let chosenValue = selectRol.value;
  let printRol = window.data.searchByRol(chosenValue, arrayDebug);
  printData(printRol);
};



// Función que filtra a los mejores campeones según su atributo
const ShowBestChampions = () =>{
  let attributes = bestAttributes.value;
  let bestChampions= window.data.filterByBestChampions (attributes,arrayDebug);
  printData(bestChampions);

};

const ord =() => {
  let selectedOption = optionToOrder.value;
  let orderAZ= window.data.filterbyletter (selectedOption, arrayDebug);
  printData(orderAZ);
};


const prom1 = ()=> {
  let chosenValue = selectRol.value;
  let calculateProm= window.data.promedio (chosenValue, arrayDebug);
  document.getElementById("id_result").innerHTML =
    `<img src="IMG/champion.PNG" alt=""><h2>CAMPEONES</h2>
    <p>Sabías que del total de campeones los ${chosenValue} representan el ${calculateProm} %.</p>
    `;
};

//slider

let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let i;
  const x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}



bestAttributes.addEventListener("change",ShowBestChampions); // Llamado de evento de selector para seleccionar mejores atributos
buttonSearchName.addEventListener("click",SearchChampion); // Llamado evento de botón para buscar por nombre de campeón
selectRol.addEventListener("change",ShowByRol);//Llamado de evento de selector para ordenar por rol
selectRol.addEventListener("change", prom1);
optionToOrder.addEventListener("change",ord); //Llamado de evento de selector para ordenar de la A a la Z y viceversa


