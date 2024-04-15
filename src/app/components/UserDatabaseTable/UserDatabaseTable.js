import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

export default function UserDatabaseTable() {
  const API = 'http://localhost:3000/';

  const { data, error, isLoading } = useFetch(`${API}/api/getusers`);
  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;

  useEffect(() => {
    console.log('Client API GET Data:', data);
  }, [data]);

  return (
    <div>
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
    </div>
  );
}
