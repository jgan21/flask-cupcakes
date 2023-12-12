"use strict"

const $cupcake_list = $('#cupcake_list');
const $cupcake_form = $('#add_cupcake_form');

$cupcake_form.on('submit', handleCupcakeForm);

async function appendToList(){
  const cupcakes = await getCupcakesFromAPI();

  for(const cupcake of cupcakes){
    $cupcake_list.append(
      `<li>${cupcake}</li>` //TODO: need to update
    )
  }

}

async function getCupcakesFromAPI(){
  // get response
  // get thing from response
  // do thing with thing e.g. return / append to page
  // {cupcakes: [{cupcake1},{cupcake2}]}
  const response = await fetch('/api/cupcakes');
  const json = await response.json();

  return json.cupcakes
}

function handleCupcakeForm(){
  // do interesting things with cupcakes
}

function main(){
  appendToList();
}

