let timerId = null;
export function debounce(func, delay = 100) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    func();
  }, delay);
}
