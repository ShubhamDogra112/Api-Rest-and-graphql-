const {buildSchema} = require("graphql")

module.exports = buildSchema(`

    type testData{
        text:String!
        val:Int!
    }

    type post{
        _id:ID!
        content:String
        title:String
    }


    type AuthData{
        token:String!
        userId:String!
    }


    input userInputData{

        email:String!
        password:String!

    }

    type createdPost{
        postId:String!,
        message:String!
    }

    type User{
        token:String!
        _id : ID!
        email:String!
        password:String!
    }

    type postData{
        posts:[post!]!
    }

    type rootQuery{
        
        hello:testData!
        login(email:String!,password:String!):AuthData!,
        loadPost:postData!
    }
   


    type rootMutation{

        createUser(userData : userInputData):User!
        createPost(title:String!,content:String!):createdPost!

    }



    schema {

        query:rootQuery
        mutation:rootMutation


        

    }


`)