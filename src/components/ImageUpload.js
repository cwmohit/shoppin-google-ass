"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUpload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setImageLink("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const handleSearch = () => {
      // logic for image upload
  };

  return (
    <>
      <label
        htmlFor="image-upload"
        className="cursor-pointer text-gray-500 hover:text-gray-700 transition ml-2"
        onClick={openModal}
      >
        <img src="/camera.svg" className="w-8" alt="Upload Image" />
      </label>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[rgb(48,49,52)] text-white p-6 rounded-3xl w-full max-w-[600px] relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 font-semibold text-gray-300 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-lg mb-4 text-center">
              Search any image with Google Lens
            </h2>
            <div className="bg-[rgb(32,33,36,68%)] rounded-lg p-4">
              <div
                className="flex items-center justify-center cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded Preview"
                    className="max-h-full max-w-full h-40 mb-4"
                  />
                ) : (
                  <label className="flex items-center cursor-pointer gap-4 h-40">
                    <Image src="/drag_drop.svg" width={60} height={60} alt="drag-and-drop-image" />
                    <span className="text-gray-400 mb-2">
                      Drag an image here or{" "}
                      <span className="text-blue-400 underline">upload a file</span>
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="border-b border-[rgb(48,49,52)] w-full"></span>
                <span>OR</span>
                <span className="border-b border-[rgb(48,49,52)] w-full"></span>
              </div>
              <div className="flex items-center justify-center mt-4 gap-3">
                <input
                  type="text"
                  placeholder="Paste image link"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="w-full px-6 py-2 rounded-full bg-[rgb(48,49,52)] text-white focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  type="button"
                  className="text-blue-300 border border-gray-700 hover:bg-[rgb(48,49,52)] px-8 py-2 rounded-full"
                  disabled={!imageLink && !selectedImage}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}