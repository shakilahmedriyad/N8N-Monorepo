import { PAGINATION } from "@repo/contracts";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const WorkflowParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadWorkflowParams = createLoader(WorkflowParams);
