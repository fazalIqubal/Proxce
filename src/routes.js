import React from 'react';
import Loadable from 'react-loadable';
import MainLayout  from './layout/MainLayout';
import { Import } from './modules/users/component/import';

export const Routes = {
  UNKNOWN : '',
  LOGIN : '/login',
  ROOT : '/',
  DASHBOARD : '/dashboard',
  INVOICES : '/invoices',
  INVOICE_CREATE : '/create-upload',
  JOURNALS : '/journals',
  MANAGE_USERS : '/manage-users',
  SETTINGS : '/settings/node',
  SETTINGS_AZURE : '/settings/azure',
  PROFILE : '/profile',
  REPORT_DRILL_DOWN : '/report/drill-down/:accountId',
  REPORT_AGING : '/report/aging/:accountId'
}

function Loading() {
  return <div>Loading...</div>;
}

const Application = Loadable({
  loader: () => import('./modules/application/component/application'),
  loading: Loading,
});

const ApplicationDetail = Loadable({
  loader: () => import('./modules/application/component/applicationDetail'),
  loading: Loading,
});

const Connections = Loadable({
  loader: () => import('./modules/connections/component/connection'),
  loading: Loading,
});

const ConnectionDetail = Loadable({
  loader: () => import('./modules/connections/component/connectionDetail'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./modules/users/component/users'),
  loading: Loading,
});
const Groups = Loadable({
  loader: () => import('./modules/groups/component/groups'),
  loading: Loading,
});

const UsersDetail = Loadable({
  loader: () => import('./modules/users/component/usersDetail'),
  loading: Loading,
});
const GroupsDetail = Loadable({
  loader: () => import('./modules/groups/component/groupsDetail'),
  loading: Loading,
});
const UserImport = Loadable({
  loader: () => import('./modules/users/component/import'),
  loading: Loading,
});
const UserSpoofAtempts = Loadable({
  loader: () => import('./modules/users/component/spoofAtempts'),
  loading: Loading,
});

const UserSpoofAtemptDetail = Loadable({
  loader: () => import('./modules/users/component/spoofAtemptsDetail'),
  loading: Loading,
});

const Activitylog = Loadable({
  loader: () => import('./modules/activityLog/component/activityLog'),
  loading: Loading,
});

const ActivitylogDetails = Loadable({
  loader: () => import('./modules/activityLog/component/activityLogDetails'),
  loading: Loading,
});

const Tenant = Loadable({
  loader: () => import('./modules/tenant/component/tenant'),
  loading: Loading,
});

const Endpoint = Loadable({
  loader: () => import('./modules/endpoint/component/endpoints'),
  loading: Loading,
});
const EndpointsDetail = Loadable({
  loader: () => import('./modules/endpoint/component/endpointsDetail'),
  loading: Loading,
});

const Transactions = Loadable({
  loader: () => import('./modules/transactions/component/transactions'),
  loading: Loading,
});
const TransactionsDetail = Loadable({
  loader: () => import('./modules/transactions/component/transactionsDetail'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: MainLayout, allowedRoles: ['admin'] },
  { path: '/applications', exact: true, name: 'Applications', component: Application, allowedRoles: ['admin'] },
  { path: '/applications/:id/detail', exact: true, name: 'ApplicationDetail', component: ApplicationDetail, allowedRoles: ['admin'] },
  { path: '/connections', exact: true, name: 'Connections', component: Connections, allowedRoles: ['admin'] },
  { path: '/connections/:id/detail', exact: true, name: 'ConnectionDetail', component: ConnectionDetail, allowedRoles: ['admin'] },
  { path: '/users', exact: true, name: 'Users', component: Users, allowedRoles: ['admin'] },
  { path: '/users/:id/detail', exact: true, name: 'UsersDetail', component: UsersDetail, allowedRoles: ['admin'] },
  { path: '/groups', exact: true, name: 'Groups', component: Groups, allowedRoles: ['admin'] },
  { path: '/groups/:id/detail', exact: true, name: 'GroupsDetail', component: GroupsDetail, allowedRoles: ['admin'] },
  { path: '/import', exact: true, name: 'UserImport', component: UserImport, allowedRoles: ['admin'] },
  { path: '/spoofAtempts', exact: true, name: 'UserSpoofAtempts', component: UserSpoofAtempts, allowedRoles: ['admin'] },
  { path: '/spoofAtempts/:id/detail', exact: true, name: 'UserSpoofAtempts', component: UserSpoofAtemptDetail, allowedRoles: ['admin'] },
  { path: '/activitylog', exact: true, name: 'Activity Log', component: Activitylog, allowedRoles: ['admin'] },
  { path: '/activitylog/:id/detail', exact: true, name: 'Activity Details', component: ActivitylogDetails, allowedRoles: ['admin'] },
  { path: '/tenant', exact: true, name: 'Tenant', component: Tenant, allowedRoles: ['admin'] },
  { path: '/endpoint', exact: true, name: 'Tenant Details', component: Endpoint, allowedRoles: ['admin'] },
  { path: '/endpoint/:id/detail', exact: true, name: 'EndpointsDetail', component: EndpointsDetail, allowedRoles: ['admin'] },
  { path: '/transactions', exact: true, name: 'Transactions', component: Transactions, allowedRoles: ['admin'] },
  { path: '/transactions/:id/detail', exact: true, name: 'TransactionsDetail', component: TransactionsDetail, allowedRoles: ['admin'] },
];

export default routes;


