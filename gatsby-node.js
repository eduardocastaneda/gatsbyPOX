const path = require(`path`);
exports.createPages = async data => {
  console.log("data", data);
  const { actions, graphql } = data;
  const { data } = await graphql(`
    query {
      test {
        search(
          type: "movie"
          page: 1
          limit: 10
          sortBy: "title"
          order: "asc"
        ) {
          totalHits
          items {
            id
            title
          }
        }
      }
    }
  `);

  const { items } = data.test.search;

  actions.createPage({
    path: "filmer",
    component: path.resolve(`./src/components/movies.js`),
    context: {
      items,
    },
  });

  items.map(({ id, title }) => {
    console.log("title", title);
    actions.createPage({
      path: "filmer/" + id,
      component: path.resolve(`./src/components/movie.js`),
      context: {
        movieId: id,
        title,
      },
    });
  });
};
