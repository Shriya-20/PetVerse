"use client";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import Theme from "@/app/components/Theme";
import Accounts from "@/app/components/Accounts";
import DeleteAccount from "@/app/components/DeleteAccount";
import Logout from "@/app/components/Logout";
import EditProfile from "@/app/components/EditProfile";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const settingsList = [
  {
    id: 1,
    heading: "Edit profile",
    body: EditProfile,
  },
  {
    id: 2,
    heading: "Accounts",
    body: Accounts,
  },
  {
    id: 3,
    heading: "Theme",
    body: Theme,
  },
  {
    id: 4,
    heading: "Log out",
    body: Logout,
  },
  {
    id: 5,
    heading: "Delete Account",
    body: DeleteAccount,
  },
];

export default function Settings() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="mx-10 mt-10">
        <div className="mb-4">
          <p className="text-3xl">Settings</p>
        </div>
        <div className="">
          {settingsList.map((setting) => (
            <>
              <div key={setting.id}>
                <Accordion
                  open={open === setting.id}
                  icon={<Icon id={setting.id} open={open} />}
                  className="settings-accordian"
                >
                  <AccordionHeader
                    onClick={() => handleOpen(setting.id)}
                    className="settings-accordian-heading"
                  >
                    {setting.heading}
                  </AccordionHeader>
                  <AccordionBody>
                    <setting.body />
                  </AccordionBody>
                </Accordion>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
