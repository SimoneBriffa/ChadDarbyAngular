var Customer = /** @class */ (function () {
    function Customer(theFirst, theLast) {
        this.firstName = theFirst;
        this.lastName = theLast;
    }
    return Customer;
}());
var myCustomer = new Customer("Simone", "Briffa");
/*

myCustomer.firstName = "Simone";
myCustomer.lastName = "Briffa";

*/
console.log(myCustomer.firstName + " " + myCustomer.lastName);
