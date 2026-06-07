export const typeDefs = `#graphql

type User {
  id: ID!
  email: String!
}

type Student {
  id: ID!
  name: String!
  age: Int!
  department: String!
  email: String!
  image: String
}

type Query {
  students: [Student]
}

type Mutation {
  signup(
    email: String!
    password: String!
  ): String

  login(
    email: String!
    password: String!
  ): String

  addStudent(
    name: String!
    age: Int!
    department: String!
    email: String!
  ): Student

updateStudent(
  id: ID!
  name: String!
  age: Int!
  department: String!
  email: String!
): Student

  deleteStudent(
    id: ID!
  ): String
}
`;