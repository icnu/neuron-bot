"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Copy, Check } from "lucide-react"
import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

export default function Component() {
  const [isConnected, setIsConnected] = useState(true)
  const principalAddress = "rdmx6-jaaaa-aaaah-qcaiq-cai"
  const [copied, setCopied] = useState(false)

  const [state, setState] = useState<{ authClient: AuthClient | undefined, isAuthenticated: boolean }>({
    authClient: undefined,
    isAuthenticated: false,
  });

  // Initialize auth client
  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    console.log(await (await fetch('http://localhost:3000/ping')).json());
    const authClient = await AuthClient.create({
      keyType: "Ed25519"
    });
    const identity = authClient.getIdentity();
    console.log("Identity: ", identity);
    const isAuthenticated = await authClient.isAuthenticated();

    setState((prev) => ({
      ...prev,
      authClient,
      isAuthenticated
    }));
  };

  const login = async () => {
    await state.authClient?.login({
      identityProvider: "http://vg3po-ix777-77774-qaafa-cai.localhost:4943/",
      onSuccess: updateActor
    });
  };

  const logout = async () => {
    await state.authClient?.logout();
    updateActor();
  };

  const connectToInternetIdentity = () => {
    // Replace with actual Internet Identity connection logic
    setIsConnected(true)
  }

  const copyPrincipalAddress = async () => {
    try {
      await navigator.clipboard.writeText(principalAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy principal address:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">DAO Access Bot</h1>
                <p className="text-sm text-gray-500">ICP Network</p>
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center space-x-3">
              {isConnected ? (
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">Connected</span>
                </div>
              ) : (
                <Button onClick={connectToInternetIdentity}>Connect to Internet Identity</Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          /* Not Connected State */
          <div className="text-center py-20">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect to Get Started</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Connect your Internet Identity to manage your DAO access and configure neurons for the Discord bot.
            </p>
            <Button size="lg" onClick={connectToInternetIdentity}>
              Connect to Internet Identity
            </Button>
          </div>
        ) : (
          /* Connected State - Show Instructions */
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Instructions</h2>
              <p className="text-gray-600">Follow these steps to add neurons to the DAO Access Bot.</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Neurons to DAO Access Bot</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Principal Address (Hot Key):</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-50 px-3 py-2 rounded border font-mono text-sm">
                        {principalAddress}
                      </div>
                      <Button variant="outline" size="icon" onClick={copyPrincipalAddress}>
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Steps to Add Neurons:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                      <li>Open your NNS wallet or SNS frontend</li>
                      <li>Navigate to your neurons</li>
                      <li>Select the neuron you want to add to the bot</li>
                      <li>Go to neuron settings or management</li>
                      <li>Add the principal address above as a "Hot Key"</li>
                      <li>Confirm the transaction</li>
                      <li>The bot will automatically detect your neurons</li>
                    </ol>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Important Notes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                      <li>Hot keys allow the bot to vote on your behalf</li>
                      <li>You maintain full control and can remove hot keys anytime</li>
                      <li>The bot only has voting permissions, not transfer permissions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
