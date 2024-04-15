import { useState } from 'react';
import { useDelete } from '../../hooks/useDelete';

export default function DeleteUserForm() {
  const API = 'http://localhost:3000/';

  // DELETE form input state
  const [deleteId, setDeleteId] = useState('');
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

  const [deleteUserMessage, setDeleteUserMessage] = useToggleMessage();

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
          <p className={`bg-amber-100 p-2 mt-4 rounded ${deleteUserMessage}`}>
            User deleted
          </p>
        </div>
      </form>
    </div>
  );
}
