import { ApolloServer, gql } from "apollo-server";


const typedefs = gql`
    type Project {
        id: ID!
        name: String!
        description: String!
        technologies: [String]!
        link: String!
        participants: [String]!
    }

    type Query {
        getProjects: [Project]!
    }

    type Mutation{
        createProject(name: String!, description: String!, technologies: [String!]!, link: String!, participants: [String!]!): Project!
    }
`;

const projects = [];

projects.push({
    id: 0,
    name: "Project 1",
    description: "This is a project",
    technologies: ["React", "NodeJS"],
    link: "https://www.google.com",
    participants: ["John Doe", "Jane Doe"]
});

const server = new ApolloServer({
    typeDefs: typedefs,
    resolvers: {
        Mutation: {
            createProject: (_, { name, description, technologies, link, participants }) => {
                const id = projects.length;
                const project = { id, name, description, technologies, link, participants };
                projects.push(project);
                return project;
            }
        },
        Query: {
            getProjects: () => projects,
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});