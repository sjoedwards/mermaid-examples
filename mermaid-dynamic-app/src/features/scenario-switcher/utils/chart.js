export const createChart = (userAuthenticated, invalidPayload, journey) => {
  const successfulAuthResponse = `
  User ->> Auth: Get access token
  Auth ->> User: {access_token: {jwt}}
  `;

  const participants = {
    GET_USER: `
      Participant UserAPI as User API
      Participant UserDB as User Database`,
    UPDATE_ARTICLE: `
      Participant ArticleAPI as Article API
      Participant ArticleDB as Article Database`,
  };

  const userRequest = {
    GET_USER: `/api/user/me, {access_token}`,
    UPDATE_ARTICLE: `/api/articles, {access_token, articles}`,
  };

  const gatewayRequest = {
    GET_USER: `UserAPI: /api/user/{id}, {claims, id}`,
    UPDATE_ARTICLE: `ArticleAPI: /api/articles, {claims, id}`,
  };

  const apiRequest = {
    GET_USER: `UserAPI ->> UserDB: Get user`,
    UPDATE_ARTICLE: `ArticleAPI ->> ArticleDB: Post article`,
  };

  const databaseResponse = {
    GET_USER: `UserDB ->> UserAPI: {user}`,
    UPDATE_ARTICLE: `ArticleDB ->> ArticleAPI: {article}`,
  };

  const apiResponse = {
    GET_USER: `UserAPI ->> GW: {user}`,
    UPDATE_ARTICLE: `ArticleAPI ->> GW: {article}`,
  };

  const gatewayResponse = {
    GET_USER: `{user}`,
    UPDATE_ARTICLE: `{article}`,
  };

  const createDiagramWithBaseInfo = (content) => `
    sequenceDiagram
    Actor User
    Participant Auth as Auth Server
    Participant BEFE as Backend for Frontend
    Participant GW as Gateway
    ${participants[journey]}
    ${content}
  `;
  if (!userAuthenticated) {
    return createDiagramWithBaseInfo(`
    User ->> Auth: Get access token
    Auth ->> User: 401 unauthorized
    `);
  }

  if (invalidPayload) {
    return createDiagramWithBaseInfo(`
    ${successfulAuthResponse}
    User ->> BEFE: ${userRequest[journey]}
    BEFE ->> GW: ${userRequest[journey]}
    GW ->> GW: {validate JWT, extract claims}
    GW ->> ${gatewayRequest[journey]}
    GW ->> BEFE: 400
    BEFE ->> User: 400
    `);
  }

  return createDiagramWithBaseInfo(`
  ${successfulAuthResponse}
  User ->> BEFE: ${userRequest[journey]}
  BEFE ->> GW: ${userRequest[journey]}
  GW ->> GW: {validate JWT, extract claims}
  GW ->> ${gatewayRequest[journey]}
  ${apiRequest[journey]}
  ${databaseResponse[journey]}
  ${apiResponse[journey]}
  GW ->> BEFE: ${gatewayResponse[journey]}
  note over BEFE: Other requests here...
  BEFE ->> User: ${gatewayResponse[journey]}
`);
};
