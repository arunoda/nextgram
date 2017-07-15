import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    networkInterface: createNetworkInterface({
      uri: 'https://kvmj5nlj7.lp.gql.zone/graphql',
      opts: {
        credentials: 'same-origins'
      }
    })
  })
}

export default function initApollo (initialState) {
  if (!process.browser) {
    return create(initialState)
  }
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
