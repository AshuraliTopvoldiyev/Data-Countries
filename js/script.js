const body = document.querySelector("body")
const darklight = document.querySelector(".darklight")
const button = document.querySelector("button")
const icon = button.querySelector("i")
const text = button.querySelector(".text")
const select = document.querySelector(".select")
const option = document.querySelectorAll("option")
const region = document.querySelector(".region")
const card = document.querySelectorAll(".card")
const loader = document.querySelector(".loader")
const countries = document.querySelector(".countries")
const form = document.querySelector("form")
const input = document.querySelector("input")




const APIlink = "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,subregion,population"



let mode = localStorage.getItem("SunMoon") ? localStorage.getItem("SunMoon") : "light"

const darkMode = () => {
    if (mode == "dark") {
        body.classList.add("active")
    } else {
        body.classList.remove("active")
    }
}
darkMode()

darklight.addEventListener("click", (e) => {
    // console.log(darklight.innerHTML);

    if (mode == "light") {
        mode = "dark"

    } else {
        mode = "light"
    }

    localStorage.setItem("SunMoon", mode)
    darkMode()
    btnMode()
})

const btnMode = () => {
    if (body.classList.contains("active")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        text.textContent = "Light Mode"
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        text.textContent = "Dark Mode"
    }

}

const getData = async (link) => {
    loader.classList.add("active")
    const rec = await fetch(link)
    const data = await rec.json()
    writeData(data)
    loader.classList.remove("active")

}
getData(APIlink)

const writeData = (data) => {
    countries.innerHTML = " "
    data.forEach((item) => {
        countries.innerHTML += `<div class="card">
                        <img src="${item.flags.png}" alt"${item.flags.alt}">
                        <div class="info-card">
                            <h3 class="nameCountry">${item.name.common}</h3>
                            <h4>Population: <span>${item.population}</span></h4>
                            <h4 class="nameRegion">Region: <span class="region">${item.region}</span></h4>
                            <h4>Capital: <span>${item.capital}</span></h4>
                        </div>
                    </div>`
    })
}


input.addEventListener("input", (e) => {
    document.querySelectorAll(".card").forEach((item) => {
        if (!item.querySelector(".nameCountry").textContent.toLocaleLowerCase().trim().replaceAll(" ", "").includes(input.value.toLocaleLowerCase().trim().replaceAll(" ", ""))) {
            item.classList.add("hidden")
        } else {
            item.classList.remove("hidden")
        }
    })
})

select.addEventListener("change", (e) => {
    document.querySelectorAll(".card").forEach((item) => {
        console.log(select.value);
        if ((select.value.includes("all"))) {
            item.classList.remove("hidden")
        } else if (!item.querySelector(".region").textContent.includes(select.value)) {
            item.classList.add("hidden")
        } else {
            item.classList.remove("hidden")
        }

    })

})





