import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from '../../containers/HomePage/saga';
import reducer from '../../containers/HomePage/reducer';
import history from '../../utils/history';
import { getResponseCode } from '../../containers/HomePage/actions';

const key = 'home';

function MainButton({ text, page, onResetCode }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleChangePage = () => {
    if (page !== undefined) {
      history.push(`${page}`);
    }
    onResetCode('');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleChangePage}
      type="submit"
    >
      {text}
    </Button>
  );
}

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onResetCode: PropTypes.func.isRequired,
  page: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    onResetCode: () => dispatch(getResponseCode()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MainButton);
