import React from "react";

const Birthday = () => {
  // Static employee data
  const employees = [
    {
      name: "Alice Johnson",
      company: "TechCorp",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Bob Smith",
      company: "InnovateX",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Clara Lee",
      company: "DevSolutions",
      photo: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      name: "David Kim",
      company: "TechCorp",
      photo: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    {
      name: "Eva Brown",
      company: "InnovateX",
      photo: "https://randomuser.me/api/portraits/women/48.jpg",
    },
    {
      name: "Frank Wilson",
      company: "DevSolutions",
      photo: "https://randomuser.me/api/portraits/men/49.jpg",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🎉 Upcoming Birthdays
      </h1>

      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Celebrate your amazing teammates! Send them your warm wishes and make
        their day extra special. Here's a look at who’s turning a year older
        this month.
      </p>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((emp, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={emp.photo}
              alt={emp.name}
              className="w-24 h-24 rounded-full mb-3 border-2 border-indigo-300"
            />
            <h2 className="font-semibold text-lg text-gray-800">{emp.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{emp.company}</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
              Make a Wish 🎁
            </button>
          </div>
        ))}
      </div>

      {/* Creative Paragraph Below */}
      <div className="mt-12 max-w-3xl mx-auto text-center text-gray-700 text-lg italic">
        Birthdays are the perfect moments to celebrate the journey, growth,
        and happiness of our colleagues. Let's come together to share joy,
        laughter, and heartfelt wishes that make every birthday unforgettable.
      </div>
    </div>
  );
};

export default Birthday;
