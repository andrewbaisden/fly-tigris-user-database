'use client';
import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { usePost } from './hooks/usePost';
import { useUpdate } from './hooks/useUpdate';
import { useDelete } from './hooks/useDelete';

export default function Home() {
  // GET API HOST URL
  // Example fly.io online: https://fly-your-app-online.fly.dev/
  // Local version: http://localhost:3000/
  const API = 'http://localhost:3000/';

  // POST form input state
  const [firstname, setFirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UPDATE/PUT form input state
  const [updateId, setUpdateId] = useState('');
  const [updateFirstname, setUpdateFirstname] = useState('');
  const [updateLastname, setUpdateLastname] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [originalemail, setOriginalemail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');

  // DELETE form input state
  const [deleteId, setDeleteId] = useState('');

  // GET Route
  const { data, error, isLoading } = useFetch(`${API}/api/getusers`);
  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;

  useEffect(() => {
    console.log('Client API GET Data:', data);
  }, [data]);

  const { postRequest } = usePost();
  const { updateRequest } = useUpdate();
  const { deleteRequest } = useDelete();

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
  const [updateUserMessage, setUpdateUserMessage] = useToggleMessage();
  const [deleteUserMessage, setDeleteUserMessage] = useToggleMessage();

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

  const handleDeleteForm = async (e) => {
    e.preventDefault();
    if (deleteId === '') {
      console.log('Form needs an id to be submitted');
    } else {
      try {
        const userId = {
          id: deleteId,
        };

        console.log('User ID', userId);
        // DELETE Route
        deleteRequest(`${API}/api/deleteuser`, userId);
        console.log(`User ${deleteId} deleted`);
        console.log(`UserId ${userId}`);
        setDeleteId('');

        setDeleteUserMessage();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-4xl mb-2 text-center uppercase">User Database</h1>
      <div className="bg-gray-900 text-white p-4 rounded flex justify-center">
        <table className="table-auto border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600 p-2 text-2xl">ID</th>
              <th className="border border-slate-600 p-2 text-2xl">
                Firstname
              </th>
              <th className="border border-slate-600 p-2 text-2xl">Lastname</th>
              <th className="border border-slate-600 p-2 text-2xl">Email</th>
            </tr>
          </thead>

          {data === 0 ? (
            <tbody></tbody>
          ) : (
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td className="border border-slate-600 p-2 bg-gray-800 hover:bg-gray-600">
                    {user.id}
                  </td>
                  <td className="border border-slate-600 p-2 bg-gray-800 hover:bg-gray-600">
                    {user.firstname}
                  </td>
                  <td className="border border-slate-600 p-2 bg-gray-800 hover:bg-gray-600">
                    {user.lastname}
                  </td>
                  <td className="border border-slate-600 p-2 bg-gray-800 hover:bg-gray-600">
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="bg-slate-100 rounded p-10 drop-shadow-lg">
        <div className="bg-white p-4 rounded drop-shadow-md">
          <h1 className="text-2xl mb-4">ADD User</h1>
          <form onSubmit={(e) => handlePostForm(e)}>
            <div className="flex flex-wrap items-center mb-2">
              <label className="p-2 w-36 border-solid border-2">
                Firstname
              </label>
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
              <label className="p-2 w-36 border-solid border-2">
                Firstname
              </label>
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
              <p
                className={`bg-amber-100 p-2 mt-4 rounded ${updateUserMessage}`}
              >
                User updated
              </p>
            </div>
          </form>
        </div>

        <div className="bg-white p-4 rounded drop-shadow-md mb-4 mt-4">
          <h1 className="text-2xl mb-4">DELETE User</h1>
          <form onSubmit={(e) => handleDeleteForm(e)}>
            <div className="flex flex-wrap items-center mb-2">
              <label className="p-2 w-36 border-solid border-2">ID</label>
              <input
                type="text"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                className="grow p-2 border border-2"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-slate-600 hover:bg-slate-400 p-2 text-white cursor-pointer font-bold rounded-lg"
              >
                Delete User
              </button>
            </div>
            <div>
              <p
                className={`bg-amber-100 p-2 mt-4 rounded ${deleteUserMessage}`}
              >
                User deleted
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
