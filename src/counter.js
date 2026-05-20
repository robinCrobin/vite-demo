import { increment } from './utils.js';

export function setupCounter(element) {
  let count = 0;
  const button = document.createElement('button');

  const render = () => {
    button.textContent = `contador: ${count}`;
  };

  button.addEventListener('click', () => {
    count = increment(count);
    render();
  });

  render();
  element.appendChild(button);
}
