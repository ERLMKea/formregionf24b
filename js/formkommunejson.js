console.log("jeg er i formregion")
const urlPostRegion = "http://localhost:8080/region"

function createKommune() {
    const kommune = {}
    kommune.kode = "9874"
    kommune.navn = "KEAyy"
    kommune.href = "http:kea"
    kommune.region = {}
    kommune.region.kode = "1081"
    return kommune;
}


const kom1 = createKommune()
console.log(kom1)
