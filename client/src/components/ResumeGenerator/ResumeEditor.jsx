import { useState } from "react";
export default function ResumeEditor({
    resume,
    onSave,
    onCancel,
}) {
    const [editedResume, setEditedResume] = useState(resume);

    const handleChange = (field, value) => {
        setEditedResume({
            ...editedResume,
            [field]: value,
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8">
                Edit Resume
            </h2>

            <label className="font-semibold">
                Professional Summary
            </label>

            <textarea rows="6" value={editedResume.summary}
            onChange={(e)=> handleChange("summary", e.target.value)} 
            className="w-full border rounded p-3 mt-2 mb-6" />

            <label className="font-semibold">
                Skills
            </label>
            <textarea rows="5" value={editedResume.skills.join(", ")} onChange={(e)=> handleChange("skills", e.target.value.split(","))}
            className="w-full border rounded p-3 mt-2 mb-6" />

            <div className="flex gap-4">
                <button onClick={() => onSave(editedResume)}
                className="bg-green-600 text-white px-6 py-3 rounded">
                    Save Changes
                </button>

                <button onClick={onCancel} className="bg-gray-500 text-white px-6 py-3 rounded">
                    Cancel
                </button>

            </div>

        </div>
    );
}