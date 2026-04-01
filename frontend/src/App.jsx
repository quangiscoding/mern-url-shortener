import { useState } from "react";
import axios from "axios";
import { QRCode } from "react-qr-code";
import QRCodeGenerator from "qrcode";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState("");

  const handleShorten = async () => {
    if (!url) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl: url,
      });

      const newShortUrl = res.data.shortUrl;

      setShortUrl(newShortUrl);
      setCopied(false);

      const qr = await QRCodeGenerator.toDataURL(newShortUrl);
      setQrImage(qr);
    } catch (error) {
      console.log("Error shortening URL:", error);
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Short URL copied!");
    } catch {
      toast.error("Failed to copy");
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-4xl font-bold mb-4 text-center">URL SHORTENER</h1>
      {/* Input Section */}
      <div className="flex flex-col gap-3 w-full max-w-3xl">
        <input
          type="text"
          className="input input-success w-full"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button
          className="btn btn-primary w-full sm:w-auto"
          onClick={handleShorten}
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>
      {/* Short URL Display */}
      {shortUrl && (
        <div className="flex flex-col items-center max-w-3xl w-full">
          <p className="font-medium mb-2">Your short URL:</p>
          <a
            href={shortUrl}
            className="link link-primary break-all"
            target="_blank"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className={`btn mt-2 w-full ${copied ? "btn-success" : "btn-secondary"}`}
          >
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>
      )}
      {/* QR Code Display */}
      {shortUrl && (
        <div className="bg-white p-4 rounded-lg shadow mt-6">
          <p className="mb-2 text-center font-semibold text-gray-800">
            Scan QR Code
          </p>
          <QRCode value={shortUrl} size={180} />
        </div>
      )}
      {qrImage && (
        <a
          className="btn btn-accent mt-3 max-w-3xl w-full"
          download="qrcode.png"
          href={qrImage}
        >
          Download QR Code
        </a>
      )}
    </div>
  );
};

export default App;
