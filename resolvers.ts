import Article from "./models/articles.model";

export const resolvers = {
    Query: {
      getListArticles : async () => {
        const articles = await Article.find({
          deleted : false
        });
        return articles ;
      }
    }
  }