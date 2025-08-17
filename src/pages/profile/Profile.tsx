// ProfileLayout.tsx
import { Link, Outlet, useLocation } from "react-router";

const Profile = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Личная информация", path: "/profile" },
    { name: "Заказы", path: "/profile/orders" },
  ];

  return (
    <div className="min-h-screen w-full p-2 md:p-4">
      <div className="bg-white rounded-xl shadow-md p-2 md:p-4">
        {/* Верхнее меню */}
        <nav className="flex items-center border-b border-gray-200">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 font-medium text-gray-600 hover:text-gray-900 ${
                location.pathname === item.path
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Контент дочерних маршрутов */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
