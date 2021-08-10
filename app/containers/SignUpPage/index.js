import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from '../HomePage/saga';
import reducer from '../HomePage/reducer';
import { submitForm } from '../HomePage/actions';
import { makeSelectCode } from '../HomePage/selectors';
import MainButton from '../../components/MainButton/Loadable';
import SubmitForm from '../../components/SubmitForm/Loadable';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '30%',
    margin: '0 auto',
    paddingTop: 150,
  },
  button: {
    marginTop: 10,
  },
  textError: {
    textAlign: 'center',
    color: 'red',
  },
  textAccess: {
    textAlign: 'center',
    color: 'green',
    fontSize: 23,
  },
}));

const key = 'home';

export function SignUpPage({ onSubmitForm, resCode }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        {resCode && resCode === 204 ? (
          <>
            <p className={classes.textAccess}>Регистрация прошла успешно!</p>
            <MainButton text="To main page" page="/" />
          </>
        ) : (
          <>
            <SubmitForm onSubmitForm={onSubmitForm} authKind="signUp" />
            {resCode && resCode === 400 && (
              <p className={classes.textError}>Неправильный логин или пароль</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
}

SignUpPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  resCode: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  resCode: makeSelectCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (submitKind, login, password, mail) =>
      dispatch(submitForm(submitKind, login, password, mail)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignUpPage);
