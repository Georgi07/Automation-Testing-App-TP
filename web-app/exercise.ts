// Exercise One
// Step One: Declare Typescript interface "Country"
// and add types name: string, capital: string, population: number, language: string

interface Country {
  name: string;
  capital: string | "Sofia";
  population: number;
  language: string;
}

// Step Two: Declare an object "country" with properties following "Country" interface

const firstCountry: Country = {
  name: "Bulgaria",
  capital: "Sofia",
  language: "bulgarian",
  population: 7000000,
};

const secondCountry: Country = {
  name: "Italy",
  capital: "Rome",
  language: "italian",
  population: 59000000,
};

// Step Three: Declare a function "displayCountryDetails" which receives "country" object and
//displays the details for it

function displayCountryDetails(countryObj: Country): string {
  return `The capital of ${countryObj.name} is ${countryObj.capital}. The official language is ${countryObj.language} and population of ${countryObj.population} people.`;
}

const detailsAboutBulgaria = displayCountryDetails(firstCountry);
const detailsAboutItaly = displayCountryDetails(secondCountry);

// console.log(detailsAboutBulgaria, "\n", detailsAboutItaly);

//

// Exercise Two
// Step One: Declare TypeScript interface "Student"
// Add propertis id: number, name: string, age: number, grade: number

interface Student {
  id: number;
  name: string;
  age: number;
  grade: number;
}

// Step Two: Declare an object with properties following interface "Student"

const studentOne: Student = { id: 1, name: "Pesho", age: 20, grade: 6 };
const studentTwo: Student = { id: 2, name: "Tosho", age: 22, grade: 5 };
const studentThree: Student = { id: 3, name: "Ivan", age: 25, grade: 5 };

// Step Three: Declare array "students" with objects of type "Student"
let studentsArr: Student[] = [studentOne, studentTwo, studentThree];

// Step Four: Declare a function "getStudents" and pass the array students as parameter
// return only students name as a result

function getStudents(students: Student[]): string[] {
  return students.map((student) => student.name);
}

const studentsNames = getStudents(studentsArr);
console.log("studentsNames", studentsNames);

//

//Exercise Three
// Declare a function "sortStudents" that receive students array result from the previous exercise
// and sort them by ascending
