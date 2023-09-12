import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Styling/register.scss';
import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
//import axios from 'axios';
//import { Alert } from '@mui/material';

// import { useNavigate } from 'react-router-dom';
const Register = () => {
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (userName.length < 6 || userName.length > 20) {
      errors.username = 'Username must be between 6 and 20 characters';
      setValidationErrors(errors); // set validation errors state
      console.log(setValidationErrors(errors));
      toast.error('Username must be between 6 and 20 characters', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!password.match(/^(?=.*[\W_])[a-zA-Z0-9\W_]{6,20}$/)) {
      errors.password =
        'Password must be 6-20 characters long and contains a special character.';
      toast.error(errors.password, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Please enter a valid email address';
      toast.error(errors.email, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!isChecked) {
      toast.error(
        'Please agree to the Privacy Policy before submitting the form.',
        {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        }
      );
      return;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Invalid Input', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success('created account successfully 🚀👏', {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log('created account successful');
      history.push('/login');
    }

    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append('username', userName);
      formData.append('password', password);
      formData.append('email', email);
      //formData.append('profile_picture', image);

      // change this to if statement
      if (image) {
        formData.append('profile_picture', image);
      }
      console.log('This is image: ' + image);

      registerUser(formData)
        .then((userData) => {
          console.log('DATA: ', userData);
        })
        .catch((error) => {
          console.log('ERROR: ', error.message);
        });
    } catch (error) {
      console.log('Error message: ' + error.message);
    }
  };

  const registerUser = async (formData) => {
    try {
      console.log("this is register: " + JSON.stringify(formData));
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/register`,
        {
          method: 'POST',
          body: formData,
        }
      );

      // check if email has been used
      if (response.status === 409) {
        console.log('Email already exists');
        toast.error('Email already exists', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (!response.ok) {
        console.log('response not ok');
        toast.error('Register account failed!', {
          position: toast.POSITION.TOP_CENTER,
        });
        throw new Error('Response ERROR');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error('Register account failed!', {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error('Error while registering user:', error.message);
      throw error;
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <Link className="welcome" to="/">
            <h1> Welcome to RecipeReel</h1>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="profile-image">
              {image === null ? (
                <div className="default-image">
                  <i className="fa fa-user-circle" aria-hidden="true" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <span>Upload your profile</span>
                </div>
              ) : (
                <img src={URL.createObjectURL(image)} alt="Uploaded profile" />
              )}
            </div>
            <input
              type="text"
              placeholder="Username"
              required={true}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                border: validationErrors.username ? '1px solid green' : '',
              }}
              id="userName"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />

            <input
              type="email"
              placeholder="Email@address.com"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            <label className="policy" for="privacy-policy-checkbox">
              I have read and agree to the{' '}
              <a
                href="https://www.privacypolicyonline.com/live.php?token=CiQ7ixos7r4B0wegGXibJXuVU9qQoeWu"
                target="blank"
              >
                Privacy Policy
              </a>
              <input
                type="checkbox"
                id="privacy-policy-checkbox"
                name="privacy-policy-checkbox"
                required={true}
                onChange={(e) => setIsChecked(true)}
              />
            </label>
            <button className="submitBtn" onClick={handleSubmit}>
              Register
            </button>
            <Link className="account" to="/login">
              <p> Already have an account?</p>
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
