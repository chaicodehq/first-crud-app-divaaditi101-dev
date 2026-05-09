/**
 * TODO: Handle errors
 *
 * Required error format: { error: { message: "..." } }
 *
 * Handle these cases:
 * 1. Mongoose ValidationError → 400 with combined error messages
 * 2. Mongoose CastError → 400 with "Invalid id format"
 * 3. Other errors → Use err.status (or 500) and err.message
 */
export function errorHandler(err, req, res, next) {
  
  // 1. Mongoose ValidationError (e.g. required field missing, minlength failed)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors)  // get all field errors
      .map((e) => e.message)                    // extract just the message text
      .join(", ");                              // combine into one string
    return res.status(400).json({ error: { message: messages } });
  }

  // 2. Mongoose CastError (e.g. invalid MongoDB ObjectId format)
  if (err.name === "CastError") {
    return res.status(400).json({ error: { message: "Invalid id format" } });
  }

  // 3. Everything else — use the error's own status/message if available
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  return res.status(status).json({ error: { message } });
}
