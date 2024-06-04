import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Avatar, UnstyledButton } from "@mantine/core";
import { Menu } from "@mantine/core";

const UserButton = () => (
  <div className="account d-flex gap-2 align-items-center">
    <div className="account-image">
      <Avatar size="md" radius="sm" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png" />
    </div>
    <div className="account-details d-flex flex-column">
      <span className="name">Muhammad Alvito</span>
      <span className="email">muhammadalvito23@gmail.com</span>
    </div>
    <IoMdArrowDropdown className="fs-4" />
  </div>
);

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container-fluid mx-3">
          <div className="d-flex align-items-center">
            <a href="/" className="brand">
              Alvito Game Store
            </a>
          </div>
          <div className="d-flex gap-3 align-items-center">
            {/* <button className="notification bg-transparent border-0 text-white">
              <Indicator inline processing color="red" size={12}>
                <IoIosNotifications className="fs-2" />
              </Indicator>
            </button> */}
            <Menu shadow="md" width={278}>
              <Menu.Target>
                <UnstyledButton>
                  <UserButton />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item /* leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} */>Akun Saya</Menu.Item>
                <Menu.Item /* leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} */>Pengaturan</Menu.Item>
                <Menu.Divider />
                <Menu.Item /* leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />} */>Ganti Akun</Menu.Item>
                <Menu.Item color="red" /* leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} */>Hapus Akun</Menu.Item>
                <Menu.Item color="red" /* leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />} */>Keluar</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
