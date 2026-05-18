import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'ems_login',
  exposes: {
    './Routes': 'apps/ems_login/src/app/remote-entry/entry.routes.ts',
  },
  remotes: [
    'ems_list_employee'
  ]
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
