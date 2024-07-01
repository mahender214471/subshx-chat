import React from "react";
import { UserAvtar } from "./Avtar";
import {
  EllipsisVerticalIcon,
  UserGroupIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
export default function ChatHeader() {
  return (
    <div className="p-4 border-b border-gray-300 flex justify-between items-center  text-white bg-gradient-to-r from-fuchsia-500 to-pink-500">
      <UserAvtar name="mk" />
      <h1 className="text-2xl font-semibold">Subbx Infotech</h1>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <EllipsisVerticalIcon className="w-6 h-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem>
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4" />
                    <p className="pl-4">Profile</p>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/group">
                <DropdownMenuItem>
                  <div className="flex items-center">
                    <UserGroupIcon className="w-4 h-4" />
                    <p className="pl-4">Add new group</p>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>
                <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
