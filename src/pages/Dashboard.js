import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-6em)] mt-12 mx-3">
      <section>
        <p>Dashboard</p>

        <div className="overflow-hidden rounded-md">
          <form className="grid gap-4 p-4 bg-gray-200 ">
            <input
              className="p-2 rounded-sm outline-none "
              type="text"
              name=""
              id=""
            />
            <input
              className="p-2 rounded-sm outline-none "
              type="number"
              name=""
              id=""
            />
            <textarea
              className="p-2 rounded-sm outline-none resize-none"
              name=""
              id=""
              cols="20"
              rows="10"
            ></textarea>
            <label
              htmlFor="upload-image"
              className="p-4 rounded-md cursor-pointer outline-dashed outline-1 outline-offset-2 outline-gray-400/90"
            >
              <div>Upload Image</div>
            </label>
            <input
              className="hidden"
              type="file"
              name=""
              accept="image/*"
              id="upload-image"
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
