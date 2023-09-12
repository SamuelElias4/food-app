import React from 'react';
import './Styling/login.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
// import 'toast-emoji';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const history = useHistory();
  const { setLoggedIn } = useContext(AuthContext);

  const loginHandler = (e) => {
    e.preventDefault();

    // Perform validation
    if (email.trim() === '') {
      toast.error('Please enter your email! ', {
        position: toast.POSITION.TOP_CENTER,
        duration: 3000, // 3s
      });
      console.log('Please enter your email');
      return;
    }

    if (password.trim() === '') {
      toast.error('Please enter your password! ', {
        position: toast.POSITION.TOP_CENTER,
        duration: 3000, // 3s
      });
      console.log('Please enter your password!');
      return;
    }

    //set request to backend
    fetch(`${process.env.REACT_APP_REQ_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('userId', data.user.id)

        setLoggedIn(true);
        toast.success('Logged in successfully!😄🚀🙌', {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push('/');
        //  console.log(data);
      })
      .catch((error) => {
        // Handle login error
        toast.error('There was a problem with login!🚫', {
          position: toast.POSITION.TOP_CENTER,
        });
        console.error('There was a problem with the login:', error);
      });
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Recipe Reel</h1>
          <span>
            Cooking is more than just preparing food
            <br />
            Sharing a meal with others
            <br />
            Building a healthier and happier lifestyle
            <br />
            <br />
          </span>
          <br />
          <span>
            <br />
          </span>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={loginHandler}>Login </button>
            <p>
              New to RecipeReel?
              <Link to="/register"> Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
