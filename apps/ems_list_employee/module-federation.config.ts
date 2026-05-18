import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'ems_list_employee',
  exposes: {
    './Routes': 'apps/ems_list_employee/src/app/remote-entry/entry.routes.ts',
  },
  remotes: [
    'ems_login',
    'ems_add_employee',
    'ems_employee_detail',
  ],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
