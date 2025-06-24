import { Outlet } from "react-router-dom";

export default function MainLayout() {
  // if (Loading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur">
  //       <div className="text-center text-white">
  //         <svg
  //           className="mx-auto mb-4 h-12 w-12  text-white"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //         >
  //           <path
  //             fill="currentColor"
  //             d="M12 2C8.686 2 6 4.686 6 8c0 1.656.672 3.156 1.757 4.243C5.645 13.78 4 16.234 4 19h2c0-2.5 2-5 6-5s6 2.5 6 5h2c0-2.766-1.645-5.22-3.757-6.757A5.99 5.99 0 0018 8c0-3.314-2.686-6-6-6zM8 8a4 4 0 118 0 4 4 0 01-8 0zM2 21h20v2H2v-2z"
  //           ></path>
  //         </svg>
  //         <p className="text-lg font-semibold">Logging out...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Outlet />
    </div>
  );
}
