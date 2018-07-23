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
  console.log(Data);
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


var onediv = document.querySelector('.onediv');
onediv.innerHTML = '<img class="title" src="https://i.pinimg.com/474x/99/9d/46/999d463a6a2167f08610fed7d4f185d3--hbo-game-of-thrones-game-of-thrones-characters.jpg"></img>';
var containerDiv = document.querySelector('.container');
var mainDiv = document.querySelector('.main');
var sideDiv = document.querySelector('.side');
// var oneDiv = document.createElement('.div');

function sortOutDeadCharacters(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].dead === 'true') {
      tomb.splice(i, 1);
    }
  }
}

function sortCharactersByName(tomb) {
  for (var i = 0; i < tomb.length - 1; i++) {
    for (var j = i + 1; j < tomb.length; j++) {
      if (tomb[i].name.localeCompare(tomb[j].name) === 1) {
        [tomb[i], tomb[j]] = [tomb[j], tomb[i]];
      }
    }
  }
}


function insertCharacters(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    var char = document.createElement('div');
    char.className = 'one-character';
    char.id = 'character ' + i;
    // itt megadok neki egy új tulajdonságot, amivel elmentem az összes adatát, hogy ne csak a név és kép legyen meg
    char.chardata = tomb[i];
    var ptag = tomb[i].name;
    var itag = tomb[i].portrait;
    char.innerHTML = `<p>${ptag}</p> <img src="${itag}" alt="Picture not found" class="char-img"></img>`;
    mainDiv.appendChild(char);
  }
}


function showClickedCharacter() {
  var chars = document.querySelectorAll('.one-character');
  for (var i = 0; i < chars.length; i++) {
    chars[i].addEventListener('click', function showOnSide() {
      console.log(this.chardata);
      setSideDiv(this.chardata);
    });
  }
}

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
