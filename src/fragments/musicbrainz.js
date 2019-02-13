const { GraphQLClient } = require(`graphql-request`);

// used to gather repo data on starters
const graphbrainzApiClient = new GraphQLClient(
  `https://graphbrainz.herokuapp.com/`
);

module.exports = {
  queryMusicBrainzRelease: mbid =>
    graphbrainzApiClient.request(
      `{
lookup {
  release(mbid: "${mbid}") {
    title
    date
    country
    coverArtArchive {
      front
      back
    }
    artistCredits {
      name
    }
  }
}
}`
    ),
  default_musicBrainzReleaseFields: {
    title: ``,
    date: ``,
    country: ``,
    coverArtArchive: {
      front: ``,
      back: ``
    },
    artistCredits: [
      {
        name: ``
      }
    ]
  }
};
