import {
  ApproveJoinRequestInput,
  ApproveJoinRequestOutput,
  InviteGateway,
} from "./InviteGateway";

export class HttpInviteGateway implements InviteGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async approveJoinRequest(
    request: ApproveJoinRequestInput,
    jwtToken: string
  ): Promise<ApproveJoinRequestOutput> {
    const body = JSON.stringify({
      invite_id: request.inviteId,
      approved: request.approved,
    });
    const response = await fetch(
      `${this.baseUrl}/private/invite/response-join`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: body,
      }
    );
    if (!response.ok) {
      throw new Error("Falha em aceitar convidado");
    }

    const jsonResponse = await response.json();

    return {
      message: jsonResponse["message"],
    };
  }
}
