"use client";
import React, { useState } from "react";
import "~/styles/login.css";

import { checkUserExists } from "~/server/db/queries/get";
import { createUser } from "~/server/db/queries/create";
import { createUserSession } from "~/actions/session";
import { type SessionData } from "~/app/api/lib";
import { useToast } from "~/components/toast";

import { useRouter } from "next/navigation";

const CreateAccount = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const [aNumber, setANumber] = useState("");
  const [name, setName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  async function handleSaveAccount() {
    const userExists = await checkUserExists(aNumber);
    if (userExists.data?.exists) {
      alert("User already exists. Please login.");
    } else {
      const sessionData: SessionData = {
        aNumber: aNumber,
        name: name,
        preferredName: preferredName,
        email: email,
        role: role,
        isLoggedIn: true,
      };

      await createUser(aNumber, name, preferredName, email, role);

      await createUserSession(sessionData);

      showToast("Account created successfully", "success");
      router.push("/");
    }
  }

  return (
    <div className="login-page roboto-regular">
      <div className="login">
        <label htmlFor="aNumber">Account Number:</label>
        <input
          type="text"
          id="aNumber"
          value={aNumber}
          onChange={(e) => setANumber(e.target.value)}
          placeholder="A00000000"
        />
      </div>

      <div className="login">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className="login">
        <label htmlFor="preferredName">Preferred Name:</label>
        <input
          type="text"
          id="preferredName"
          value={preferredName}
          onChange={(e) => setPreferredName(e.target.value)}
          placeholder="John"
        />
      </div>

      <div className="login">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john.doe@example.com"
        />
      </div>

      <div className="login">
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>
          <option value="STAFF">Staff</option>
          <option value="FACULTY">Faculty</option>
          <option value="DP_HEAD">Department Head</option>
        </select>
      </div>

      <button onClick={handleSaveAccount}>Create Account</button>
    </div>
  );
};

export default CreateAccount;
