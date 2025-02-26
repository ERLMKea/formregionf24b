import {fetchAnyUrl, restDelete, fetchRegioner} from "./modulejson.js";

console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    let cell = row.insertCell(cellCount++)
    row.id = kommune.navn

    cell.innerHTML = kommune.kode
    cell.style.width = "15%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn
    cell.style.width = "20%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href
    cell.style.width = "30%"

    //Add image
    cell = row.insertCell(cellCount++)
    if (kommune.hrefPhoto.length>2) {
        let img = document.createElement("img")
        //img.setAttribute("src","https://www.jernbanen.dk/Fotos/Pbane/FFJ/FFJ_M1210_1954.jpg")
        img.setAttribute("src",kommune.hrefPhoto)
        img.setAttribute("alt", "hej")
        img.setAttribute("width", 150)
        img.setAttribute("height", 150)
        cell.appendChild(img)
    } else {
        cell.innerHTML = kommune.hrefPhoto
    }

    //Add region dropdown
    cell = row.insertCell(cellCount++)
    const dropdown = document.createElement('select');
    dropdown.id = "ddRegion" + kommune.kode;
    regMap.forEach(reg => {
        const element = document.createElement('option');
        element.textContent = reg.navn
        element.value = reg.kode
        element.region = reg
        dropdown.append(element);
    })
    cell.appendChild(dropdown)

    //Add delete button
    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    pbDelete.className = "btn1"
    cell.appendChild(pbDelete);
    pbDelete.onclick = function() {
        //let svar = alert("Er du ikker")
        //if (svar)
        document.getElementById(kommune.navn).remove();
        deleteKommune(kommune); //send delete til backend
    }

    //Add update button
    cell = row.insertCell(cellCount++)
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute("value", "Update kommune");
    pbUpdate.className = "btn1"
    cell.appendChild(pbUpdate);
    pbUpdate.onclick = function() {
        console.log(dropdown)
        console.log(dropdown.selectedIndex)
        console.log(dropdown.value)
        kommune.region.kode = dropdown.value
        console.log(kommune)
    }

    //console.log(row)
}

async function deleteKommune(kommune) {
    //brug fetch til delete
    const delUrl = "http://localhost:8080/kommune/" + kommune.kode
    try {
        const response = await restDelete(delUrl);
        console.log("Vi har slettet");
        console.log(response);
        const body = await response.text();
        alert(body)
    } catch(error) {
        alert(error.message);
        console.log(error);
    }
}

let kommuner = []
let regMap = new Map()
async function fetchKommuner() {
    regMap = await fetchRegioner();
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


pbCreateKommuneTable.addEventListener("click", actionGetKommuner);

