module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://p12-todo.netlify.app/` // required!
      }
    }
  ]
}