export const NodeType = {
  INITIAL: "INITIAL",
  MANUAL_TRIGGER: "MANUAL_TRIGGER",
  HTTP_TRIGGER: "HTTP_TRIGGER",
  GOOGLE_FORM_TRIGGER: "GOOGLE_FORM_TRIGGER",
} as const;

export type NodeType = keyof typeof NodeType;
