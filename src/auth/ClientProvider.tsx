import React, { PropsWithChildren } from 'react';
import keytar from 'keytar';
import { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import getCode from './getCode';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const { CLIENT_ID } = process.env;


const ClientProvider = ({ children }) => {
    const [token, setToken] = useState<string>();
    useEffect(() => {
        const getToken = async () => {
            let key: any = await keytar.getPassword('github', CLIENT_ID);
            if (!key) {
                key = await getCode();
            }
            setToken(key);
        }
    });

    const client = new ApolloClient({
        uri: GITHUB_BASE_URL,
        request: operation => {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
        }
    });

    if (!token) {
        return <>Loading...</>;
    }
}

export default ClientProvider;
