import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={30} height={30} />;

const sidebarConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: getIcon('fe:home')
  },
  {
    title: 'Promote',
    path: '/dashboard/promote',
    icon: getIcon(peopleFill)
  },
  {
    title: 'My orders',
    path: '/dashboard/user',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Add menu',
    path: '/dashboard/blog',
    icon: getIcon('feather:grid')
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: getIcon('feather:settings')
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
