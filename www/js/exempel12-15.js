console.log(getWholeName('Eric','Watson'))

function getWholeName(firstName, lastName){
	
}







let multiply= (x,y){
	return x*y;
}

console.log(multiply(3,3));	







//Choose your own this scope
//when calling a function by using apply (finns även call)
function exampleFunc(){
	console.log(this.firstName + ' ' + this.age);
}


exampleFunc(10,20); 
//--> 10, 20 undefined undefined

let obj = {firstname: 'Eva', age: 40}
exampleFunc.apply(obj,[15,30]);
//--> 15, 30 ... Eva 40



//Arrow functions (ES6 and forward)
//Important: Has no own this scope


//Long version (syntactically)
let divide = (x,y) => {
	return x/y;
};

//If only a one line function body
//we can omit the curly brackets
//and return

let divide2 =(x,y) => x/y;

//If we only have one argument
//we don't need to write paranthesis
let best = name =>`You're the best ${name}!`;

//Compare with
function best2(name){
	return `You're the best ${name}!`;
}

console.log(best('Anna'));
console.log(best2('Bertil'));



let persons = [
{name: 'David', age: 8},
{name: 'Erica', age: 15},
{name: 'Fredrik', age: 30}
];

function ageFilter(person){
	return person.age >=18;
} 

let adults = persons.filter(ageFilter);
console.log('adults',adults);

let adults2 = persons.filter(x=>x.age >=18);
console.log('adults2',adults2);
























