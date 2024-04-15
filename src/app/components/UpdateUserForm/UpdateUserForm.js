import { useState } from 'react';
import { useUpdate } from '../../hooks/useUpdate';

export default function UpdateUserForm() {
  const API = 'http://localhost:3000/';

  // UPDATE/PUT form input state
  const [updateId, setUpdateId] = useState('');
  const [updateFirstname, setUpdateFirstname] = useState('');
  const [updateLastname, setUpdateLastname] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [originalemail, setOriginalemail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');

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

  const [updateUserMessage, setUpdateUserMessage] = useToggleMessage();
  const { updateRequest } = useUpdate();

  const handleUpdateForm = async (e) => {
    e.preventDefault();

    if (
      updateId === '' ||
      updateFirstname === '' ||
      updateLastname === '' ||
      originalemail === '' ||
      updateEmail === '' ||
      updatePassword === ''
    ) {
      console.log('The form needs all fields to be filled in');
    } else {
      try {
        const user = {
          id: updateId,
          firstname: updateFirstname,
          lastname: updateLastname,
          originalEmail: originalemail,
          email: updateEmail,
          password: updatePassword,
        };

        console.log(`User: ${user}`);
        // UPDATE Route
        updateRequest(`${API}/api/updateuser`, user);

        setUpdateId('');
        setUpdateFirstname('');
        setUpdateLastname('');
        setOriginalemail('');
        setUpdateEmail('');
        setUpdatePassword('');

        setUpdateUserMessage();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded drop-shadow-md mb-4 mt-4">
      <h1 className="text-2xl mb-4">UPDATE User</h1>
      <form onSubmit={(e) => handleUpdateForm(e)}>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">ID</label>
          <input
            type="text"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Firstname</label>
          <input
            type="text"
            value={updateFirstname}
            onChange={(e) => setUpdateFirstname(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>

        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Lastname</label>
          <input
            type="text"
            value={updateLastname}
            onChange={(e) => setUpdateLastname(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">
            Original Email
          </label>
          <input
            type="email"
            value={originalemail}
            onChange={(e) => setOriginalemail(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Email</label>
          <input
            type="email"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div className="flex flex-wrap items-center mb-2">
          <label className="p-2 w-36 border-solid border-2">Password</label>
          <input
            type="password"
            value={updatePassword}
            onChange={(e) => setUpdatePassword(e.target.value)}
            className="grow p-2 border border-2"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-slate-600 hover:bg-slate-400 p-2 text-white cursor-pointer font-bold rounded-lg"
          >
            Update User
          </button>
        </div>
        <div>
          <p className={`bg-amber-100 p-2 mt-4 rounded ${updateUserMessage}`}>
            User updated
          </p>
        </div>
      </form>
    </div>
  );
}
