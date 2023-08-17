export function mockIntersectionObserver(): void {
  window.HTMLElement.prototype.scrollIntoView = () => {};
  const intersectionObserverMock = jest.fn();
  intersectionObserverMock.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = intersectionObserverMock;
}
