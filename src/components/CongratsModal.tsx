import React, { FC, Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";

type CongratsModalProps = {
  children?: React.ReactNode;
  open: boolean;
  randomFact: string;
  onClose: () => void;
};

const CongratsModal: FC<CongratsModalProps> = (props) => {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Congratulations!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {`You've completed all the phases. You're ready to launch!
                    Here's a random fact to celebrate:`}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-brand-primary">
                    {props.randomFact}
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <Button
                    intent="secondary"
                    size="small"
                    onClick={props.onClose}
                  >
                    Close
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CongratsModal;
