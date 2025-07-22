import { createActor } from "./bindings";
import { ProposalData } from "./bindings/governance.did";

export class GovernanceServiceClass {
    async listLastProposal(canisterId: string): Promise<ProposalData> {
        const actor = await createActor(canisterId);
        const proposals = await actor.list_proposals({
            include_reward_status: [],
            before_proposal: [],
            limit: 1,
            include_status: [],
            exclude_type: [],
            include_topics: []
        });

        return proposals.proposals[0];
    }
}

export const GovernanceService = new GovernanceServiceClass();