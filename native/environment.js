import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://127.0.0.1:4000",
    wsApiUrl: "ws://127.0.0.1:4000",
    amplitudeApiKey: null
  },
  staging: {
    apiUrl: "[your.staging.api.here]",
    wsApiUrl: "[your.staging.wsapi.here]",
    amplitudeApiKey: "[Enter your key here]"
    // Add other keys you want here
  },
  prod: {
    apiUrl: "[your.production.api.here]",
    wsApiUrl: "[your.production.wsapi.here]",
    amplitudeApiKey: "[Enter your key here]"
    // Add other keys you want here
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
