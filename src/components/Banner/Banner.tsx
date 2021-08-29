import { Link } from "react-router-dom";

interface BannerProps {
  message?: string;
  buttonLabel?: string;
  buttonCallback?: () => void;
}

export default function Banner({
  message = "Banner Message",
  buttonLabel = "Button Label",
  buttonCallback = () => {
    console.log(`${buttonLabel} Clicked!`);
  },
}: BannerProps): JSX.Element {
  return (
    <div className="bg-red-600 shadow-md rounded-md">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          {/* Message */}
          <div className="w-full sm:w-0 justify-start flex-1 flex items-center">
            <Link to="/">
              <span className="flex p-2 rounded-lg bg-red-800">
                {/* Think Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </span>
            </Link>
            <Link to="/">
              <p className="ml-3 font-medium text-white truncate">
                <span className="">{message}</span>
              </p>
            </Link>
          </div>
          {/* Call to Action */}
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href=""
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
              onClick={buttonCallback}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
