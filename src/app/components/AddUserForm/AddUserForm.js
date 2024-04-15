import { useState } from 'react';
import { usePost } from '../../hooks/usePost';

export default function AddUserForm() {
  const API = 'http://localhost:3000/';

  // POST form input state
  const [firstname, setFirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePostForm = async (e) => {
    e.preventDefault();

    if (
      firstname === '' ||
      lastname === '' ||
      email === '' ||
      password === ''
    ) {
      console.log('The form needs all fields to be filled in');
    } else {
      try {
        const user = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        };
        // POST Route
        postRequest(`${API}/api/postuser`, user);
        console.log(`User ${user}`);
        setFirstname('');
        setlastname('');
        setEmail('');
        setPassword('');

        setAddUserMessage();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // CRUD message box state
  const useToggleMessage = (initialState = 'hidden') => {
    const [message, setMessage] = useState(initialState);

    const toggleMessage = () => {
      setMessage('');

      setTimeout(() => {
        setMessage('hidden');
      }, 3000);
    };

    return [message, toggleMessage];
  };

  const [addUserMessage, setAddUserMessage] = useToggleMessage();
  const { postRequest } = usePost();

  return (
    <div className="bg-white p-4 rounded drop-shadow-md">
      <h1 className="text-2xl mb-4">ADD User</h1>
      <form onSubmit={(e) => handlePostForm(e)}>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Firstname</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>

        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Lastname</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-slate-600 hover:bg-slate-400 p-2 text-white cursor-pointer font-bold rounded-lg"
          >
            Add User
          </button>
        </div>
        <div>
          <p className={`bg-amber-100 p-2 mt-4 rounded ${addUserMessage}`}>
            User added
          </p>
        </div>
      </form>
    </div>
  );
}
