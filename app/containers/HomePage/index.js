import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import MainButton from '../../components/MainButton/Loadable';
import reducer from './reducer';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 250,
  },
  title: {
    textAlign: 'center',
    fontSize: 23,
  },
  btns: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: 350,
    margin: '15px auto',
  },
}));

const key = 'home';

export function HomePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <div className={classes.title}>Авторизуйтесь или зарегистрируйтесь</div>
        <div className={classes.btns}>
          <MainButton text="Sign In" page="/sign_in" />
          <MainButton text="Sign Up" page="/sign_up" />
        </div>
      </div>
    </Container>
  );
}

const withConnect = connect(
  null,
  null,
);

export default compose(withConnect)(HomePage);
