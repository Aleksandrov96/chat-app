import { throttle } from 'utils/throttle';

jest.useFakeTimers();

describe('throttle', () => {
  const delay = 1000;

  it(`calls the callback after ${delay} second`, () => {
    const callback = jest.fn();

    throttle(callback, delay);
    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
