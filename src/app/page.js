'use client';
import UserDatabaseTable from './components/UserDatabaseTable/UserDatabaseTable';
import AddUserForm from './components/AddUserForm/AddUserForm';
import UpdateUserForm from './components/UpdateUserForm/UpdateUserForm';
import DeleteUserForm from './components/DeleteUserForm/DeleteUserForm';

export default function Home() {
  return (
    <div className="container mx-auto mt-4">
      <UserDatabaseTable />
      <div className="bg-slate-100 rounded p-10 drop-shadow-lg">
        <AddUserForm />
        <UpdateUserForm />
        <DeleteUserForm />
      </div>
    </div>
  );
}
