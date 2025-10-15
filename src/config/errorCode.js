const server = {
  ERROR: {
    httpStatusCode: 400,
    body: {
      code: "error",
      message: "Something went wrong, please try again later.",
    },
  },

  ALREADY_EXISTS: {
    httpStatusCode: 400,
    body: {
      code: "already_exists",
      message: "Value already existed",
    },
  },

  INTERNAL_SERVER_ERROR: {
    httpStatusCode: 500,
    body: {
      code: "internal_server_error",
      message: "Something went wrong, please try again later.",
    },
  },

  NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "not_found",
      message: "You lost somewhere. Please check url again.",
    },
  },

  FORBIDDEN: {
    httpStatusCode: 403,
    body: {
      code: "forbidden",
      message: "Permission denied.",
    },
  },

  UNAUTHORIZED: {
    httpStatusCode: 401,
    body: {
      code: "unauthorized",
      message: "You are not authorized.",
    },
  },

  INVALID_DATA: {
    httpStatusCode: 400,
    body: {
      code: "invalid_data",
      message: "Provided arguments are invalid or does not exists",
    },
  },

  PERMISSION_DENIED: {
    httpStatusCode: 403,
    body: {
      code: "permission_denied",
      message: "Permission denied.",
    },
  },
};

const postgres = {
  23505: {
    httpStatusCode: 400,
    code: "duplicate_key_value",
    message: "Value already exists",

    constraint: {
      uk_venue_name: "Venue with same name already exists",
      uk_user_email: "User with same email already exists",
      uk_user_phone_number: "User with same phone number already exists",
      uk_client_phone_number: "Client with same phone number already exists",
      uk_vendor_phone_number: "Vendor with same phone number already exists",
      uk_vendor_email: "Vendor with same email already exists",
      uk_employee_phone_number:
        "Employee with same phone number already exists",
      uk_event_date_place: "Event with same date and venue already exists",
    },
  },

  23503: {
    httpStatusCode: 400,
    code: "foreign_key_violation",
    message: "Foreign key violation",

    constraint: {
      fk_user_permissions_user: "User does not exists",
      fk_user_permissions_permission: "Permission does not exists",
      fk_sessions_user: "User does not exists",
      fk_client_document_client: "Client does not exists",
      fk_vendor_category: "Vendor category does not exists",
      fk_employee_document_employee: "Employee does not exists",
      fk_event_sub_category_event_category:
        "Event sub category does not exists",
      fk_event_category_document_event_category:
        "Event category does not exists",
      fk_event_category_document_event_sub_category:
        "Event sub category does not exists",
      fk_package_event_category: "Event category does not exists",
      fk_package_venue: "Venue does not exists",
      fk_event_client: "Client does not exists",
      fk_event_category: "Event category does not exists",
      fk_event_venue: "Venue does not exists",
      fk_event_vendors_event: "Event does not exists",
      fk_event_vendors_vendor: "Vendor does not exists",
      fk_event_references_documents_event: "Event does not exists",
      fk_expenses_event: "Event does not exists",
      fk_expenses_expanse_category: "Expanse category does not exists",
      fk_expenses_vendor: "Vendor does not exists",
      fk_expenses_employee: "Employee does not exists",
      fk_expenses_venue: "Venue does not exists",
      fk_event_payments_event: "Event does not exists",
      fk_employee_payments_employee: "Employee does not exists",
      fk_vendor_payments_vendor: "Vendor does not exists",
      fk_reminders_client: "Client does not exists",
      fk_reminders_event: "Event does not exists",
      fk_reminders_vendor: "Vendor does not exists",
    },
  },
  23514: {
    httpStatusCode: 400,
    code: "invalid_data",
    message: "Provided arguments are invalid or does not exists",
    constraint: {
      cc_inventories_stock: "not enough stock",
    },
  },
};

module.exports = {
  server,
  postgres,
};
