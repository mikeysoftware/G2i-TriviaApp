import "./Modal.css";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
interface ModalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function Modal({
  children,
  title = "Modal Title",
  subtitle = "Modal Subtitle",
  open = false,
  setOpen = (open: boolean) => {
    console.log(`Modal Open: ${open}`);
  },
}: ModalProps): JSX.Element {
  return (
    <Transition.Root show={open} as={Fragment}>
      {/* Overlay */}
      <Dialog as="div" className="modal" onClose={setOpen}>
        <div className="overlay__wrapper" style={{ fontSize: 0 }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="overlay__container" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>

          {/* Modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <div data-testid="modal_container" className="modal__wrapper">
              <div className="modal__container">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setOpen(false)}>
                  <span className="sr-only">Close</span>
                  {/* X - Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="content">
                  {/* Modal Title */}
                  <h2 className="content__title">{title}</h2>

                  {/* Modal Subtitle */}
                  <section aria-labelledby="information-heading" className="mt-2">
                    <p className="content__subtitle">{subtitle}</p>
                  </section>
                  {/* Modal Content */}
                  <div className="">{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
