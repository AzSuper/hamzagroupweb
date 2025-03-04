"use client";

import React from 'react';
import { redirect } from 'next/navigation';

const ActionButton = ({ title, link }) => {
  return (
    <button style={{ borderRadius: "6px" }} className="px-6 py-3 border border-blue-700 text-blue-700 font-semibold hover:bg-blue-700 hover:text-white transition duration-300 w-fit" onClick={() => redirect(link)}>
      {title}
    </button>
  );
};

export default ActionButton;
