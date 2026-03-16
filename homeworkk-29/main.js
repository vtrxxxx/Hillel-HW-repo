// Завдання #1
// Напишіть функцію ageClassification, яка приймає один аргумент num — вік людини (число).
// Напишіть для неї тести. Протестуйте не тільки правильні варіанти
//
// Функція повинна повертати рядок з назвою вікової категорії відповідно до таких умов:
// меньше 0 - null
// від 0 до 24 - "Дитинство"
// від 25 до 44 - "Молодість"
// від 45 до 65 - "Зрілість"
// від 66 до 75 - "Старість"
// від 76 до 90 - "Довголіття"
// від 91 до 122 - "Рекорд"
// більше 122 - "Неможливо"

export function ageClassification(num) {
    if (num === undefined) {
        return null;
    }
    if (typeof num !== 'number' || Number.isNaN(num)) {
        return NaN;
    }
    if (num < 0) {
        return null;
    }

    if (num >= 0 && num < 25) {
        return 'Дитинство';
    }
    else if (num >= 25 && num < 45) {
        return 'Молодість';
    }
    else if (num >= 45 && num < 66) {
        return 'Зрілість';
    }
    else if (num >= 66 && num < 76) {
        return 'Старість';
    }
    else if (num >= 76 && num < 91) {
        return 'Довголіття';
    }
    else if (num >= 91 && num < 123) {
        return 'Рекорд';
    }
    else {
        return 'Неможливо';
    }


}

// Завдання #2
// Напишіть функцію getWeekDay, яка приймає один аргумент num — порядок дня тижня. 1 - Понеділок, 7 - Неділя
// І повертає назву дня українською
// Напишіть для неї тести. Протестуйте не тільки правильні варіанти

// 1 - 'Понеділок'
// 2 - 'Вівторок'
// 3 - 'Середа'
// 4 - 'Четвер'
// 5 - 'Пʼятниця'
// 6 - 'Субота'
// 7 - 'Неділя'
// Усе інше - null+

export function getWeekDay(num) {
    if (num === undefined) {
        return null;
    }
    if (typeof num !== 'number' || Number.isNaN(num)) {
        return null;
    }
    if (num < 0 || num > 7) {
        return null;
    }

    switch (num) {
        case 1:
            return 'Понеділок';
        case 2:
            return 'Вівторок';
        case 3:
            return 'Середа';
        case 4:
            return 'Четвер';
        case 5:
            return 'Пʼятниця';
        case 6:
            return 'Субота';
        case 7:
            return 'Неділя';
    }
}

