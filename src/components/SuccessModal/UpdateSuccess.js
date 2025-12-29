/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import AnimatedSuccessCheckmark from '../../../components/AnimatedSuccessCheckMark';

const UpdateSuccessfulModal = ({ setShowSuccessModal, modalHeader, modalBody, navigate }) => {

  const history = useHistory();
  
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative md:w-430px my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
            <div className="flex items-start justify-between px-5 rounded-t">
              <h3>&nbsp;</h3>
              <span className="relative z-50">
                <button
                  data-testid="close-modal"
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute right-0 top-4 bg-formgray block p-2 rounded-full"
                   aria-label="close modal"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99912 9.76786L2.633 15.134L0.865234 13.3662L6.23135 8.00009L0.865234 2.63398L2.633 0.866211L7.99912 6.23233L13.3652 0.866211L15.133 2.63398L9.76688 8.00009L15.133 13.3662L13.3652 15.134L7.99912 9.76786Z"
                      fill="#ACACAC"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className="w-full relative px-6 py-10 flex-auto">
              <div className="">
                <div className="flex justify-center items-center">
                  <AnimatedSuccessCheckmark />
                </div>
                <h1 className="text-center text-xl text-darkpurple font-medium pb-4 pt-6 dark:text-gray-400">
                  {modalHeader}
                </h1>
                <p className="text-md text-center text-lightnavyblue px-4 dark:text-gray-400">
                  {modalBody}
                </p>
                {/* <div className='text-center mt-4 text-lightnavyblue dark:text-gray-400'>
                  <div className='border border-gray-100 h-10 mx-9 rounded-tr-sm flex justify-center items-center rounded-tl-sm'>
                    <p className="text-ellipsis items-center overflow-hidden text-center">
                      {link}
                    </p>
                  </div>
                  <CopyToClipboard text={link}
                    onCopy={() => toast.success("Payment link copied")}
                  >
                      <div className='bg-gray-100 h-10 mx-9 rounded-bl-sm cursor-pointer rounded-br-sm flex items-center justify-center'>
                        <span>Tap to copy link</span>
                        <span className='ml-2'>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.83268 0.166748H10.666C11.3382 0.166748 11.8327 0.661249 11.8327 1.33341V7.16675C11.8327 7.83891 11.3382 8.33341 10.666 8.33341H8.33268V10.6667C8.33268 11.3389 7.83818 11.8334 7.16602 11.8334H1.33268C0.660516 11.8334 0.166016 11.3389 0.166016 10.6667V4.83341C0.166016 4.16125 0.660516 3.66675 1.33268 3.66675H3.66602V1.33341C3.66602 0.661249 4.16052 0.166748 4.83268 0.166748ZM3.66602 4.83341H1.33268V10.6667H7.16602V8.33341H4.83268C4.16052 8.33341 3.66602 7.83891 3.66602 7.16675V4.83341ZM4.83268 1.33341V7.16675H10.666V1.33341H4.83268Z" fill="#0066FF" />
                          </svg>
                        </span>
                      </div>
                  </CopyToClipboard>
                </div> */}
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={() =>
                    {
                      setShowSuccessModal(false)
                      history.push(navigate || "#")
                    }
                    }
                    className="flex items-center px-6 py-2 text-white font-medium bg-yepprimary rounded focus:outline-none hover:bg-red-500"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black" />
    </>
  )

}

const UpdateSuccessModal = ({ setShowSuccessModal, modalHeader, modalBody,navigate }) => (
  // const copyText = () => {
  //   console.log("something here.")
  // }
 <>
    {ReactDOM.createPortal(
      <UpdateSuccessfulModal
        setShowSuccessModal={setShowSuccessModal}
        modalHeader={modalHeader}
        modalBody={modalBody}
        navigate={navigate}
      />,
      document.getElementById("overlay-root")
    )}
  </>
);
UpdateSuccessfulModal.defaultProps = {
  navigate:""
}

UpdateSuccessModal.defaultProps = {
  navigate:""
}

UpdateSuccessfulModal.propTypes = {
  setShowSuccessModal: PropTypes.func.isRequired,
  modalHeader: PropTypes.string.isRequired,
  modalBody: PropTypes.string.isRequired,
  navigate: PropTypes.string
};

UpdateSuccessModal.propTypes = {
  setShowSuccessModal: PropTypes.func.isRequired,
  modalHeader: PropTypes.string.isRequired,
  modalBody: PropTypes.string.isRequired,
  navigate: PropTypes.string
};

export default UpdateSuccessModal;
