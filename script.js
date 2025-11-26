const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});
//Values from the form
const initialamount = document.getElementById("initialamount");
const years = document.getElementById("years");
const bunga = document.getElementById("bunga");
const compound = document.getElementById("compound");

//Message
const  message = document.getElementById("message");

//The calculate button
const button = document.querySelector(".input-group button");
//Attach an event listener
button.addEventListener("click", calculateGrowth);

const data = [];
const labels = [];

function calculateGrowth(e) {
    e.preventDefault();
    data.length = 0;
    labels.length = 0;
    let growth = 0;
    let angka = 0;

   // Buat formatter untuk Rupiah Indonesia
    const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    });
    try {
        const initial = parseInt(initialamount.value);
        const period = parseInt(years.value);
        const interest = parseInt(bunga.value);
        const comp = parseInt(compound.value);

        for(let i = 1; i <= period; i++) {
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i);
            data.push(toDecimal(final, 2));
            labels.push("" + i);
            growth = toDecimal(final, 2);
            angka = toDecimal(final, 2)
        }
        //
        message.innerText = `kamu akan mendapat ${currencyFormatter.format(growth)} setelah ${period} tahun`;
        drawGraph();
    } catch (error) {
       console.error(error); 
    }
}

function drawGraph() {
    line.destroy();
    line = new Chart(context, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: "Saldo",
                data,
                fill: true,
                backgroundColor: "rgba(12, 141, 0, 0.7)",
                borderWidth: 3
            }]
        }
    });
}

function toDecimal(value, decimals) {
    return +value.toFixed(decimals);
}