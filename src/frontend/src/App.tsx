import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Shield, ExternalLink } from "lucide-react"

export default function Component() {
  // Mock data - replace with actual data from your backend
  const isConnected = true
  const walletAddress = "rdmx6-jaaaa-aaaah-qcaiq-cai"
  const userDAOs = [
    {
      id: 1,
      name: "OpenChat",
      neuronIds: [
        "27af8b9c4c2c8e5f1a3d7b9e2f4a6c8d",
        "8f3e2a1b5c7d9e4f6a8b2c5d7e9f1a3b",
        "1b4d7f2a9c6e8f3b5d8a2c4f7e9b1d6a",
      ],
    },
    {
      id: 2,
      name: "Sonic",
      neuronIds: ["9e2f5a8b1c4d7f3a6c9e2b5d8f1a4c7e", "3c6f9b2e5a8d1f4b7e0c3f6a9d2e5b8f"],
    },
    {
      id: 3,
      name: "ICPSwap",
      neuronIds: ["7a4d1f8e2b5c9f6a3e8b1d4f7a0c3e6b"],
    },
    {
      id: 4,
      name: "Catalyze",
      neuronIds: [
        "2e5b8f1a4c7e0d3f6a9c2e5b8f1a4d7f",
        "6a9d2e5b8f1c4f7a0e3b6d9c2f5a8e1b",
        "4f7a0c3e6b9d2f5a8e1b4d7f0a3c6e9b",
        "8e1b4d7f0a3c6f9b2e5a8d1f4b7e0c3f",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">DAO Access Bot</h1>
              </div>
            </div>

            {/* Wallet Connection Status */}
            <div className="flex items-center space-x-3">
              {isConnected ? (
                <div className="flex items-center">
                  <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button>Connect Wallet</Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your DAO Access</h2>
          <p className="text-gray-600">
            Manage your participation in decentralized autonomous organizations on the Internet Computer.
          </p>
        </div>

        {/* DAO List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {userDAOs.map((dao) => (
            <Card key={dao.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="px-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{dao.name}</h3>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium">
                    {dao.neuronIds.length} Neuron{dao.neuronIds.length !== 1 ? "s" : ""}
                  </p>
                  <div className="space-y-1">
                    {dao.neuronIds.map((neuronId, index) => (
                      <div key={index} className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                        {neuronId.slice(0, 8)}...{neuronId.slice(-8)}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no DAOs) */}
        {userDAOs.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No SNS DAOs</h3>
            <p className="text-gray-600 mb-4">You don't have any SNS DAO neurons yet.</p>
            <Button>Browse Available DAOs</Button>
          </div>
        )}
      </main>
    </div>
  )
}
