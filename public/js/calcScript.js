import { setupHyperFormula, getMonthlyPayment, updateParameter } from "./calculator.js";

const annualInterestRateInput = document.getElementById('annual-interest-rate');
const numberOfMonthsInput = document.getElementById('number-of-months');
const loanAmountInput = document.getElementById('loan-amount');
const monthlyPaymentPlaceholder = document.getElementById('monthly-payment-placeholder');

annualInterestRateInput.addEventListener('input', () => {
  const annualInterestRate = parseFloat(annualInterestRateInput.value) / 100;
  updateParameter('AnnualInterestRate', annualInterestRate);
  displayMonthlyPayment();
});

numberOfMonthsInput.addEventListener('input', () => {
  const numberOfMonths = parseInt(numberOfMonthsInput.value);
  updateParameter('NumberOfMonths', numberOfMonths);
  displayMonthlyPayment();
});

loanAmountInput.addEventListener('input', () => {
  const loanAmount = parseFloat(loanAmountInput.value);
  updateParameter('LoanAmount', loanAmount);
  displayMonthlyPayment();
});

function displayMonthlyPayment() {
  const monthlyPayment = getMonthlyPayment();
  monthlyPaymentPlaceholder.textContent = monthlyPayment.toFixed(2);
}

setupHyperFormula();
displayMonthlyPayment();
 



var result = 0;

document.getElementById('apply-button').addEventListener('click', () => {
  const formula = document.getElementById('test-formula').value;

  const hfInstance = HyperFormula.buildEmpty({
    licenseKey: 'gpl-v3', // Usa tu clave de licencia si tienes una
  });
  
  // Añadir una hoja de cálculo
  const sheetName = hfInstance.addSheet('Sheet1');
  const sheetId = hfInstance.getSheetId(sheetName);


  // Aplicar la fórmula a una celda específica (por ejemplo, A1)
  hfInstance.setCellContents({ sheet: sheetId, col: 0, row: 0 }, [[formula]]);

  // Obtener el resultado de la fórmula
  var result = hfInstance.getCellValue({ sheet: sheetId, col: 0, row: 0 });
  console.log('Resultado:', result);

  document.getElementById('resultado-placeholder').textContent = result;

  // Mostrar el resultado al usuario (opcional)
  alert(`El resultado de la fórmula es: ${result}`);
});



const hfInstance2 = HyperFormula.buildEmpty({
  licenseKey: 'gpl-v3', // Usa tu clave de licencia si tienes una
});

const sheetName2 = hfInstance2.addSheet('Sheet1');
const sheetId2 = hfInstance2.getSheetId(sheetName2);


const datos = {
  "velocidad" : [1,3,4,5,5,5,6,7,6,5,4,3,2,0],
  "gasolina" : [10,10,10,9,9,9,8,8,7,7,7,7,6,6]
}

datos.velocidad.forEach((valor, index) => {
  hfInstance2.setCellContents({ sheet: sheetId2, col: 0, row: index }, [[valor]]);
});

// Cargar "gasolina" en la columna B (columna 1)
datos.gasolina.forEach((valor, index) => {
  hfInstance2.setCellContents({ sheet: sheetId2, col: 1, row: index }, [[valor]]);
});


var operador = "";
var parametro = "";
var valor = 0;



var parameter = document.getElementById("parameter")
parameter.addEventListener('change', () => {
  if(parameter.value == "Velocidad"){
    
    parametro = "A"
    console.log("Parametro: ", parametro)
  }
})

var filter = document.getElementById("filters")
filter.addEventListener('change', () => {
  if(filter.value == "Mayor que"){
    
    operador = ">"
    console.log("Operador: ", operador)
  }
})

var parameter_value = document.getElementById("parameter-value")
parameter_value.addEventListener('change', () => {
  valor = parameter_value.value
  console.log("Valor: ", valor)
})




// document.getElementById('apply-button2').addEventListener('click', () => {
//   const formula = "=FILTER(A1:B15," + parametro + operador + valor + ',"")'

//   // Obtener el resultado de la fórmula
//   var result = hfInstance.getCellValue({ sheet: sheetId, col: 0, row: 0 });
//   console.log('Resultado:', result);

//   document.getElementById('resultado-placeholder').textContent = result;

//   // Mostrar el resultado al usuario (opcional)
//   alert(`El resultado de la fórmula es: ${result}`);
// });

document.getElementById('apply-button2').addEventListener('click', () => {
  if (!parametro || !operador || isNaN(valor)) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Crear la fórmula de filtrado
  console.log(parametro,operador,valor)
  var formula = `=ARRAYFORMULA(FILTER(A1:B14, ${parametro}1:${parametro}14 ${operador} ${valor}))`;
  formula = '=FILTER(A1:B14, A1:A14, ">4")'
  formula = '=ARRAYFORMULA(FILTER(A1:B5), {1,0,1,1,0})'
  console.log(formula)

  // Aplicar la fórmula
  hfInstance2.setCellContents({ sheet: sheetId2, col: 2, row: 0 }, formula);
  // hfInstance2.setCellContents({ sheet: sheetId2, col: 4, row: 0 }, "Hola");

  // Obtener los resultados filtrados
  // const resultados = hfInstance2.getSheetValues(sheetId2).slice(2); // Ignorar las primeras dos filas (datos originales)
  const resultados = hfInstance2.getSheetValues(sheetId2)
  console.log('Resultados:', resultados);

  const resultadosFiltrados = hfInstance2.getCellValue({ sheet: sheetId2, col: 2, row: 0 });
  console.log('Resultados filtrados:', resultadosFiltrados);

  // Mostrar los resultados en la interfaz
  
  document.getElementById("resultado-placeholder2").textContent = JSON.stringify(resultados, null, 2);
});