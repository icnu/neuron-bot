import { Check, Copy } from "lucide-react";
import { useState } from "react"
import { Button } from "@/components/ui/button";

export default function CopyWrapper({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const copyWalletAddress = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy wallet address:", err);
        }
    }

    return (
        <Button variant="ghost" size="icon" className="cursor-pointer" onClick={copyWalletAddress}>
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </Button>
    );
}