import React, { useState } from "react";
import "./ScanForm.css";
import { ClipLoader } from "react-spinners";

function ScanForm({ onScan, loading }) {
  const [website, setDomain] = useState("");
  const [scan_type, setTool] = useState("THE_HARVESTER");

  const handleSubmit = (event) => {
    event.preventDefault();
    onScan({ website, scan_type });
  };

  return (
    <form onSubmit={handleSubmit} className="scan-form">
      <div className="form-group">
        <label htmlFor="website">Domain:</label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(e) => setDomain(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="scan_type">Tool:</label>
        <select
          id="scan_type"
          value={scan_type}
          onChange={(e) => setTool(e.target.value)}
        >
          <option value="THE_HARVESTER">theHarvester</option>
          <option value="AMASS">Amass</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? (
          <ClipLoader size={20} color={"#fff"} loading={true} />
        ) : (
          "Start Scan"
        )}
      </button>
    </form>
  );
}

export default ScanForm;
