import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="text-xl font-bold text-gray-900">SneakerDrop</span>
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
                  {user.username[0]}
                </div>
                <span className="text-gray-700 font-medium capitalize">
                  {user.username}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-sm cursor-pointer font-semibold text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
