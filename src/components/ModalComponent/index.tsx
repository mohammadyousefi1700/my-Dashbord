import { Dialog, Transition } from "@headlessui/react";
import cx from "classnames";
import type { ReactNode } from "react";
import React, { Fragment } from "react";

export type ModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  visible: boolean;
  onClose(): void;
  centered?: boolean;
  closable?: boolean;
  children: ReactNode;
  overLayClassName?: string;
  dialogContainerClassName?: string;
};

const Modal = (props: ModalProps) => {
  const {
    className,
    overLayClassName,
    dialogContainerClassName,
    visible,
    onClose,
    centered,
    closable = true,
    children,
    ...rest
  } = props;

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        open={visible}
        className={cx(
          dialogContainerClassName,
          "fixed z-[10000] inset-0 overflow-y-auto"
        )}
        onClose={onClose}
      >
        <div
          className={`${centered ? "h-screen" : "h-auto"} flex ${
            centered ? "items-center text-center" : "items-start"
          } justify-center `}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={cx(
                overLayClassName,
                "fixed inset-0 transition-opacity bg-opacity-90 bg-slate-600"
              )}
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={cx(
                className,
                `relative bg-white rounded-lg m-8 max-h-full overflow-y-auto ${
                  closable && "pt-8"
                } p-3 overflow-hidden shadow-xl  min-w-[330px]`
              )}
              {...rest}
            >
              {closable && (
                <span
                  className="absolute text-base cursor-pointer top-2 right-3"
                  onClick={() => onClose()}
                >
                  &#10006;
                </span>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
