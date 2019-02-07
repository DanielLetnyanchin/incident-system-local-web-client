// export const environment = {
//   production: true,
//   apiUrl: 'https://localhost:44382/api',
//   openIdConnectSettings: {
//     authority: 'https://localhost:44398/',
//     client_id: 'incidentmanagementclient',
//     redirect_uri: 'https://localhost:4200/signin-oidc',
//     scope: 'openid profile roles incidentmanagementapi',
//     response_type: 'id_token token',
//     post_logout_redirect_uri: 'https://localhost:4200/',
//     automaticSilentRenew: true,
//     silent_redirect_uri: 'https://localhost:4200/redirect-silentrenew'
//     }
// };

export const environment = {
  production: true,
  apiUrl: 'https://incidentsystemapi.azurewebsites.net/api',
  openIdConnectSettings: {
    authority: 'https://incidentsystemidp.azurewebsites.net/',
    client_id: 'incidentmanagementclient',
    redirect_uri: 'https://localhost:4200/signin-oidc',
    scope: 'openid profile roles incidentmanagementapi',
    response_type: 'id_token token',
    post_logout_redirect_uri: 'https://localhost:4200/',
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://localhost:4200/redirect-silentrenew'
    }
};
