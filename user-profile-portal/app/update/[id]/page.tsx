"use client";
import { use } from "react";
import { useState } from "react";

export default function UpdateStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] =
    useState("");
  const [email, setEmail] =
    useState("");

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation UpdateStudent(
              $id:ID!,
              $name:String!,
              $age:Int!,
              $department:String!,
              $email:String!
            ) {
              updateStudent(
                id:$id
                name:$name
                age:$age
                department:$department
                email:$email
              ) {
                id
              }
            }
          `,
          variables: {
            id,
            name,
            age: Number(age),
            department,
            email,
          },
        }),
      }
    );

    const result =
      await response.json();

    if (result.data) {
      alert(
        "Student Updated Successfully"
      );
      window.location.href = "/students";
    }
  };

 return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center">
    <div className="bg-white shadow-xl rounded-2xl p-10 w-[500px]">

      <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
        Update Student
      </h1>

      <p className="text-center text-slate-500 mb-8">
        Modify student information
      </p>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 text-black"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 text-black"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4 text-black"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6 text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Update Student
        </button>
      </form>
    </div>
  </div>
);
}