import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import { navigationRef } from './src/navigations/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigations/drawernavigator';

const httpLink = new HttpLink({
    uri: 'http://192.168.43.171:8000/graphql'
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const link = from([errorLink, httpLink])

//Initialize Apollo Client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
})

/* const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql', 
    cache: new InMemoryCache()
}); */ 

const App = () => {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer ref={navigationRef}>
                <DrawerNavigator />
            </NavigationContainer>
        </ApolloProvider>
    )
}
export default App;
