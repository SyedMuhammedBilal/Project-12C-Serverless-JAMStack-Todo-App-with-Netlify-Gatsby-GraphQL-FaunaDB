module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://your-identity-instance-here.netlify.com/` // required!
      }
    }
  ]
}