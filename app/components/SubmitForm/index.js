import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    marginTop: 10,
  },
}));

function SubmitForm({ onSubmitForm, authKind }) {
  const classes = useStyles();

  const validationSchema = yup.object({
    login: yup
      .string('Enter your login')
      .min(4, 'Password should be of minimum 8 characters length')
      .required('login is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    ...(authKind !== 'signIn' && {
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    }),
  });
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      email: '',
    },
    validationSchema,
    onSubmit: values => {
      onSubmitForm(
        authKind === 'signIn' ? 'login' : 'register',
        values.login,
        values.password,
        values.email,
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="login"
        name="login"
        label="Login"
        value={formik.values.login}
        onChange={formik.handleChange}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      {authKind !== 'signIn' && (
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      )}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
}

SubmitForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  authKind: PropTypes.string.isRequired,
};

export default memo(SubmitForm);
