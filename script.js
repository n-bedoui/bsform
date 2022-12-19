var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
if (day < 10) {
    day = "0" + day;
}
if (month < 10) {
    month = "0" + month;
}
var tdate = year + "-" + month + "-" + day;

const date_min = tdate;

const date = document.querySelector('#date')
date.setAttribute("min", date_min)


const form = document.querySelector("form"); //recupération de l'ensemble par form (tout les elements)
const elements = form.elements; // constante elements qui conserne les inputs 


const options = {
    title: "Ce champ est obligatoire",
    placement: "bottom"
};

function getMessageTooltip(element){
    let message = null;
    
    if (element.validity.valueMissing) {
        message = options.title;
    } else if (element.validity.rangeUnderflow || element.validity.rangeUpperFlow ) {
        switch (element.id) {
            case "name":
                message = messageError.name
                break;
            case "date":
                message = messageError.date
                break;
            case "tarif":
                message = messageError.tarif
                break;
            case "description":
                message = messageError.description
                break;
        }        
    } else { 
            console.log("you are smart!") 
    }

    return message;
}

for (const element of elements) { // for(String str: strings) // boucle
    const id = element.id;

    const helpText = document.getElementById(`help${id}`);

    if (element.type != "submit") {
        //const tooltip = bootstrap.Tooltip.getOrCreateInstance(element, options); // ValidityState (=> MDN)

        element.addEventListener("invalid", (event) => { // chaque itération il ajoute un ecouteur de type 'invalide' on peut mettre type click, change, input, keyup
            event.preventDefault();
            element.classList.add("is-invalid");
            helpText.classList.add("text-danger");
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element, options); 
            tooltip.setContent({ '.tooltip-inner': getMessageTooltip(element) });
        });


        element.addEventListener("focusout", (event) => {    
            event.preventDefault();
            if (element.validity.valid) {
                element.classList.remove("is-invalid");
                element.classList.add("is-valid");
                helpText.classList.remove("text-danger");
                helpText.classList.add("text-success");
                const tooltip = bootstrap.Tooltip.getOrCreateInstance(element, options); 
                tooltip.dispose()
                
            } else {
                element.classList.remove("is-valid");
                element.classList.add("is-invalid");
                helpText.classList.remove("text-success");
                helpText.classList.add("text-danger");
                const tooltip = bootstrap.Tooltip.getOrCreateInstance(element, options); 
                tooltip.setContent({ '.tooltip-inner': getMessageTooltip(element) });
                tooltip.show();
            }
        });

        element.addEventListener("change", (event) => {    
            event.preventDefault();
            if (element.validity.valid) {
                element.classList.remove("is-invalid");
                element.classList.add("is-valid");
                helpText.classList.remove("text-danger");
                helpText.classList.add("text-success");
                const tooltip = bootstrap.Tooltip.getOrCreateInstance(element, options); 
                tooltip.dispose();
            } else {
                element.classList.remove("is-valid");
                element.classList.add("is-invalid");
                helpText.classList.remove("text-success");
                helpText.classList.add("text-danger");
                const tooltip = bootstrap.Tooltip.getOrCreateInstance(element, options); 
                tooltip.setContent({ '.tooltip-inner': getMessageTooltip(element) });
                tooltip.show();
            }
        });

    }


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const toaster = document.getElementById("toast");
        const toast = new bootstrap.Toast(toaster);
        toast.show();
        event.target.reset();
        element.classList.remove("is-valid");
        helpText.classList.remove("text-success");

    });

}











