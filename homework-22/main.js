'use strict';

/* Завдання 1

a) Створити клас Людина.
  Властивості:
    імʼя;
    стать.
  Методи:
    конструктор, який приймає два параметри: імʼя та стать.
*/
class Person {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }
}
/*   

b) Створити клас Квартира.
  Властивості:
    конструктор не потрібен;
    масив жителів, який при створенні пустий.
  Методи:
    додати жителя - метод повинен приймати екземпляр класу Людина, та додавати до масиву жителів.

*/
class Apartment {
  constructor() {
    this.residents = [];
  }
  
  addResident(person) {
    if (person instanceof Person) {
      this.residents.push(person);
    } 
    
    else {
      console.error('Можна додавати тільки екземпляри класу Людина');
    }
  }
}

/*  

c) Створити клас Будинок.

  Властивості:
    масив квартир, який при створенні пустий;
    максимальна кількість квартир.
  Методи:
    конструктор, який приймає один параметр: максимальну кількість квартир;
    додати квартиру - метод повинен приймати екземпляр класу Квартира, перевіряти, чи не буде кількість перевищувати максимальну кількість квартир, і якщо це так, додати квартиру, в іншому випадку виводить у консоль відповідне повідомлення.
*/
class House {
  constructor(maxApartments) {
    this.apartments = [];

    this.maxApartments = maxApartments;
  }
  
  addApartment(apartment) {
    if (apartment instanceof Apartment) {
      if (this.apartments.length < this.maxApartments) {
        this.apartments.push(apartment);
        console.log(`Квартиру додано. Загальна кількість: ${this.apartments.length}/${this.maxApartments}`);
      } 
      else {
        console.log(`Неможливо додати квартиру. Максимальна кількість квартир (${this.maxApartments}) вже досягнута.`);
      }
    } 

    else {
      console.error('Можна додавати тільки екземпляри класу Квартира');
    }
  }
}
/*  
d) В якості демонстраціїї створити:
  декілька екземплярів класу Людина;
  декілька екземплярів класу Квартира;
  додадити екземпляри класу Людина до екземплярів класу Квартира;
  екземпляр класу Будинок;
  додадити екземпляри класу Квартира до екземплярів класу Будинок.
*/
console.log('=== Демонстрація роботи системи ===\n');

const person1 = new Person('Олександр', 'чоловік');
const person2 = new Person('Марія', 'жінка');
const person3 =new Person('Іван', 'чоловік');

console.log('Створено людей:');
console.log(person1);
console.log(person2);
console.log(person3);

const apartment1 = new Apartment();
const apartment2=new Apartment();
const apartment3 = new Apartment();

console.log('\nСтворено квартири:');
console.log(apartment1);
console.log(apartment2);
console.log(apartment3);

console.log('\nДодаємо людей до квартир:');
apartment1.addResident(person1);

apartment2.addResident(person2);

apartment3.addResident(person3);


console.log('\nСтатистика по квартирам:');
console.log('Квартира 1:', apartment1.residents.map(r => r.name).join(', '));
console.log('Квартира 2:', apartment2.residents.map(r => r.name).join(', '));
console.log('Квартира 3:', apartment3.residents.map(r => r.name).join(', '));

const house= new House(2);

console.log('\nСтворено будинок з максимальною кількістю квартир = 2');

console.log('\nДодаємо квартири до будинку:');
house.addApartment(apartment1);
house.addApartment(apartment2);
house.addApartment(apartment3);

console.log('\nПідсумкова статистика:');
console.log(`У будинку ${house.apartments.length} квартири з ${house.maxApartments} можливих`);
console.log(`Загальна кількість мешканців у будинку: ${house.apartments.reduce((total, apt) => total + apt.residents.length, 0)}`);



// ==========================================================

/* Завдання 2. ЗА БАЖАННЯМ
Мережа фастфудів пропонує кілька видів гамбургерів:
  маленький (50 тугриків, 20 калорій);
  великий (100 тугриків, 40 калорій).

Гамбургер може бути з одним із декількох видів начинок:
  сиром (+ 10 тугриків, + 20 калорій);
  салатом (+ 20 тугриків, + 5 калорій);
  картоплею (+ 15 тугриків, + 10 калорій).

Можна додати добавки:
  посипати приправою (+15 тугриків, 0 калорій)
  полити майонезом (+ 20 тугриків, +5 калорій).


Напишіть програму, яка розраховує вартість та калорійність гамбургера. Використовуйте ООП підхід.

Підказка: потрібен клас Гамбургер, константи (великими літерами), методи для вибору опцій та розрахунку потрібних величин.
Все що береться від імені класу - це статичні методи або властивості.
*/

// маленький гамбургер з начинкою з сиру
// const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// // добавка з майонезу
// hamburger.addTopping(Hamburger.TOPPING_MAYO);

// // запитаємо скільки там калорій
// console.log('Calories: ', hamburger.calculate());

// // скільки коштує
// console.log('Price: ', hamburger.calculatePrice());

// // я тут передумав і вирішив додати ще приправу
// hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// // А скільки тепер коштує?
// console.log('Price with sauce: ', hamburger.calculatePrice());