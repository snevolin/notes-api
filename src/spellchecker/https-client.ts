export interface ISpellCheckerClientResponse {
  isValid: boolean;
}

// Third-party spell checker client
export interface ISpellCheckerClient {
  post(
    url: string,
    body: any,
    headers: Record<string, string>,
  ): Promise<ISpellCheckerClientResponse>;
}

export class SpellCheckerClient implements ISpellCheckerClient {
  async post(
    url: string,
    body: any,
    headers: Record<string, string>,
  ): Promise<ISpellCheckerClientResponse> {
    // fake delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return { isValid: true };
  }
}
