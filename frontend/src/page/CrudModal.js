import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const CrudModal = ({ isOpen, handleClose, initialData, createCallback, updateCallback, deleteCallback }) => {
  const [isCreate, setIsCreate] = useState(true);
  const [data, setData] = useState(initialData ?? {});

  useEffect(() => {
    setData(initialData ?? {});
    setIsCreate(initialData === undefined);
  }, [initialData]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('/api/data', data);
      createCallback(response.data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/data/${data._id}`, data);
      updateCallback(data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/data/${data._id}`);
      deleteCallback(data._id);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} shouldCloseOnOverlayClick>
      <div className="flex flex-col w-full p-4">
        <h2 className="text-xl font-bold mb-4">{isCreate ? 'Create New Item' : 'Update Item'}</h2>
        <form className="flex flex-col space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="mb-2 text-sm font-medium">{key}</label>
              <input
                className="border rounded p-2"
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end mt-4">
          {!isCreate && (
            <button
              className="mr-4 text-red-500 hover:text-red-700 border rounded p-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button
            className="mr-4 text-gray-500 hover:text-gray-700 border rounded p-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 rounded p-2"
            onClick={isCreate ? handleCreate : handleUpdate}
          >
            {isCreate ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CrudModal;
