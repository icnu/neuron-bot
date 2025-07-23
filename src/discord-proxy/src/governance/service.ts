import { Principal } from "@dfinity/principal";
import { HttpAgent, Identity } from "@dfinity/agent";
import { SnsGovernanceCanister, SnsNeuron, SnsNeuronId, SnsProposalData, SnsProposalId } from "@dfinity/sns";

export class GovernanceServiceClass {
    async listLastProposal(canisterId: string): Promise<SnsProposalData> {
        const governance = await SnsGovernanceCanister.create({
            canisterId: Principal.fromText(canisterId)
        });
        const proposals = await governance.listProposals({
            limit: 1
        });

        return proposals.proposals[0];
    }

    async listNeurons(canisterId: string, principal: string): Promise<SnsNeuron[]> {
        const governance = await SnsGovernanceCanister.create({
            canisterId: Principal.fromText(canisterId)
        });
        const neurons = await governance.listNeurons({
            principal: Principal.fromText(principal),
            limit: 10,
        });

        return neurons;
    }

    async vote(canisterId: string, identity: Identity, neuronId: SnsNeuronId, proposalId: SnsProposalId, vote: number) {
        const governance = await SnsGovernanceCanister.create({
            canisterId: Principal.fromText(canisterId),
            agent: await HttpAgent.create({ identity })
        });

        await governance.manageNeuron({
            subaccount: neuronId.id,
            command: [{
                'RegisterVote': {
                    vote, proposal: [proposalId]
                }
            }]
        });
    }
}

export const GovernanceService = new GovernanceServiceClass();