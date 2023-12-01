export default {
  expo: {
    name: 'Girls Write Now',
    slug: 'girls-write-now',
    owner: 'girlswritenowdev',
    version: '0.0.1',
    orientation: 'portrait',
    icon: './assets/app_logo.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 3000,
    },
    assetBundlePatterns: ['assets/*'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'org.calblueprint.girlswritenow',
      icon: './assets/app_logo.png',
      buildNumber: '1',
    },
    android: {
      package: 'org.calblueprint.girlswritenow',
      versionCode: 1,
      icon: './assets/app_logo.png',
    },
    web: {
      //   favicon: './assets/images/favicon.png',
    },
    extra: {
      eas: {
        projectId: '12e1580c-e57a-466e-bc0d-c7a051565998',
      },
    },
  },
};
