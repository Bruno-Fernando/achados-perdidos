"use client";

import { Button } from "@/components/ui/Button";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";
import { useEffect, useState } from "react";

function CopyToClipboard() {
  const [showClipboard, setShowClipboard] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    setShowClipboard(true);
  };

  useEffect(() => {
    if (showClipboard) {
      setTimeout(() => {
        setShowClipboard(false);
      }, 1500);
    }
  }, [showClipboard]);

  return (
    <Button
      onClick={copyLink}
      variant="outline"
      className="relative overflow-hidden transition-opacity duration-300 ease-in-out"
    >
      <ClipboardCopy
        className={`absolute max-h-0 overflow-hidden transition-all duration-300 ease-in-out ${
          !showClipboard && "max-h-full"
        }`}
      />
      <ClipboardCheck
        className={`relative left-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out  ${
          showClipboard && "max-h-full"
        }`}
      />
    </Button>
  );
}

export default CopyToClipboard;
