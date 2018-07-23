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
  console.log(Data);
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


function sortOutDeadCharacters(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].dead === 'true') {
      tomb.splice(i, 1);
      i--;
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
  var main = document.querySelector('.main');
  for (var i = 0; i < tomb.length; i++) {
    var char = document.createElement('div');
    char.className = 'one-character';
    char.id = 'character' + i;
    // Megadok neki egy új tulajdonságot, chardata néven, ami az összes adatát fogja tartalmazni
    char.chardata = tomb[i];
    var ptag = tomb[i].name;
    var itag = tomb[i].portrait;
    char.innerHTML = `<p>${ptag}</p> <img src="${itag}" alt="Picture not found">`;
    main.appendChild(char);
  }
}
