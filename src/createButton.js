export const createButton = (text, clickHandler) => {
  const button = document.createElement('BUTTON');
  button.classList.add('text-sm', 'bg-gray-200', 'hover:bg-gray-300', 'text-gray-800', 'font-semibold', 'py-2', 'px-4', 'rounded', 'mx-2');
  button.innerText = text;
  button.addEventListener('click', clickHandler);
  return button;
}