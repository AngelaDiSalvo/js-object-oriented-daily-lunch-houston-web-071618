// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

let neighId = 0
class Neighborhood {
  constructor(name) {
    this.id = ++neighId
    this.name = name
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId == this.id)
  }
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId == this.id)
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal()).unique()
  }
}
let custId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++custId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId == this.id)
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }
  totalSpent() {
    let total = 0
    this.meals().forEach(meal => total += meal.price)
    return total
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId == this.id)
  }
  customers() {
    return this.deliveries().map(delivery => delivery.customer()).unique()
  }
  static byPrice() {
    return store.meals.sort((meal1, meal2) => meal1.price < meal2.price) //sortby descending
  }
}

let delId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++delId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => this.mealId == meal.id)
  }
  customer() {
    return store.customers.find(customer => this.customerId == customer.id)
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => this.neighborhoodId == neighborhood.id)
  }
}
