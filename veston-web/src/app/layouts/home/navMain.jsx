import React from 'react';
import {
  Home,
  Settings,
  Trello,
  UsersRound,
  WarehouseIcon,
} from 'lucide-react';
import LinkWithToolTip from '@/app/components/LinkWithToolTip';

export default function NavHome() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex py-10">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <LinkWithToolTip href={'/home'} textToolTip={'Home'}>
          <Home className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </LinkWithToolTip>

        <LinkWithToolTip href={'/branch'} textToolTip={'Branch'}>
          <Trello className="h-6 w-6" />
          <span className="sr-only">Branch</span>
        </LinkWithToolTip>

        <LinkWithToolTip href={'/employee'} textToolTip={'Employee'}>
          <UsersRound className="h-6 w-6" />
          <span className="sr-only">Employee</span>
        </LinkWithToolTip>

        <LinkWithToolTip href={'/material'} textToolTip={'Material'}>
          <WarehouseIcon className="h-6 w-6" />
          <span className="sr-only">Material</span>
        </LinkWithToolTip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <LinkWithToolTip href={'#'} textToolTip={'Settings'}>
          <Settings className="h-6 w-6" />
          <span className="sr-only">Settings</span>
        </LinkWithToolTip>
      </nav>
    </aside>
  );
}
