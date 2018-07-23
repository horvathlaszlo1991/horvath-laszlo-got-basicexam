function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText);
  var Data = userDatas[2].data;
  console.log(userDatas);
  /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG!

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
  sortOutDeadCharacters(Data);
  sortCharactersByName(Data);
  insertCharacters(Data);
  showClickedCharacter(Data);
  createSearchBar();
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


var onediv = document.querySelector('.onediv');
onediv.innerHTML = '<img class="title" src="https://i.pinimg.com/474x/99/9d/46/999d463a6a2167f08610fed7d4f185d3--hbo-game-of-thrones-game-of-thrones-characters.jpg"></img>';
var mainDiv = document.querySelector('.main');
var sideDiv = document.querySelector('.side');
// var oneDiv = document.createElement('.div');


// Kiszűröm a halott karaktereket.
function sortOutDeadCharacters(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].dead === 'true') {
      tomb.splice(i, 1);
    }
  }
}

// Név szerint rendezem a karaktereket.
function sortCharactersByName(tomb) {
  for (var i = 0; i < tomb.length - 1; i++) {
    for (var j = i + 1; j < tomb.length; j++) {
      if (tomb[i].name.localeCompare(tomb[j].name) === 1) {
        [tomb[i], tomb[j]] = [tomb[j], tomb[i]];
      }
    }
  }
}


// Hozzáadom a karakterek képét és nevét a mainDiv-hez.
function insertCharacters(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    var char = document.createElement('div');
    char.className = 'one-character';
    char.id = 'character ' + i;
    // itt megadok neki egy új tulajdonságot (chardata), amivel elmentem az összes adatát, hogy ne csak a név és kép legyen meg.
    char.chardata = tomb[i];
    var ptag = tomb[i].name;
    var itag = tomb[i].portrait;
    char.innerHTML = `<p>${ptag}</p> <img src="${itag}" alt="Picture not found" class="char-img"></img>`;
    mainDiv.appendChild(char);
  }
}


// Eseményfigyelőt állítok az összes karakter div-re.
function showClickedCharacter() {
  var chars = document.querySelectorAll('.one-character');
  for (var i = 0; i < chars.length; i++) {
    chars[i].addEventListener('click', function showOnSide() {
      setSideDiv(this.chardata);
    });
  }
}


// Beállítom a kattintott karakter képét, nevét, leírását, house ikonját az oldalsó karakter divbe.
// Kicsit hosszú függvény, majd szebben is meg lehetne csinálni (lásd lejjebb)...
function setSideDiv(character) {
  onediv.innerHTML = '<img class="title" src="https://i.pinimg.com/474x/99/9d/46/999d463a6a2167f08610fed7d4f185d3--hbo-game-of-thrones-game-of-thrones-characters.jpg"></img>';
  var itag = document.createElement('img');
  var head = document.createElement('h2');
  var ptag = document.createElement('p');
  var icon = document.createElement('img');
  icon.className = 'char-icon';
  icon.alt = 'House icon not found!';
  itag.className = 'char-picture';
  itag.alt = 'Picture not found';

  icon.src = '../assets/houses/' + character.house + '.png';
  itag.src = character.picture;
  head.innerHTML = character.name;
  ptag.innerHTML = character.bio;

  onediv.appendChild(itag);
  onediv.appendChild(head);
  onediv.appendChild(ptag);
  onediv.appendChild(icon);
}

/*
Így lehetne rövidebb, csak a fenti módszerrel jobban tudom külön-külön formázni őket CSS-ben, ha kell...

  onediv.innerHTML = '<img class="title" src="https://i.pinimg.com/474x/99/9d/46/999d463a6a2167f08610fed7d4f185d3--hbo-game-of-thrones-game-of-thrones-characters.jpg"></img>';
  onediv.innerHTML += `<img src="${character.picture}">`;
  onediv.innerHTML += `<h2>${character.name}</h2>`;
  onediv.innerHTML += `<p>${character.bio}</p>`;
  onediv.innerHTML += `<img src="../assets/houses/" + ${character.house} + ".png">`;

  Ezt akár egybe is lehetne vonni egy nagy += segítségével, de így sokkal jobban átlátható, és még mindig Clean code :)
}

*/

// Kereső létrehozása az oldalsó divben
function createSearchBar() {
  var searchbar = document.createElement('input');
  var searchbutton = document.createElement('input');
  var searchdiv = document.createElement('div');
  searchdiv.className = 'search-div';
  searchbutton.className = 'search search-button';
  searchbar.className = 'search search-bar';
  searchbar.type = 'text';
  searchbutton.type = 'submit';
  searchbutton.value = 'Search!';
  searchbar.placeholder = 'Enter full name here';
  searchbutton.addEventListener('click', searchName);
  searchdiv.appendChild(searchbar);
  searchdiv.appendChild(searchbutton);
  sideDiv.appendChild(searchdiv);
}

function searchName() {
  onediv.innerHTML = '<h3>Character not found!</h3>';
  var input = document.querySelector('.search-bar').value.toLowerCase();
  var characters = document.querySelectorAll('.one-character');
  for (var i = 0; i < characters.length; i++) {
    if (characters[i].chardata.name.toLowerCase() === input) {
      setSideDiv(characters[i].chardata);
    }
  }
}
