import { Button } from "./button";
import { ArrowDownToLine } from "lucide-react";

interface DownloadButtonProps {
  imageUrl: string;
  fileName?: string;
}

export function DownloadButton({ imageUrl, fileName = "generated-image" }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="flex items-center gap-2"
      variant="outline"
    >
      <ArrowDownToLine className="h-4 w-4" />
      Download Image
    </Button>
  );
}
