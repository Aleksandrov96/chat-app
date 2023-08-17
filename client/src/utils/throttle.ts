let waiting: boolean;

export const throttle = (func: () => void, delay: number): void => {
  if (waiting) return;

  waiting = true;

  setTimeout(() => {
    func();
    waiting = false;
  }, delay);
};
