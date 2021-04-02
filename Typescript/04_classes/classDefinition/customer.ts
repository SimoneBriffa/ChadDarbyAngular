class Customer{

    private firstName: string;
    private lastName: string;

    constructor(theFirst: string, theLast: string){
        this.firstName = theFirst;
        this.lastName = theLast;
    }

    public getFirstName(){
        return this.firstName;
    }

    public getLastName(){
        return this.lastName;
    }

}

let myCustomer = new Customer("Simone", "Briffa");

/*

myCustomer.firstName = "Simone";
myCustomer.lastName = "Briffa";

*/

console.log(myCustomer.getFirstName + " " + myCustomer.getLastName);




