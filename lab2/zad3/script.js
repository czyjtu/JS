var cars = [];

function add() {
  var carsInfo = document.getElementById("cars").value;
  if (!carsInfo) return;

  var isChecked = document.getElementById("sessionCheck").checked;

  var carsAtrributes = carsInfo.split(", ");

  var info, atributes, key, value;

  if (!isChecked) {
    var car = new Map();

    for (info of carsAtrributes) {
      atributes = info.split("=");
      key = atributes[0];
      value = atributes[1];
      car.set(key, value);
    }
    cars.push(car);
  } else {
    for (info of carsAtrributes) {
      atributes = info.split("=");
      key = atributes[0];
      value = atributes[1];
      sessionStorage.setItem(key, value);
    }
  }
}

function find() {
  var carsInfo = document.getElementById("cars").value;
  if (!cars) return;
  var isChecked = document.getElementById("sessionCheck").checked;
  var carsAtrributes = carsInfo.split(", ");
  var info, atributes, key, value;
  var isFound;
  var result = "";
  var text;

  if (!isChecked) {
    for (var i = 0; i < cars.length; i++) {
      var car = cars[i];
      if (!(car instanceof Map)) continue;
      isFound = true;
      text = "";
      for (info of carsAtrributes) {
        atributes = info.split("=");
        key = atributes[0];
        value = atributes[1];
        if (car.get(key) !== value) {
          isFound = false;
          break;
        }
      }

      if (isFound) {
        for ([key, value] of car) {
          text += key + "=" + value + ", ";
        }
        text = text.slice(0, text.length - 2);
        result += text + "<br>";
      }
    }
    document.getElementById("searchResult").innerHTML = result;
  } 
  else {
    for (info of carsAtrributes) {
        atributes = info.split("=");
        key = atributes[0];
        value = atributes[1];
      if (sessionStorage.getItem(key) !== value) {
        document.getElementById("searchResult").innerHTML = "Nie znaleziono auta";
        return;
      }
    }
    document.getElementById("searchResult").innerHTML = "True";
  }
}
