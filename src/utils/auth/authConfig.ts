// src/authConfig.js

import { PublicClientApplication } from "@azure/msal-browser";

const b2cPolicies = {
  names: {
    signUpSignIn: `${import.meta.env.VITE_POLICY}`,
  },
  authorities: {
    signUpSignIn: {
      authority: `${import.meta.env.VITE_AUTHORITY}`,
    },
  },
  authorityDomain: `${import.meta.env.VITE_AUTHORITY_DOMAIN}`,
};
const b2cPoliciesGoogle = {
  names: {
    signUpSignIn: `${import.meta.env.VITE_POLICY_GOOGLE}`,
  },
  authorities: {
    signUpSignIn: {
      authority: `${import.meta.env.VITE_AUTHORITY_GOOGLE}`,
    },
  },
  authorityDomain: `${import.meta.env.VITE_AUTHORITY_DOMAIN}`,
};

const msalConfig = (type : string) => {
  return {
    auth: {
      clientId: `${import.meta.env.VITE_CLIENT_ID}`, // Client ID of your registered application in Azure AD
      redirectUri: `${import.meta.env.VITE_REDIRECT_URI}`, // Redirect URI configured in Azure AD app registration
      authority:
        type == "google"
          ? b2cPoliciesGoogle.authorities.signUpSignIn.authority
          : b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
      knownAuthorities:
        type == "google"
          ? [b2cPoliciesGoogle.authorityDomain]
          : [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
    },

    cache: {
      cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
      storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
    },
    // system: {
    //   loggerOptions: {
    //     loggerCallback: (level: any, message: any, containsPii: any) => {
    //       if (containsPii) {
    //         return;
    //       }
    //       console.log("level", level, message);
    //     },
    //   },
    // },
  };
};

export const msalInstanceGoogle = new PublicClientApplication(
  msalConfig("google")
);
export const msalInstance = new PublicClientApplication(msalConfig("ms"));
