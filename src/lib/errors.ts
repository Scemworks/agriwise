import { NextResponse } from "next/server";
import { logger } from "./logger";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, any>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 400, true, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(
    message: string = "Authentication required",
    context?: Record<string, any>,
  ) {
    super(message, 401, true, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string = "Insufficient permissions",
    context?: Record<string, any>,
  ) {
    super(message, 403, true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = "Resource not found",
    context?: Record<string, any>,
  ) {
    super(message, 404, true, context);
  }
}

export class ConflictError extends AppError {
  constructor(
    message: string = "Resource conflict",
    context?: Record<string, any>,
  ) {
    super(message, 409, true, context);
  }
}

export class RateLimitError extends AppError {
  constructor(
    message: string = "Rate limit exceeded",
    context?: Record<string, any>,
  ) {
    super(message, 429, true, context);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string, context?: Record<string, any>) {
    super(
      `External service error (${service}): ${message}`,
      502,
      true,
      context,
    );
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(`Database error: ${message}`, 500, true, context);
  }
}

// Error response formatter
export function formatErrorResponse(
  error: AppError,
  includeStack = false,
): Record<string, any> {
  const response: Record<string, any> = {
    error: error.message,
    statusCode: error.statusCode,
    timestamp: new Date().toISOString(),
  };

  if (error.context) {
    response.context = error.context;
  }

  if (includeStack && process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  return response;
}

// Global error handler
export function handleError(error: unknown, _request?: Request): NextResponse {
  // Log the error
  if (error instanceof AppError) {
    logger.error(error.message, {
      statusCode: error.statusCode,
      isOperational: error.isOperational,
      context: error.context,
    });
  } else if (error instanceof Error) {
    logger.error(error.message, {
      stack: error.stack,
      name: error.name,
    });
  } else {
    logger.error("Unknown error occurred", { error });
  }

  // Handle different error types
  if (error instanceof AppError) {
    const response = formatErrorResponse(
      error,
      process.env.NODE_ENV === "development",
    );
    return NextResponse.json(response, { status: error.statusCode });
  }

  if (error instanceof Error) {
    // Handle known error types
    if (error.name === "ValidationError") {
      return NextResponse.json(
        formatErrorResponse(new ValidationError(error.message)),
        { status: 400 },
      );
    }

    if (error.name === "UnauthorizedError") {
      return NextResponse.json(
        formatErrorResponse(new AuthenticationError(error.message)),
        { status: 401 },
      );
    }

    if (error.name === "ForbiddenError") {
      return NextResponse.json(
        formatErrorResponse(new AuthorizationError(error.message)),
        { status: 403 },
      );
    }

    if (error.name === "NotFoundError") {
      return NextResponse.json(
        formatErrorResponse(new NotFoundError(error.message)),
        { status: 404 },
      );
    }

    if (error.name === "ConflictError") {
      return NextResponse.json(
        formatErrorResponse(new ConflictError(error.message)),
        { status: 409 },
      );
    }

    if (error.name === "RateLimitError") {
      return NextResponse.json(
        formatErrorResponse(new RateLimitError(error.message)),
        { status: 429 },
      );
    }

    // Generic server error
    return NextResponse.json(
      formatErrorResponse(new AppError("Internal server error", 500)),
      { status: 500 },
    );
  }

  // Unknown error
  return NextResponse.json(
    formatErrorResponse(new AppError("An unexpected error occurred", 500)),
    { status: 500 },
  );
}

// Async error wrapper
export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    return await fn(...args);
  };
}

// Error boundary for API routes
export function withErrorHandling<T extends any[], _R>(
  handler: (...args: T) => Promise<NextResponse>,
): (...args: T) => Promise<NextResponse> {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleError(error, args[0] as Request);
    }
  };
}

// Validation error helper
export function createValidationError(
  field: string,
  message: string,
): ValidationError {
  return new ValidationError(
    `Validation failed for field '${field}': ${message}`,
    { field },
  );
}

// Database error helper
export function createDatabaseError(
  operation: string,
  originalError: any,
): DatabaseError {
  const message = `Database operation '${operation}' failed`;
  return new DatabaseError(message, {
    operation,
    originalError: originalError?.message || "Unknown database error",
  });
}

// External service error helper
export function createExternalServiceError(
  service: string,
  originalError: any,
): ExternalServiceError {
  const message = originalError?.message || "Service unavailable";
  return new ExternalServiceError(service, message, {
    originalError: originalError?.message || "Unknown service error",
  });
}

// Rate limit error helper
export function createRateLimitError(
  limit: number,
  window: number,
): RateLimitError {
  return new RateLimitError(
    `Rate limit exceeded: ${limit} requests per ${window}ms`,
    {
      limit,
      window,
    },
  );
}
