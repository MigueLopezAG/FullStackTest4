import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginData } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = "/login";
  useEffect(() => {
    if (!userInfo && !error) {
      dispatch(getLoginData());
    }
  }, [dispatch, error, userInfo]);
  const navigate = useNavigate();
  const redirectUrl = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="flex min-h-full flex-col bg-white lg:relative">
        <div className="flex flex-grow flex-col">
          <main className="flex flex-grow flex-col bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 pt-10 sm:pt-16">
                <a href="/" className="inline-flex">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>
              <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={redirectUrl}
                    className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Go back home
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
          <footer className="flex-shrink-0 bg-gray-50">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <nav className="flex space-x-4">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Contact Support
                </a>
                <span
                  className="inline-block border-l border-gray-300"
                  aria-hidden="true"
                />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Status
                </a>
                <span
                  className="inline-block border-l border-gray-300"
                  aria-hidden="true"
                />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Twitter
                </a>
              </nav>
            </div>
          </footer>
        </div>
        <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
