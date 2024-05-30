//API para los codigos postales de México
const API_URL = "https://sepomex.icalialabs.com/api/v1/zip_codes";

const CP = document.getElementById("cp");
const state = document.getElementById("state");
const zone = document.getElementById("zone");
const colonys = document.getElementById("colonys");
const submitForm = document.getElementById("submit-form");
const street = document.getElementById("street");
const extNum = document.getElementById("ext-num");
const inNum = document.getElementById("in-num");

const MAX_LENGTH_NUMS = 10;

const disableSubmit = () => {
  if (
    CP.value === "" ||
    state.value === "" ||
    zone.value === "" ||
    street.value === ""
  )
    submitForm.disabled = true;
  else submitForm.disabled = false;
};

const formatStr = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

const cleanForm = () => {
  state.value = "";
  zone.value = "";
  colonys.innerHTML = "";
};

const makeFieldsRequired = () => {
  if (extNum.value || inNum.value) {
    extNum.required = true;
    inNum.required = true;
  } else {
    extNum.required = false;
    inNum.required = false;
  }
};

document.addEventListener("DOMContentLoaded", () => disableSubmit());

//Hacemos que el campo de CP se limite a solo números de 5 dígitos
CP.addEventListener("keypress", function (e) {
  let char = e.key;
  if (!/[0-9]/.test(char) || this.value.length == 5) {
    e.preventDefault();
  }
});

//Hacemos que el campo de calle tenga el formato adecuado
street.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  disableSubmit(); //Verificamos que no esté vacío el campo de la calle
});

//Hacemos que el campo de número exterior se limite a solo 5 caracteres
extNum.addEventListener("keypress", function (e) {
  if (this.value.length == MAX_LENGTH_NUMS) {
    e.preventDefault();
  }
});

//Hacemos que el campo de número exterior tenga el formato adecuado
extNum.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  makeFieldsRequired();
});

//Hacemos que el campo de número interior se limite a solo 5 caracteres
inNum.addEventListener("keypress", function (e) {
  if (this.value.length == MAX_LENGTH_NUMS) {
    e.preventDefault();
  }
});

//Hacemos que el campo de número interior tenga el formato adecuado
inNum.addEventListener("input", function (e) {
  this.value = formatStr(this.value);
  makeFieldsRequired();
});

//Aqui empiza la magia
CP.addEventListener("input", function (e) {
  //Al ingresar 5 dígitos, hacemos una petición al servidor y mostramos la información
  if (this.value.length === 5) {
    console.log("Buscando en la API el CP " + this.value);
    fetch(`${API_URL}?zip_code=${this.value}`)
      .then((response) => response.json())
      .then((data) => {
        //Cada que hacemos una petición, eliminamos las colonias
        colonys.innerHTML = "";

        // Si no se encontraron códigos postales
        if (data.zip_codes.length === 0) {
          alert("No se encontró el código postal");
          cleanForm();
          disableSubmit();
          return;
        }

        data.zip_codes.forEach((zip_code) => {
          state.value = formatStr(zip_code.d_estado);
          zone.value = formatStr(zip_code.d_mnpio);
          //Rellenamos la info de las colonias
          let option = document.createElement("option");
          option.text = option.value = formatStr(zip_code.d_asenta);
          colonys.appendChild(option);
        });
        disableSubmit();
      });
  } else {
    cleanForm();
    disableSubmit();
  }
});
