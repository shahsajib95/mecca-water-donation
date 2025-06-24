import axios from "axios";
import React, { useEffect, useState } from "react";

const EmlViewer = ({ emlUrl, setLoading }: any) => {
  const [emailContent, setEmailContent] = useState("");
  const [error, setError] = useState("");

  const fetchEmlContent = async () => {
    try {
      const response = await axios.get(emlUrl, {
        responseType: "text", // Ensures the response is plain text
      });
      console.log(response)
      setEmailContent(response.data); // Set the content in state
      setError(""); // Clear any previous errors
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch .eml file: " + err.message);
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchEmlContent(emlUrl);
  }, [emlUrl]);

  return (
    <div>
     

      {error && <p style={{ color: "red" }}>{error}</p>}
      <pre
        style={{
          whiteSpace: "pre-wrap",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        {emailContent}
      </pre>
    </div>
  );
};

export default EmlViewer;
