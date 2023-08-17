import React, { useContext, useRef } from 'react';
import { StoresContext } from 'context/StoresContext';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { IFormValues } from 'interfaces/IFormValues';
import { ToasterContainer } from 'components/common/ToasterContainer/ToasterContainer';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'hooks/useTheme';
import LangSwitcher from 'components/common/LangSwitcher/LangSwitcher';
import ThemeSwitcher from 'components/common/ThemeSwitcher/ThemeSwitcher';
import './signUpPage.scss';

function RegisterPage() {
  const { onThemeChange } = useTheme();
  const navigate = useNavigate();
  const intl = useIntl();

  const { authStore } = useContext(StoresContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    mode: 'onChange',
  });

  const pass = useRef({});
  pass.current = watch('password', '');

  const onSubmit: SubmitHandler<IFormValues> = async ({ email, password }): Promise<void> => {
    await authStore?.signUp(email, password)
      .then((res) => {
        if (res !== null) {
          navigate('/sign-in');
        }
      });
    reset();
  };

  return (
    <div className={onThemeChange('signUpPage')} data-testid="signUp-page">
      <div className={onThemeChange('formWrapper')}>
        <form
          className="signUpForm"
          aria-label="signUp-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="errorsContainer">
            {errors.email
            && (
            <p className="errorsContainer__error">
              <FormattedMessage
                id="signUpPage-email-error"
                values={{ message: 'Email is required' }}
              />
            </p>
            )}
          </div>
          <input
            className="signUpForm__input"
            type="email"
            placeholder={intl.formatMessage({ id: 'signUpPage-email-placeholder' })}
            {...register('email', { required: true })}
          />
          <div className="errorsContainer">
            {errors.password
            && (
            <p className="errorsContainer__error">
              <FormattedMessage
                id="signUpPage-password-error"
                values={{ message: 'Password should be at least 6 characters long' }}
              />
            </p>
            )}
          </div>
          <input
            className="signUpForm__input"
            type="password"
            placeholder={intl.formatMessage({ id: 'signUpPage-password-placeholder' })}
            {...register('password', { required: true, minLength: 6, maxLength: 16 })}
          />
          <div className="errorsContainer">
            {errors.password_confirm
             && (
             <p className="errorsContainer__error">
               {intl.formatMessage({ id: 'signUpPage-confirm-error' })}
             </p>
             )}
          </div>
          <input
            className="signUpForm__input"
            type="password"
            placeholder={intl.formatMessage({ id: 'signUpPage-confirm-placeholder' })}
            {...register('password_confirm', { required: true, validate: { validate: (value) => value === pass.current } })}
          />
          <button
            className={onThemeChange('signUpForm__button')}
            type="submit"
            aria-label="signUp-submit-button"
            disabled={!isValid}
          >
            <FormattedMessage
              id="signUpPage-signUp"
              values={{ buttonText: 'sign up' }}
            />
          </button>
        </form>
        <div className="backToSignIn">
          <Link to="/sign-in">
            <FormattedMessage
              id="signUpPage-link"
              values={{ linkText: 'Back to login page' }}
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

export default observer(RegisterPage);
