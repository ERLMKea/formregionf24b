import {fetchAnyUrl} from "./modulejson.js";

console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

let kommuner = []
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommune);
    if (kommuner) {
        kommuner.forEach(createTable)
    } else {
        alert("Fejl ved kald til backend url=" + urlKommune + " vil du vide mere så kig i Console")
    }
}

function actionGetKommuner(kommuner) {
    fetchKommuner()
}

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href

    console.log(row)
}

pbCreateKommuneTable.addEventListener("click", actionGetKommuner);

