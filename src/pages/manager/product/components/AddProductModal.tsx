import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaTimes } from "react-icons/fa";
import AddProductForm from "../../../../forms/branchAdminForm/AddProductForm";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  setEditProductId: React.Dispatch<React.SetStateAction<string | null>>;
  editProductId: string | null;

}
const AddProductModal = ({
  setIsModalOpen,
  isModalOpen,
  setStateChange,
  setEditProductId,
  editProductId,
}: Props) => {
  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(true)}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-lg transition-all">
                  <div className=" flex items-end justify-end self-end">
                    <FaTimes
                      onClick={() => {
                        setIsModalOpen(false);
                        setTimeout(() => {
                          setEditProductId(null)
                        }, 500);
                      }}
                      className="w-fit text-lg text-gray-700 cursor-pointer"
                    />
                  </div>
                  <AddProductForm
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    setStateChange={setStateChange}
                    setEditProductId={setEditProductId}
                    editProductId={editProductId}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddProductModal;
