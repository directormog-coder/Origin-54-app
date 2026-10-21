export function normalizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong. Please try again.";
}

export function handleApiError(error: unknown, fallbackMessage = "Something went wrong.") {
  return normalizeErrorMessage(error) || fallbackMessage;
}
