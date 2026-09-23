/*=====================THROTTLE=======================*/

const inputElement = document.querySelector("#cityName");

inputElement.addEventListener('input', (event) => {
    console.log(`Received ${event}`, event.target.value);

})

function throttle(fn, delay) {
    let lastCall = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    }
}

const mouseHandler = (event) => {
    console.log(`ClientX: ${event.clientX}    ClientY: ${event.clientY}`)
}

const mouseThrottled = throttle(mouseHandler, 300);

window.addEventListener('mousemove', mouseThrottled)