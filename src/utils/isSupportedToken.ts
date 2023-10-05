import { SupportedTokenNames } from "types/supportedTokens";

export function isSupportedTokenName(tokenName: string): boolean {
  const supportedTokens: SupportedTokenNames[] = [
    "dooropen",
    "aura",
    "lyda",
    "tonstarter",
  ];
  return supportedTokens.includes(tokenName as SupportedTokenNames);
}
