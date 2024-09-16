import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Articles {
    id : ID,
    title : String , 
    avatar : String , 
    description : String , 

  }
  type Query {
    getListArticles : [Articles]
  }
`