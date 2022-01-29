import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import Button from './Button';

export type ModalProps = {
  title: string;
  onClose?: () => void;
  onOpen?: () => void;
};
const Modal: FC<ModalProps> = ({ children, title, onClose, onOpen }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    onClose?.();
  }

  function openModal() {
    setIsOpen(true);
    onOpen?.();
  }

  return (
    <>
      <Button type="button" onClick={openModal}>
        {title}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto bg-background/90"
          onClose={closeModal}>
          <div className="px-4">
            <div className="flex h-screen justify-center md:items-center" aria-hidden="true">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Dialog.Overlay className="fixed inset-0 z-50" />
              </Transition.Child>
              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <div className="z-[100] flex translate-y-4 rounded-lg border-solid border-primary md:-translate-y-1/2">
                  {children}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
