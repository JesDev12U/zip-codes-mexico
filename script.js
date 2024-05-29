//API para los codigos postales de México
const API_URL = "https://sepomex.icalialabs.com/api/v1/zip_codes";

const CP = document.getElementById("cp");
const state = document.getElementById("state");
const zone = document.getElementById("zone");
const colonys = document.getElementById("colonys");
const submitForm = document.getElementById("submit-form");

function disableSubmit() {
  if (
    CP.value === "" ||
    state.value === "" ||
    state.value === null ||
    zone.value === ""
  )
    submitForm.disabled = true;
  else submitForm.disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
  disableSubmit();
});

CP.addEventListener("input", function (e) {
  //Hacemos que el campo de CP se limite a solo números de 5 dígitos
  let char = e.key;
  if (!/[0-9]/.test(char) || this.value.length == 5) {
    e.preventDefault();
  }

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
          state.value = "";
          zone.value = "";
          colonys.innerHTML = "";
          disableSubmit();
          return;
        }

        data.zip_codes.forEach((zip_code) => {
          state.value = zip_code.d_estado;
          zone.value = zip_code.d_mnpio;
          //Rellenamos la info de las colonias
          let option = document.createElement("option");
          option.text = option.value = zip_code.d_asenta;
          colonys.appendChild(option);
        });
        disableSubmit();
      });
  }
});

// if(CP)
// fetch(`${API_URL}?zip_code=${CP.textContent}`)
