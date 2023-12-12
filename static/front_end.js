"use strict";

const $cupcake_list = $('#cupcake_list'); //#FIXME: no underscores in names!
const $cupcake_form = $('#add_cupcake_form');

$cupcake_form.on('submit', handleCupcakeForm);

/**
 * Gets list of cupcakes
 * Adds cupcakes to HTML list on page
 */
async function appendToList() { //FIXME: not really a good name, doing much more than adding one
  $cupcake_list.empty(); //FIXME: probably belongs in appendToList()
  const cupcakes = await getCupcakesFromAPI(); //this creates the time for the browser to repaint

  for (const cupcake of cupcakes) {
    $cupcake_list.append(
      `<li>${cupcake.flavor},${cupcake.rating},//FIXME: literally including a new line char
      ${cupcake.size}, ${cupcake.image_url}</li>` //TODO: need to update - literally includes spaces
    );
  }
}

/**
 * Gets cupcakes from API and
 *
 * RETURNS:
 *  [{flavor:'bad',size: 'small', rating: 50, image_url = ''}, ...]
 *
 */
async function getCupcakesFromAPI() {
  // get response
  // get thing from response
  // do thing with thing e.g. return / append to page
  // {cupcakes: [{cupcake1},{cupcake2}]}
  const response = await fetch('/api/cupcakes');
  const json = await response.json(); //FIXME: not json! (var name) >> cupcake data

  return json.cupcakes;
}

/** Handle cupcake form
 *
 * Get form submit values, sends to API, recreates the list on the page
 *
 */
async function handleCupcakeForm(evt) {
  // do interesting things with cupcakes
  evt.preventDefault();

  let flavor = $('#flavor').val();
  let size = $('#size').val();
  let rating = $('#rating').val();
  let image_url = $('#image_url').val();

  //not a great var name, doesn't match the api response, and probably not even needed
  const newCupcakeData = sendNewCupcake(flavor, size, rating, image_url);
  //hacky af


  await appendToList();

  // $cupcake_list.append(
  //   `<li>${newCupcakeData.flavor},${newCupcakeData.rating},
  //   ${newCupcakeData.size}, ${newCupcakeData.image_url}</li>`);
}

/**
 * Sends new cupcake to API
 * @param {*} flavor //value in asterisk is meant to specify the type, but makes documentation discrepancies sometimes
 * @param {*} size
 * @param {*} rating
 * @param {*} image_url
 * @returns {cupcake: {...}}
 */
async function sendNewCupcake(flavor, size, rating, image_url) {
  const response = await fetch('/api/cupcakes', {
    method: "POST",
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
  return await response.json();
}

async function main() {
  await appendToList();
}

main();
