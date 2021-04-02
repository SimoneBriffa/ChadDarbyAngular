export default {

    //Open ID Connect
    oidc: {
        clientId: '0oaazviykq3tgL4oE5d6',
        issuer: 'https://dev-30543024.okta.com/oauth2/default', //okta domain
        redirectuUri: 'http:77localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']
    }

}
