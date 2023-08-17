import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormValues } from 'interfaces/IFormValues';
import { observer } from 'mobx-react-lite';
import { ToasterContainer } from 'components/common/ToasterContainer/ToasterContainer';
import { FormattedMessage, useIntl } from 'react-intl';
import LangSwitcher from 'components/common/LangSwitcher/LangSwitcher';
import { useTheme } from 'hooks/useTheme';
import './signInPage.scss';
import ThemeSwitcher from 'components/common/ThemeSwitcher/ThemeSwitcher';

function SignInPage() {
  const { onThemeChange } = useTheme();
  const navigate = useNavigate();
  const intl = useIntl();

  const { authStore } = useContext(StoresContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormValues> = async ({ email, password }): Promise<void> => {
    await authStore?.signIn(email, password);
    if (authStore?.isAuth) {
      navigate('/');
    }
  };

  return (
    <div className={onThemeChange('signInPage')} data-testid="signIn-page">
      <div className={onThemeChange('formWrapper')}>
        <form
          className="signInForm"
          onSubmit={handleSubmit(onSubmit)}
          aria-label="signIn-form"
        >
          <div className="errorsContainer">
            {errors.email
            && (
            <p className="errorsContainer__error">
              <FormattedMessage
                id="signInPage-email-error"
                values={{ message: 'Email is required' }}
              />
            </p>
            )}
          </div>
          <input
            className="signInForm__input"
            type="email"
            placeholder={intl.formatMessage({ id: 'signInPage-email-placeholder' })}
            {...register('email', { required: true })}
          />
          <div className="errorsContainer">
            {errors.password
             && (
             <p className="errorsContainer__error">
               <FormattedMessage
                 id="signInPage-password-error"
                 values={{ message: 'Password should be at least 6 characters long' }}
               />
             </p>
             )}
          </div>
          <input
            className="signInForm__input"
            type="password"
            placeholder={intl.formatMessage({ id: 'signInPage-password-placeholder' })}
            {...register('password', { required: true, minLength: 3, maxLength: 16 })}
          />
          <button
            className={onThemeChange('signInForm__button')}
            type="submit"
            aria-label="signIn-submit-button"
            disabled={!isValid}
          >
            <FormattedMessage
              id="signInPage-signIn"
              values={{ buttonText: 'sign in' }}
            />
          </button>
        </form>
        <div className={onThemeChange('signUp')}>
          <FormattedMessage
            id="signInPage-link-description"
            values={{ description: 'Don\'t have an account yet? ' }}
          />
          <Link to="/sign-up">
            <FormattedMessage
              id="signInPage-link"
              values={{ linkText: 'Sign up now' }}
            />
          </Link>
        </div>
      </div>
      <div className={onThemeChange('switchers')}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
      <ToasterContainer />
    </div>
  );
}

export default observer(SignInPage);
