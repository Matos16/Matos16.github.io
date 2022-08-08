let countryObj;
let hints = 0;

const form1 = document.getElementById('form1');
const flag = document.getElementById('flagid');
const next = document.getElementById("nextButton");
const hinttext = document.getElementById("hinttext");

window.onload = function() {
    loadImgAndMakeOptions();    
}

function loadImgAndMakeOptions() {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode")
    .then(res => res.json())
    .then(data => {
        const r = Math.floor(Math.random() * data.data.length);
        countryObj = data.data[r];
        document.getElementById("flagimage").src = "https://countryflagsapi.com/png/" + countryObj.iso2;
        const flagSel = document.getElementById("flagname");
        data.data.forEach(function(item){
            var option = document.createElement('option');
            option.value = item.name;
            flagSel.appendChild(option);
        });
    });
}

function loadImg(){ 
    fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode")
    .then(res => res.json())
    .then(data => {
        const r = Math.floor(Math.random() * data.data.length);
        countryObj = data.data[r];
        document.getElementById("flagimage").src = "https://countryflagsapi.com/png/" + countryObj.iso2;
    });
}

form1.addEventListener("submit", e =>{
    e.preventDefault();
    if(flag.value.toLowerCase() == countryObj.name.toLowerCase()){
        window.alert('Correct !!');
        next.removeAttribute("hidden");
    }else{
        window.alert('Wrong !!');
    }
})

function toggleText(){
    if (hints < countryObj.name.length) {
        hinttext.innerHTML = hinttext.innerHTML + countryObj.name[hints];
    }
    if (hinttext.style.display === "none") {
        hinttext.style.display = "block";
    }
    hints += 1;
}

function changeImg(){
    hints = 0;
    flag.value = "";
    loadImg();
    if (hinttext.style.display === "block") {
        hinttext.innerHTML = "Hint(name): ";
        hinttext.style.display = "none";
    }
    next.setAttribute("hidden", "hidden");
}