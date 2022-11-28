const $calcular=document.querySelector(".calcular");
const $cambioMonedas=document.querySelector(".cambioMonedas")
const $errores=document.querySelector(".errores");

/*let monedas=["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"];*/

$calcular.onclick= calcular;

function calcular() {
    eliminarListado();
    eliminarErrores();
    calcularCambio();
}

function calcularCambio() {
    const $base=document.querySelector(".base");
    const $fecha=document.querySelector(".fecha");
    

    var myHeaders = new Headers();
    myHeaders.append("apikey", "tGs0DYb39HcFfVBbaifKRx71RMU1OkT5");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/fixer/${$fecha.value}?symbols=&base=${$base.value}`, requestOptions)
        .then(response => response.json())
        .then(result =>    {
            let resultado=result.success;
            if(resultado) {   
                let valoresMonedas=result.rates;
                let propiedadesRates=Object.keys(result.rates)
                propiedadesRates.forEach((el,i) => {
                    $listado=document.createElement("li");
                    $listado.textContent=`${propiedadesRates[i]}:${result.rates[el]}`;
                    $listado.classList.add("moneda");
                    $cambioMonedas.appendChild($listado)

                })
            } else {
                if(result.error.type=="invalid_base_currency") {
                        $listaErrores=document.createElement("li");
                        $listaErrores.textContent="Introduciste una base erronea";
                        $listaErrores.classList.add("errorListado");
                        $errores.appendChild($listaErrores)
                        
                }
                if (result.error.type=="invalid_date") {
                    
                        $listaErrores=document.createElement("li");
                        $listaErrores.textContent="Introduciste una fecha erronea";
                        $listaErrores.classList.add("errorListado");
                        $errores.appendChild($listaErrores)
                
                }
            }
           
        })
        .catch(error => console.log('error', error));

} 



function eliminarErrores() {
    $erroresListado=document.querySelectorAll(".errorListado");
    $erroresListado.forEach((el)=> {
            el.remove();
    })
}

function eliminarListado() {
    $listadoMonedas=document.querySelectorAll(".moneda");
    $listadoMonedas.forEach((el)=> {
        el.remove();
})
}









