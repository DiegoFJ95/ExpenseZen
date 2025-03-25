// import { HyperFormula } from 'hyperformula';
// const HyperFormula = require("@handsontable/hyperformula").HyperFormula;
// import { HyperFormula } from '.  /modules/hyperformula.js';

// const { HyperFormula } = await import("https://unpkg.com/@handsontable/hyperformula@latest/dist/hyperformula.full.mjs");

// import { HyperFormula } from 'hyperformula';

// const { HyperFormula } = await import("/modules/hyperformula.full.mjs");

console.log(
  `%c Using HyperFormula ${HyperFormula.version}`,
  "color: blue; font-weight: bold"
);

let hf = undefined;
let sheetId = undefined;

export function setupHyperFormula() {
  // Create a HyperFormula instance SA
  hf = HyperFormula.buildEmpty({licenseKey: 'gpl-v3'});

  // Add an empty sheet
  const sheetName = hf.addSheet('Mortgage Calculator');
  sheetId = hf.getSheetId(sheetName);

  // Enter the mortgage parameters
  hf.addNamedExpression('AnnualInterestRate', .08);
  hf.addNamedExpression('NumberOfMonths', 360);
  hf.addNamedExpression('LoanAmount', 800000);

  // Use the PMT function to calculate the monthly payment
  hf.setCellContents({ sheet: sheetId, row: 0, col: 0 }, [['Monthly Payment', '=PMT(AnnualInterestRate/12, NumberOfMonths, -LoanAmount)']]);
}

export function updateParameter(name, newValue) {
  // Update the value of a mortgage parameter
  hf.changeNamedExpression(name, newValue);
}

export function getMonthlyPayment() {
  // Read the calculated monthly payment
  return hf.getCellValue({ sheet: sheetId, row: 0, col: 1 });
}
