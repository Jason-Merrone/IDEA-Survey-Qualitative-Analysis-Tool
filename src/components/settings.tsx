"use client";
import React, { useState } from 'react';
import "~/styles/settings.css";

const Settings = () => {
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [exportMethod, setExportMethod] = useState("pdf"); // default export method

  const handleSaveSettings = () => {
    // Logic to save settings, e.g., sending to a backend API
    alert("Settings saved!");
  };

  return (
    <div className="settings-page roboto-regular">
      <h1>Settings</h1>

      {/* Preferred Name */}
      <div className="setting">
        <label htmlFor="preferredName">Preferred Name:</label>
        <input
          type="text"
          id="preferredName"
          value={preferredName}
          onChange={(e) => setPreferredName(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div className="setting">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="abc@email.com"
        />
      </div>

      {/* Export Method */}
      <div className="setting">
        <label>Preferred Export Method:</label>
        <select value={exportMethod} onChange={(e) => setExportMethod(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </div>

      {/* Save Button */}
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default Settings;
