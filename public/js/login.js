// disable es-lint
import axios from 'axios';

export const login = async (username, password) => {
  try {
    console.log('asdsad');
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        username,
        password,
      },
    });
    if (res.data.status === 'success') {
      alert('login successfully');
      location.assign('/');
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      alert('logout successfull');
      location.assign('/login');
    }
  } catch (err) {
    console.log(err);
    alert('error', 'Error logging out! try Again');
  }
};
