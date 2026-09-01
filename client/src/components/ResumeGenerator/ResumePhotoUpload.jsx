import { useState } from "react";

export default function ResumePhotoUpload({ setPhoto }) {
    const [preview, setPreview] = useState(null);

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        
        if(!file) return;

        setPhoto(file);

        const imageURL = URL.createObjectURL(file);
        setPreview(imageURL);
    };

    const removePhoto = () => {
        setPreview(null);
        setPhoto(null);
    };
    return(
        <div className="mt-6">

            <label className="block font-semibold text-teal-600 mb-2">
                Professional Photo (Optional)
            </label>
            
            { preview ? (
                <div className="flex flex-col items-center">
                    
                    <img src={preview} alt="Preview" className="w-36 h-36 rounded-full object-cover border-4 border-teal-300" />

                    <button type="button" onClick={removePhoto} className="mt-3 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
                        Remove Photo
                    </button>
                </div>
            ) : (
                <input type="file" accept="image/*" onChange={handlePhoto} className="w-full border rounded p-3" />
            ) }
        </div>
    );
}