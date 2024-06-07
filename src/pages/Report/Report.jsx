import React from 'react';

const Report = () => {
    return (
        <div className="min-h-screen  flex items-center justify-center">
      <form className=" w-[70%]  mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Text Report</h2>

        {/* Text Report Field */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Enter your text report:</label>
          <textarea
            name="textReport"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Submit Report
        </button>
      </form>
    </div>
    );
};

export default Report;