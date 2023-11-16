import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.getElementById('promiseForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const delay = parseInt(form.elements.delay.value, 10);
  const step = parseInt(form.elements.step.value, 10);
  const amount = parseInt(form.elements.amount.value, 10);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const currentDelay = delay + (i - 1) * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}