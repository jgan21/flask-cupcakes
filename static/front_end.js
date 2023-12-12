"use strict";

const $cupcake_list = $('#cupcake_list');
const $cupcake_form = $('#add_cupcake_form');

$cupcake_form.on('submit', handleCupcakeForm);

async function appendToList() {
  const cupcakes = await getCupcakesFromAPI();

  for (const cupcake of cupcakes) {
    $cupcake_list.append(
      `<li>${cupcake.flavor},${cupcake.rating},
      ${cupcake.size}, ${cupcake.image_url}</li>` //TODO: need to update
    );
  }
}

async function getCupcakesFromAPI() {
  // get response
  // get thing from response
  // do thing with thing e.g. return / append to page
  // {cupcakes: [{cupcake1},{cupcake2}]}
  const response = await fetch('/api/cupcakes');
  const json = await response.json();

  return json.cupcakes;
}

/** Handle cupcake form */
async function handleCupcakeForm(evt) {
  // do interesting things with cupcakes
  evt.preventDefault();

  let flavor = $('#flavor').val();
  let size = $('#size').val();
  let rating = $('#rating').val();
  let image_url = $('#image_url').val();

  const response = await fetch('/api/cupcakes',
    {method : "POST",
    body: JSON.stringify({
      flavor,
      rating,
      size,
      image_url
    }),
    headers: {
    "Content-Type": "application/json",
  }
});

  const newCupcakeData = await response.json()

  $cupcake_list.append(
    `<li>${newCupcakeData.flavor},${newCupcakeData.rating},
    ${newCupcakeData.size}, ${newCupcakeData.image_url}</li>`)
}

function main() {
  appendToList();
}

main()
