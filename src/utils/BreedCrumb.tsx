import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreedCrumb: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname
    .split("/")
    .filter((x) => x)
    .filter((x) => x.length < 11);
  return (
    <div className="pb-3">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1  ">
          {path.map((name, index) => {
            const routeTo = `/${path.slice(0, index + 1).join("/")}`;
            const isLast: boolean = index === path.length - 1;
            return isLast ? (
              <li aria-current="page">
                <div className="flex items-center">
                  {path.length > 1 && (
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  )}
                  <span className="font-medium text-gray-500  dark:text-gray-400 capitalize">
                    {name}
                  </span>
                </div>
              </li>
            ) : (
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <Link
                    to={routeTo}
                    className="capitalize font-medium text-gray-700 hover:text-gray-900  dark:text-gray-400 dark:hover:text-white"
                  >
                    {name}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default BreedCrumb;
