export function findAdviserNameById(advisers = [], id) {
    return advisers.filter((adviser) => adviser._id == id).length !== 0 ? advisers.filter((adviser) => adviser._id == id)[0].tradename  : ''
  }

export function findProductNameById(products = [], id) {
  return products.filter((product) => product._id == id).length !== 0 ? products.filter((product) => product._id == id)[0].name  : ''
}