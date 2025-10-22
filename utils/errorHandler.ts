// // utils/errorHandler.ts
// import type { SerializedError } from '@reduxjs/toolkit';
// import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// /**
//  * Type guard: checks if an error has an `error` field
//  */
// function hasErrorField(
//   err: FetchBaseQueryError | SerializedError,
// ): err is Extract<FetchBaseQueryError, { error: string }> {
//   return (err as any)?.error !== undefined;
// }

// /**
//  * Safely extract a human-readable error message
//  */
// export function getErrorMessage(
//   err: unknown,
//   fallback = 'Something went wrong, please try again',
// ): string {
//   if (!err) return fallback;

//   // Case: FetchBaseQueryError with { data: { message } }
//   if ((err as FetchBaseQueryError)?.data && typeof (err as FetchBaseQueryError).data === 'object') {
//     const data = (err as FetchBaseQueryError).data as { message?: string };
//     if (data?.message) return data.message;
//   }

//   // Case: FetchBaseQueryError with { error }
//   //   if (hasErrorField(err as FetchBaseQueryError)) {
//   //     return String((err as FetchBaseQueryError).error);
//   //   }

//   if (typeof err === 'object' && err !== null && 'error' in err) {
//     return String((err as { error: string }).error);
//   }

//   // Case: SerializedError with { message }
//   if ((err as SerializedError)?.message) {
//     return (err as SerializedError).message as string;
//   }

//   return fallback;
// }
// ======================= after lint fix 70ct
// utils/errorHandler.ts
// import type { SerializedError } from '@reduxjs/toolkit';
// import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// /**
//  * Type guard: checks if an error has an `error` field
//  */
// function hasErrorField(
//   err: FetchBaseQueryError | SerializedError,
// ): err is Extract<FetchBaseQueryError, { error: string }> {
//   return typeof (err as Record<string, unknown>)?.error === 'string';
// }

// /**
//  * Safely extract a human-readable error message
//  */
// export function getErrorMessage(
//   err: unknown,
//   fallback = 'Something went wrong, please try again',
// ): string {
//   if (!err) return fallback;

//   // Case: FetchBaseQueryError with { data: { message } }
//   if (
//     typeof err === 'object' &&
//     err !== null &&
//     'data' in err &&
//     typeof (err as FetchBaseQueryError).data === 'object'
//   ) {
//     const data = (err as FetchBaseQueryError).data as { message?: string };
//     if (data?.message) return data.message;
//   }

//   // Case: FetchBaseQueryError with { error }
//   if (hasErrorField(err as FetchBaseQueryError)) {
//     return String((err as FetchBaseQueryError).error);
//   }

//   // Case: SerializedError with { message }
//   if (
//     typeof err === 'object' &&
//     err !== null &&
//     'message' in err &&
//     typeof (err as SerializedError).message === 'string'
//   ) {
//     return (err as SerializedError).message as string;
//   }

//   return fallback;
// }
// =================
// =================
// =================
// utils/errorHandler.ts
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(
  err: unknown,
  fallback = 'Something went wrong, please try again',
): string {
  if (!err) return fallback;

  // Case: FetchBaseQueryError with { data: { message } }
  if (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof (err as FetchBaseQueryError).data === 'object'
  ) {
    const data = (err as FetchBaseQueryError).data as { message?: string };
    if (data?.message) return data.message;
  }

  // Case: FetchBaseQueryError with { error: string }
  if (
    typeof err === 'object' &&
    err !== null &&
    'error' in err &&
    typeof (err as { error?: string }).error === 'string'
  ) {
    return (err as { error: string }).error;
  }

  // Case: SerializedError with { message }
  if (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as SerializedError).message === 'string'
  ) {
    return (err as SerializedError).message ?? fallback;
  }

  return fallback;
}
