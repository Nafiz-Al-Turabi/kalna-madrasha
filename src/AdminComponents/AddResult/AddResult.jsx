import React from 'react';

const AddResult = () => {
    return (
        <form className="admin max-w-md mx-auto my-8 bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">Publish Result</h2>

            {/* Title Input */}
            <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">
                    Title Of result
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded0"
                    placeholder="Exap. Class Ten result"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="result" className="block text-sm font-medium text-gray-600 mb-2">
                    Result Sheet (PDF)
                </label>
                <input
                    type="file"
                    id="result"
                    name="result"
                    accept=".pdf"
                    required
                    className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="class" className="block text-sm font-medium text-gray-600 mb-2">
                   Choose Class
                </label>
                <select
                    id="class"
                    name="class"
                    className="w-full px-4 py-2 text-gray-500 shadow-inner p-3 bg-gray-100 focus:outline-none placeholder:text-base rounded"
                >
                    <option value="class1">Class 1</option>
                    <option value="class2">Class 2</option>
                    <option value="class3">Class 3</option>
                    <option value="class4">Class 4</option>
                    <option value="class5">Class 5</option>
                    <option value="class6">Class 6</option>
                    <option value="class7">Class 7</option>
                    <option value="class8">Class 8</option>
                    <option value="class9">Class 9</option>
                    <option value="class10">Class 10</option>
                </select>
            </div>

            <div className="flex justify-center">
                <button
                    className="bg-[#DAA520] text-white py-2 px-6 rounded-full"
                    type="submit"
                >
                    Publish
                </button>
            </div>
        </form>
    );
};

export default AddResult;