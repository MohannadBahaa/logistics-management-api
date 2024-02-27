// Define constant values for token types
const ACCESS_TOKEN: 'access' = 'access';
const REFRESH_TOKEN: 'refresh' = 'refresh';

export interface TokenConstants {
  type: {
    ACCESS: typeof ACCESS_TOKEN;
    REFRESH: typeof REFRESH_TOKEN;
  };
  options: {
    accessToken: {
      expiresIn: string;
    };
    refreshToken: {
      expiresIn: string;
    };
  };
}
// Define an object that matches the TokenConstants interface
const tokenConstants: TokenConstants = {
  type: {
    ACCESS: ACCESS_TOKEN,
    REFRESH: REFRESH_TOKEN,
  },
  options: {
    accessToken: {
      expiresIn: '1h',
    },
    refreshToken: {
      expiresIn: '7d',
    },
  },
};

export { tokenConstants };
