import { useState, useRef } from 'react';

function DropZone({ onFileSelect }) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const dropRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                setFile(file);
                onFileSelect && onFileSelect(file);
            } else {
                alert('Mohon upload file gambar saja');
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFile(file);
            onFileSelect && onFileSelect(file);
        } else {
            alert('Mohon upload file gambar saja');
        }
    };

    return (
        <div
            ref={dropRef}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
            <div className="text-center p-6">
                {file ? (
                    <div>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="max-h-40 mx-auto mb-4"
                        />
                        <p className="text-sm text-gray-600">{file.name}</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-lg mb-2">Drop file gambar di sini</p>
                        <p className="text-sm text-gray-500">atau klik untuk memilih file</p>
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}

export default DropZone;