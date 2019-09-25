/**
 * Etherscan Smart Contract Verfication Utility
 *
 * See: https://etherscan.io/apis#contracts
 * Requires API key from etherscan.io
 */

/**
* TODO: implement the following three functions
*/

// TODO: abstract API key to .secrets file under config (same location as Infura API keys)
const API_KEY = '29H524T56GKUIWP1QWM27ZBMP7AZJH2T4R';

// 1: Submit Source Code for Verification
$.ajax({
  type: 'POST',                       // Only POST supported
  url: '//api.etherscan.io/api', // Set to the  correct API url for Other Networks
  data: {
    apikey: API_KEY,                                // A valid API-Key is required
    module: 'contract',                             // Do not change
    action: 'verifysourcecode',                     // Do not change
    contractaddress: $('#contractaddress').val(),   // Contract Address starts with 0x...
    sourceCode: $('#sourceCode').val(),             // Contract Source Code (Flattened if necessary)
    contractname: $('#contractname').val(),         // ContractName
    compilerversion: $('#compilerversion').val(),   // see http://etherscan.io/solcversions for list of support versions
    optimizationUsed: $('#optimizationUsed').val(), // 0 = Optimization used, 1 = No Optimization
    runs: 200,                                      // set to 200 as default unless otherwise
    constructorArguements: $('#constructorArguements').val(),   // if applicable
    libraryname1: $('#libraryname1').val(),         // if applicable, a matching pair with libraryaddress1 required
    libraryaddress1: $('#libraryaddress1').val(),   // if applicable, a matching pair with libraryname1 required
    libraryname2: $('#libraryname2').val(),         // if applicable, matching pair required
    libraryaddress2: $('#libraryaddress2').val(),   // if applicable, matching pair required
    libraryname3: $('#libraryname3').val(),         // if applicable, matching pair required
    libraryaddress3: $('#libraryaddress3').val(),   // if applicable, matching pair required
    libraryname4: $('#libraryname4').val(),         // if applicable, matching pair required
    libraryaddress4: $('#libraryaddress4').val(),   // if applicable, matching pair required
    libraryname5: $('#libraryname5').val(),         // if applicable, matching pair required
    libraryaddress5: $('#libraryaddress5').val(),   // if applicable, matching pair required
    libraryname6: $('#libraryname6').val(),         // if applicable, matching pair required
    libraryaddress6: $('#libraryaddress6').val(),   // if applicable, matching pair required
    libraryname7: $('#libraryname7').val(),         // if applicable, matching pair required
    libraryaddress7: $('#libraryaddress7').val(),   // if applicable, matching pair required
    libraryname8: $('#libraryname8').val(),         // if applicable, matching pair required
    libraryaddress8: $('#libraryaddress8').val(),   // if applicable, matching pair required
    libraryname9: $('#libraryname9').val(),         // if applicable, matching pair required
    libraryaddress9: $('#libraryaddress9').val(),   // if applicable, matching pair required
    libraryname10: $('#libraryname10').val(),       // if applicable, matching pair required
    libraryaddress10: $('#libraryaddress10').val()  // if applicable, matching pair required
  },
  success: function (result) {
    console.log(result);
    if (result.status == '1') {
      // 1 = submission success, use the guid returned (result.result) to check the status of your submission.
      // Average time of processing is 30-60 seconds
      document.getElementById('postresult').innerHTML = result.status + ';' + result.message + ';' + result.result;
      // result.result is the GUID receipt for the submission, you can use this guid for checking the verification status
    } else {
      // 0 = error
      document.getElementById('postresult').innerHTML = result.status + ';' + result.message + ';' + result.result;
    }

    console.log('status : ' + result.status);
    console.log('result : ' + result.result);
  },
  error: function (result) {
    console.log('error!');
    document.getElementById('postresult').innerHTML = 'Unexpected Error';
  }
});

// 2: Check Source Code Verification Status
$.ajax({
  type: 'GET',
  url: '//api.etherscan.io/api',
  data: {
    guid: 'ezq878u486pzijkvvmerl6a9mzwhv6sefgvqi5tkwceejc7tvn', // Replace with your Source Code GUID receipt above
    module: 'contract',
    action: 'checkverifystatus'
  },
  success: function (result) {
    console.log('status : ' + result.status);   // 0=Error, 1=Pass
    console.log('message : ' + result.message); // OK, NOTOK
    console.log('result : ' + result.result);   // result explanation
    $('#guidstatus').html('>> ' + result.result);
  },
  error: function (result) {
    alert('error');
  }
});

// TODO: #3 get source code
// https://api.etherscan.io/api?module=contract&action=getsourcecode&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api?';
const MODULE_GETSOURCE = 'module=contract&action=getsourcecode&address=';
const CONTRACT_ADDRESS_SAMPLE = '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413';
const API_APPENED = '&apikey=' + API_KEY;

const GET_SOURCE_URL = ETHERSCAN_API_URL + MODULE_GETSOURCE + CONTRACT_ADDRESS_SAMPLE + API_APPENED;
console.log(GET_SOURCE_URL);
