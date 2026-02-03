'use strict';

/*
 * #1
 *
 * Задача: Створення та додавання DOM-елемента до вказаного контейнера
 * Мета: Розробити функцію createDomElement, яка приймає назву тега, текстовий вміст та контейнер, до якого потрібно додати новий елемент. Функція створює новий елемент з вказаним тегом та текстовим вмістом і додає цей елемент до заданого контейнера.
 *
 * Вимоги:
 * 1. Функція має приймати три параметри:
 *    - tagName - рядок, що вказує на назву тега нового елемента.
 *    - textContent - рядок, що вказує на текстовий вміст нового елемента.
 *    - container - DOM-елемент, до якого буде додано новий створений елемент.
 * 2. Функція має створити новий DOM-елемент з вказаним тегом і текстовим вмістом.
 * 3. Створений елемент має бути доданий до вказаного контейнера.
 * 4. Функція повертає посилання на створений елемент, що дозволяє подальшу взаємодію з ним.
 */

function createDomElement(tagName,textContent, container) {

    const element = document.createElement(tagName);
    element.textContent = textContent;
    
    container.appendChild(element);
    
    return element;
}

// Демонстрація використання функції
const container = document.body // В якості прикладу використовуємо body як контейнер
console.log(createDomElement('p',' This paragraph has been added to the specified container.', container))

/*
 * #2
 *
 * Задача: Робота з localStorage для зберігання та отримання даних користувача
 * Мета: Створити дві функції, saveUserInfo і getUserInfo, для взаємодії з localStorage.
 * Перша функція повинна зберігати інформацію про користувача, а друга - отримувати її.
 * Крім того, обидві функції повинні виводити відповідні повідомлення у консоль про успішне збереження або отримання даних.
 *
 * Вимоги до saveUserInfo:
 *
 * 1. Функція приймає два параметри: ключ (key) та значення (value).
 * 2. Зберігає пару ключ-значення в localStorage.
 * 3. Виводить у консоль повідомлення формату "Saved key: value".
 * 4. Обʼєкти теж мають підтримуватися
 *
 * Вимоги до getUserInfo:
 *
 * 1. Функція приймає один параметр: ключ (key).
 * 2. Отримує значення за вказаним ключем з localStorage.
 * 3. Виводить у консоль повідомлення формату "Retrieved key: value", де value - це значення, отримане з localStorage.
 * 4. Повертає значення отримане з localStorage.
 * 5. Якщо це обʼєкт, повернути його обʼєктом
 */

function saveUserInfo(key, value)
{
    const valueToStore = 
    typeof value === 'object' ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
    console.log(`Saved ${key}: ${value}`);

}

function getUserInfo(key) {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
        console.log(`Key ${key} not found in LocalStorage`);
        return null;
    }

    try {

        const paresedValue = JSON.parse(storedValue);

        console.log(`Retrieved ${key}:, paresedValue`);
        return paresedValue;
    } catch (error) {

        console.log(`Retrieved ${key}: ${storedValue}`);
        return storedValue;
    }
}

// Демонстрація використання функцій
saveUserInfo('username', 'JohnDoe');
console.log(getUserInfo('username')); // Виведе: JohnDoe