import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { I18NProvider } from 'lang/I18NProvider';
import { LOCALES } from 'lang/locales';

type Props = {
  children: React.ReactElement,
};

function AllTheProviders({ children }: Props) {
  return (
    <React.StrictMode>
      <I18NProvider locale={LOCALES.ENGLISH}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </I18NProvider>
    </React.StrictMode>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export * from '@testing-library/jest-dom';

export { customRender as render };
