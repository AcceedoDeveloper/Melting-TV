import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.acceedo.meltingtv',
  appName: 'melting-tv',
  webDir: 'dist/melting-tv/browser',

  server: {
    androidScheme: 'http',   
    cleartext: true          
  }
};

export default config;
