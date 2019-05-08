/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. The global or window execution context which is the environment that runs the code and stores the global variables. That is the value of this in global scope.
* 2. Implicit binding using dot(.) notation. The 'this' in this instance refers to the object or function before the this.
* 3. Binding using the new keyword. When a constructor function is used to create an object the 'this' refers to the object returned.
* 4. Binding using the call and apply methods. This methods invoke the function they are called on and set the value of 'this' to the first argument passed.
*
* write out a code example of each explanation above
*/


// Principle 1
// code example for Window Binding
function printGlobalThis() {
  console.log(this);
}
printGlobalThis();


// Principle 2
// code example for Implicit Binding
const lambdaObject = {
  class: 'WEB2EU',
  printClass() {
    console.log(`This is the ${this.class} class.`)
  }
}
lambdaObject.printClass();


// Principle 3
// code example for New Binding
function CreateAccount(name, balance) {
  this.name = name;
  this.balance = balance;
}

CreateAccount.prototype.deposit = function (amount) {
  this.balance += amount;
  console.log(`New balance is: $${this.balance}`);
}

const myAccount = new CreateAccount('Oyekunle', 500);
myAccount.deposit(50);


// Principle 4
// code example for Explicit Binding
const depositAmount = myAccount.deposit;
depositAmount.call(myAccount, 50);