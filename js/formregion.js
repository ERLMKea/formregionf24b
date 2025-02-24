console.log("jeg er i formregion")

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formRegion;

function createFormEventListener() {
    formRegion = document.getElementById("formRegion");
    formRegion.addEventListener("submit", handleFormSubmit);
}

async function postFormDataAsJson(url, obj) {
    debugger
    const objectAsJsonString = JSON.stringify(obj);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
        },
        body: objectAsJsonString,
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error(errorMessage);
    } else {
        //vi har fået response fra backend. Vi skal tænke os godt om hvor vi henter json ud
        //const js1 = response.json() //.json() returnerer igen et promise,
        console.log("ok")
        console.log(response.statusText)
    }
    return response;
}


async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    debugger
    console.log(url);
    try {
        const formData = new FormData(form);
        const regionObj = Object.fromEntries(formData.entries());        console.log(formData);
        const responseData = await postFormDataAsJson(url, regionObj);
        console.log(responseData.statusText);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }

}

