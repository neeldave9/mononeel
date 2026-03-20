import { defineCollection, z } from "astro:content";

function parseDDMMYYYY(value: string): Date | undefined {
  // Expected format: dd/mm/yyyy (e.g., 28/06/2024)
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return undefined;

  const day = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const year = Number(match[3]);

  const date = new Date(year, monthIndex, day);
  if (isNaN(date.valueOf())) return undefined;
  return date;
}

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional()
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.preprocess((val) => {
      // #region agent log
      try {
        const raw = val as unknown;
        const asString = raw === undefined ? undefined : String(raw);
        const jsParsed = asString ? new Date(asString) : undefined;
        const validJsDate = jsParsed ? !isNaN(jsParsed.valueOf()) : false;

        const parsed = asString ? parseDDMMYYYY(asString) : undefined;
        const validParsedDate = parsed ? !isNaN(parsed.valueOf()) : false;

        fetch("http://127.0.0.1:7513/ingest/a8f64d4d-f2ce-4ba4-874e-ac93dc4fdf7a", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "400e3c",
          },
          body: JSON.stringify({
            sessionId: "400e3c",
            runId: "post_fix",
            hypothesisId: "H2",
            location: "src/content/config.ts:work.dateStart preprocess",
            message: "work.dateStart raw input",
            data: { raw, validJsDate, asString, parsedValid: validParsedDate },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
      } catch {
        // Swallow logging errors; do not break content syncing.
      }
      // #endregion

      if (typeof val === "string") {
        const parsed = parseDDMMYYYY(val) ?? new Date(val);
        if (!isNaN(parsed.valueOf())) return parsed;
      }

      return val;
    }, z.date()),
    dateEnd: z
      .preprocess((val) => {
      // #region agent log
      try {
        const raw = val as unknown;
        const asString = raw === undefined ? undefined : String(raw);
        const jsParsed = asString ? new Date(asString) : undefined;
        const validJsDate = jsParsed ? !isNaN(jsParsed.valueOf()) : false;

        const parsed = asString ? parseDDMMYYYY(asString) : undefined;
        const validParsedDate = parsed ? !isNaN(parsed.valueOf()) : false;

        fetch("http://127.0.0.1:7513/ingest/a8f64d4d-f2ce-4ba4-874e-ac93dc4fdf7a", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "400e3c",
          },
          body: JSON.stringify({
            sessionId: "400e3c",
            runId: "post_fix",
            hypothesisId: raw === undefined ? "H1" : "H2",
            location: "src/content/config.ts:work.dateEnd preprocess",
            message: "work.dateEnd raw input",
            data: { raw, validJsDate, asString, parsedValid: validParsedDate },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
      } catch {
        // Swallow logging errors; do not break content syncing.
      }
      // #endregion

        if (typeof val === "string") {
          // Allow "Present" / other descriptive strings as-is.
          const parsed = parseDDMMYYYY(val);
          if (parsed) return parsed;

          // Fall back to native Date parsing for ISO-like strings.
          const jsParsed = new Date(val);
          if (!isNaN(jsParsed.valueOf())) return jsParsed;
        }

        return val;
      }, z.union([z.date(), z.string()]))
      .optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional()
  }),
});

export const collections = { blog, work, projects };
