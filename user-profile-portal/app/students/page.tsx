"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Student = {
  id: string;
  name: string;
  age: number;
  department: string;
  email: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            students {
              id
              name
              age
              department
              email
            }
          }
        `,
      }),
    });

    const result = await response.json();
    setStudents(result.data.students);
  };

  const deleteStudent = async (id: string) => {
    await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation DeleteStudent($id: ID!) {
            deleteStudent(id: $id)
          }
        `,
        variables: {
          id,
        },
      }),
    });

    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <div className="bg-white border-b">
  <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
    
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Student Dashboard
      </h1>
      <p className="text-sm text-slate-500">
        Manage student profiles
      </p>
    </div>

    <div className="flex gap-3">
      <Link
        href="/add-student"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
      >
        + Add Student
      </Link>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </div>

  </div>
</div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-700">
            Total Students
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {students.length}
          </p>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm"
            >
              {/* Avatar */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-28 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold">
                  {student.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {student.name}
                </h2>

                <div className="mt-4 space-y-2 text-slate-600">
                  <p>
                    <span className="font-semibold">
                      Age:
                    </span>{" "}
                    {student.age}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Department:
                    </span>{" "}
                    {student.department}
                  </p>

                  <p className="break-all">
                    <span className="font-semibold">
                      Email:
                    </span>{" "}
                    {student.email}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link
                    href={`/update/${student.id}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}