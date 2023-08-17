import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './locales';
import messages from './messages';

type Props = {
  children: React.ReactElement | JSX.Element | JSX.Element[] | null,
  locale: string,
};

export function I18NProvider({ children, locale = LOCALES.ENGLISH }: Props) {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
}
