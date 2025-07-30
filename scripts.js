let form = document.getElementById("converter-form")
let amount = document.getElementById("amount")
let fromCurrency = document.getElementById("fromCurrency")
let convertedAmount = document.getElementById("convertedAmount")
let toCurrency = document.getElementById("toCurrency")
let loading = document.querySelector(".loading")
let result = document.querySelector(".result")
let error = document.querySelector(".error")

let API_URL = "https://api.exchangerate-api.com/v4/latest/"

async function convertMoney(){

    loading.style.display = "block"
    error.style.display = "none"
    result.style.display = "none"

    try {
        let response = await fetch(API_URL + fromCurrency.value)
        let data = await response.json()
        const rate = data.rates[toCurrency.value]
        const convertedValue = (amount.value * rate).toFixed(2)
        convertedAmount.value = convertedValue

        result.style.display = "block"


        result.innerHTML = `
            <div style="font-size: 1.4rem">
                ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
            </div>

            <div style="font-size: 0.8rem; opacity 0.8; margin-top: 10px">
                Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
            </div>

        `

    } catch (e) {

        error.style.display = "block"
        error.innerHTML = "Falha no converter de moeda!Tente novamente"
    }
    
    loading.style.display = "none"
}
    

form.addEventListener("submit", function(e){

        e.preventDefault()
        convertMoney()
})