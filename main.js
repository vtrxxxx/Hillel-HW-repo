console.log('#11. JavaScript homework example file')

/*
 * #1
 *
 * Написати функцію, яка приймає рядок як вхідний параметр і перевіряє, чи є цей рядок валідною електронною адресою за допомогою регулярного виразу.
 * Функція повертає true, якщо електронна адреса валідна, і false в іншому випадку.
 *
 */

export function isValidEmail(email) {
  const regExpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailCheck = regExpEmail.test(email);
  return emailCheck;
}

console.log(isValidEmail('example@example.com')) // Повинно вивести: true
console.log(isValidEmail('invalid-email'))       // Повинно вивести: false

/*
 * #2
 *
 * Написати функцію, яка приймає рядок як вхідний параметр і перевіряє, чи є цей рядок валідним URL веб-сайту за допомогою регулярного виразу.
 * Функція повертає true, якщо URL валідний, і false в іншому випадку.
 *
 */

/*

*/

export function isValidUrl(url) {
  const urlExpEmail = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
  let urlCheck = urlExpEmail.test(url);
  return urlCheck;
}

console.log(isValidUrl('https://www.example.com.ua')) // Повинно вивести: true
console.log(isValidUrl('invalid-url'))             // Повинно вивести: false
