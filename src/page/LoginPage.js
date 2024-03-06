// import { useState, useCallback, useEffect, useRef } from "react";
// import {
//   // useLocation,
//   useNavigate,
//   useNavigation,
// } from "react-router-dom";
// import { useAuth } from "../utils/AuthProvider";
// import Spinner from "../component/Spinner";
// import axios from "axios"; // Import Axios

// import logo from "../assets/logotu.png";

// const LoginPage = () => {
//   const auth = useAuth();
//   const [loginLoading, setLoginLoading] = useState(false);

//   const navigate = useNavigate();
//   const navigation = useNavigation();
//   // const location = useLocation();

//   let from = "/";
//   const usernameRef = useRef();
//   const errRef = useRef();

//   const [error, setError] = useState(null);

//   useEffect(() => {
//     usernameRef.current.focus();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData(e.target);
//     const username = data.get("username");
//     const password = data.get("password");

//     try {
//       setLoginLoading(true);
//       const response = await axios.post(
//         "https://api-data-medical-room-tu.onrender.com/auth",
//         { username, password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         const data = response.data;
//         const accessToken = data?.accessToken;
//         const roles = data?.roles;
//         const user = { username, roles, accessToken };
//         await auth.signin(user, () => {
//           return navigate(from, { replace: true });
//         });
//       } else if (response.status === 400) {
//         setError("Missing username or Password");
//       } else if (response.status === 401) {
//         setError("Unauthorized");
//         console.log(">>> ", from);
//       } else if (response.status === 404) {
//         setError("User not found");
//       } else {
//         setError("Login failed");
//       }
//     } catch (error) {
//       setError(
//         "ล็อคอินไม่สำเร็จ กรุณาตรวจสอบยูสเซอร์และรหัสก่อนทำการเข้าสู่ระบบ"
//       );
//     } finally {
//       setLoginLoading(false);
//     }

//     // errRef.current.focus();
//   };

//   const redirect = useCallback(() => {
//     if (!loginLoading && auth?.user?.username) {
//       if (from) {
//         return navigate(from, { replace: true });
//       } else {
//         if (window.history.state && window.history.state.idx > 0) {
//           navigate(-1); //, { replace: true });
//         } else {
//           navigate("/", { replace: true });
//         }
//       }
//     }
//   }, [auth.user.username, from, loginLoading, navigate]);

//   // useEffect to make the redirect callback if user already logon
//   useEffect(() => redirect(), [redirect]);

//   return (
//     <>
//       <>
//         {navigation.state === "loading" ? (
//           <Spinner />
//         ) : (
//           <>
//             <p
//               ref={errRef}
//               className={
//                 error
//                   ? "text-white bg-yellow-500 p-2 text-center text-sm rounded-md"
//                   : "hidden"
//               }
//             >
//               {error}
//             </p>
//             <div className="flex-1 p-2">
//               <div className="max-w-md mx-auto p-6 mb-24  mt-24 bg-teal-800 shadow-md rounded-lg">
//                 <form onSubmit={handleSubmit} className="space-y-4 p-10">
//                   <div>
//                     <img
//                       src={logo}
//                       alt="Logo"
//                       className="w-32 h-32 mx-auto mb-4"
//                     />
//                     <h1 className="text-xl font-bold mb-4 text-center ">
//                       TULP WELLNESS CENTER
//                     </h1>
//                   </div>

//                   <div className="flex flex-col text-sm">
//                     <label htmlFor="username" className="mb-2">
//                       ชื่อยูสเซอร์
//                     </label>
//                     <input
//                       type="text"
//                       name="username"
//                       id="username"
//                       ref={usernameRef}
//                       autoComplete="off"
//                       required
//                       className="border border-gray-300 p-2 rounded-md"
//                     />
//                   </div>
//                   <div className="flex flex-col text-sm">
//                     <label htmlFor="password" className="mb-2">
//                       รหัสผ่าน
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       id="password"
//                       placeholder="password"
//                       autoComplete="off"
//                       required
//                       className="border border-gray-300 p-2 rounded-md"
//                     />
//                   </div>
//                   <div className="flex justify-center items-center ">
//                     <button
//                       type="submit"
//                       className="bg-teal-500 text-white px-4 rounded-lg hover:bg-teal-700"
//                     >
//                       เข้าสู่ระบบ
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </>
//         )}
//       </>
//     </>
//   );
// };

// export default LoginPage;

import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import logo from "../assets/logotu.png";
import Spinner from "../component/Spinner";
import axios from "../api/axios";
const LoginPage = () => {
  const auth = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const navigation = useNavigation();

  let from = "/";
  const usernameRef = useRef();
  const errRef = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    try {
      setLoginLoading(true);
      const response = await axios.post(
        "/auth",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const accessToken = data?.accessToken;
        const roles = data?.roles;
        const user = { username, roles, accessToken };
        await auth.signin(user, () => {
          return navigate(from, { replace: true });
        });
      } else if (response.status === 400) {
        setError("Missing username or Password");
      } else if (response.status === 401) {
        setError("Unauthorized");
        console.log(">>> ", from);
      } else if (response.status === 404) {
        setError("User not found");
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError(
        "ล็อคอินไม่สำเร็จ กรุณาตรวจสอบยูสเซอร์และรหัสก่อนทำการเข้าสู่ระบบ"
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const redirect = useCallback(() => {
    if (!loginLoading && auth?.user?.username) {
      console.log(
        "redirect >>> ",
        from,
        auth.user.username,
        window.history.state
      );
      if (from) {
        console.log("redirect ==> ", from);
        return navigate(from, { replace: true });
      } else {
        if (window.history.state && window.history.state.idx > 0) {
          navigate(-1); //, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    }
  }, [auth.user.username, from, loginLoading, navigate]);

  // useEffect to make the redirect callback if user already logon
  useEffect(() => redirect(), [redirect]);

  return (
    <>
      {navigation.state === "loading" ? (
        <Spinner />
      ) : (
        <>
          <p
            ref={errRef}
            className={
              error
                ? "text-white bg-yellow-500 p-2 text-center text-sm rounded-md"
                : "hidden"
            }
          >
            {error}
          </p>
          <div className="flex-1 p-2">
            <div className="max-w-md mx-auto p-6 mb-24  mt-24 bg-teal-800 shadow-md rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4 p-10">
                <div>
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-32 h-32 mx-auto mb-4"
                  />
                  <h1 className="text-xl font-bold mb-4 text-center text-white">
                    TULP WELLNESS CENTER
                  </h1>
                </div>

                <div className="flex flex-col text-sm">
                  <label htmlFor="username" className="mb-2 text-white">
                    ยูสเซอร์
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    ref={usernameRef}
                    placeholder="Username"
                    autoComplete="off"
                    required
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <label htmlFor="password" className="mb-2 text-white">
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 rounded-lg hover:bg-teal-700"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;
