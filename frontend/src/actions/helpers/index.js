//Funciones para buscar informacion dentro de los reducers
//Se pueden crear funciones de acuerdo a las necesidades, en este caso obtenermos el nombre del provedor apartir del Id
//ademas de la funcion para obtener el nombre y el precio de los productos apartir del id
export function findAdviserNameById(advisers = [], id) {
    return advisers.filter((adviser) => adviser._id == id).length !== 0 ? advisers.filter((adviser) => adviser._id == id)[0].tradename  : ''
  }

export function findProductNameById(products = [], id) {
  return products.filter((product) => product._id == id).length !== 0 ? products.filter((product) => product._id == id)[0].name  : ''
}

export function findProductPriceById(products = [], id) {
  return products.filter((product) => product._id == id).length !== 0 ? products.filter((product) => product._id == id)[0].price  : ''
}