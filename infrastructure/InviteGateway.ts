export interface InviteGateway {
  approveJoinRequest(
    request: ApproveJoinRequestInput,
    jwtToken: string
  ): Promise<ApproveJoinRequestOutput>;
}

export interface ApproveJoinRequestInput {
  inviteId: number;
  approved: boolean;
}

export interface ApproveJoinRequestOutput {
  message: string;
}
