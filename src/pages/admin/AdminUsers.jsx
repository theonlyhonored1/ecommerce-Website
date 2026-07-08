import { useAuth } from '../../context/AuthContext'

export default function AdminUsers() {
  const { users, currentUser, setUserRole } = useAuth()

  function toggleRole(user) {
    const newRole = user.role === 'admin' ? 'customer' : 'admin'
    setUserRole(user.email, newRole)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage Users</h2>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => {
              const isSelf = u.email === currentUser.email
              return (
                <tr key={u.email}>
                  <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        u.role === 'admin' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleRole(u)}
                      disabled={isSelf}
                      title={isSelf ? "You can't change your own role" : undefined}
                      className="text-primary-600 hover:underline text-sm disabled:text-gray-300 disabled:no-underline disabled:cursor-not-allowed"
                    >
                      {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
