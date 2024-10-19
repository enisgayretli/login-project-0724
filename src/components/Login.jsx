import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
  terms: 'Terms kabul edilmek zorundadir',
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;

    if (name === 'email') {
      setErrors({ ...errors, [name]: !validateEmail(value) });
    }

    if (name === 'password') {
      setErrors({ ...errors, [name]: !(value.length > 5) });
    }

    if (name === 'terms') {
      setErrors({ ...errors, [name]: !value });
    }

    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (validateEmail(form.email) && form.password.length > 4 && form.terms) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/main');
        } else {
          history.push('/error');
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
        />
        {errors.terms && <FormFeedback>{errorMessages.terms}</FormFeedback>}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
