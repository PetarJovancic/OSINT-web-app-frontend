import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ScanForm from "./components/ScanForm";
import ScanResults from "./components/ScanResults";
import { fetchAllScans, initiateScan } from "./api/API";
import "./App.css";
import logo from "./assets/logo.png";
import { Image } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

Modal.setAppElement("#root");

function App() {
  const [scanResults, setScanResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fetchingResults, setFetchingResults] = useState(false);

  const fetchData = async () => {
    setFetchingResults(true);
    try {
      const results = await fetchAllScans();
      setScanResults(results);
    } catch (error) {
      console.error("Error fetching scan results:", error);
    } finally {
      setFetchingResults(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScan = async (scanRequest) => {
    setLoading(true);
    try {
      const newScanResult = await initiateScan(scanRequest);
      setScanResults((prevResults) => [newScanResult, ...prevResults]);
      closeModal();
    } catch (error) {
      console.error("Error initiating scan:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <div className="card main-card">
        <Image src={logo} fluid rounded className="logo" />
        <h2 className="left-align">OSINT Domain Scanner</h2>
        <p className="main-title">
          Efficiently scan domains using the OSINT tools Amass and theHarvester,
          providing crucial information for cybersecurity and research purposes.
        </p>
        <button onClick={openModal}>Scan a website</button>
      </div>
      {fetchingResults ? (
        <div className="loader">
          <ClipLoader size={50} color={"#6a0dad"} loading={true} />
        </div>
      ) : (
        <ScanResults results={scanResults} />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Scan Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close-button">
          X
        </button>
        <h3>New Scan</h3>
        <div className="form-card">
          <ScanForm onScan={handleScan} loading={loading} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
