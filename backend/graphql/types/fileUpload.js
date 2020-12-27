const { gql } = require('apollo-server-express');

const FileUpload = gql`    
    
    type File {
        id: ID!
        url: String!
    }

    extend type Mutation {
        # The scalar type Upload is already included By Apollo 
        uploadImage(file: Upload!): File! @isAuthenticated
    }
`;

module.exports = FileUpload;
