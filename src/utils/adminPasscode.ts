// 관리자 패스코드는 메모리에만 보관합니다. (sessionStorage/localStorage 저장 금지)
// 페이지를 새로 고치면 사라지며, 필요 시 prompt로 다시 입력받습니다.

let inMemoryPasscode: string | null = null;

export const setAdminPasscode = (code: string) => {
  const trimmed = code.trim();
  inMemoryPasscode = trimmed || null;
};

export const clearAdminPasscode = () => {
  inMemoryPasscode = null;
};

export const getAdminPasscode = (): string => inMemoryPasscode ?? "";

/** 메모리에 없으면 사용자에게 입력을 요청합니다. */
export const requireAdminPasscode = (
  message = "관리자 패스코드를 입력해 주세요.",
): string | null => {
  if (inMemoryPasscode) return inMemoryPasscode;
  const code = window.prompt(message);
  if (code === null) return null;
  const trimmed = code.trim();
  if (!trimmed) return null;
  inMemoryPasscode = trimmed;
  return trimmed;
};
