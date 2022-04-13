module.exports = {
  siteMetadata: {
    siteUrl: "https://www.minmaungmaung.com",
    title: "Project Voxel",
    description: `Project Voxel`,
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-fontawesome-css",
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
      {
          resolve: `gatsby-plugin-manifest`,
          options: {
              name: 'Project Voxel',
              short_name: 'Project Voxel',
              start_url: '/',
              icon: 'src/images/icon.png',
          },
      }
  ],
};
