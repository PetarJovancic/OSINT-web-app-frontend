import React, { useState } from "react";
import Modal from "react-modal";
import "./ScanResults.css";
import { fetchScanById } from "../api/API";
import { ClipLoader } from "react-spinners";

Modal.setAppElement("#root");

function ScanResults({ results }) {
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetailsId, setLoadingDetailsId] = useState(null);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const openDetailsModal = async (id) => {
    setLoading(true);
    setLoadingDetailsId(id);
    try {
      const result = await fetchScanById(id);
      setSelectedResult(result);
      setDetailsModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching scan details:", error);
    } finally {
      setLoading(false);
      setLoadingDetailsId(null);
    }
  };

  const closeDetailsModal = () => {
    setSelectedResult(null);
    setDetailsModalIsOpen(false);
  };

  return (
    <div>
      <h2>Scan Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="scan-results">
          {results.map((result) => (
            <div key={result.id} className="scan-result-card">
              <h3 className="left-align">Domain: {result.website}</h3>
              <p className="left-align">Status: {result.status}</p>
              <p className="left-align">
                Start Time: {formatDate(result.created_at)}
              </p>
              <p className="left-align">
                End Time:{" "}
                {result.completed_at
                  ? formatDate(result.completed_at)
                  : "In Progress"}
              </p>
              <button
                onClick={() => openDetailsModal(result.id)}
                disabled={loading && loadingDetailsId === result.id}
              >
                {loading && loadingDetailsId === result.id ? (
                  <ClipLoader size={20} color={"#fff"} loading={true} />
                ) : (
                  "View Details"
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={detailsModalIsOpen}
        onRequestClose={closeDetailsModal}
        contentLabel="Details Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeDetailsModal} className="close-button">
          X
        </button>
        {loading ? (
          <div className="loader">
            <ClipLoader size={50} color={"#6a0dad"} loading={true} />
          </div>
        ) : (
          selectedResult && (
            <div className="details-container">
              <h3>Scan Details for {selectedResult.website}</h3>
              <div className="details-item">
                <strong>Emails:</strong>
                <ul>
                  {selectedResult.emails.length > 0 ? (
                    selectedResult.emails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </div>
              <div className="details-item">
                <strong>IPs:</strong>
                <ul>
                  {selectedResult.ips.length > 0 ? (
                    selectedResult.ips.map((ip, index) => (
                      <li key={index}>{ip}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </div>
              <div className="details-item">
                <strong>Subdomains:</strong>
                <ul>
                  {selectedResult.subdomains.length > 0 ? (
                    selectedResult.subdomains.map((subdomain, index) => (
                      <li key={index}>{subdomain}</li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
}

export default ScanResults;
