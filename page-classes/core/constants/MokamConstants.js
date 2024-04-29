export const PICKLIST_CREATED_STATUS_CODE = 3
export const CREATED_STATUS_CODE = 10;
export const RECEIVED_STATUS_CODE = 30
export const PARTIALLY_RECEIVED_STATUS_CODE = 20;
export const QC_PASS_BIN_TYPE = 10
export const QC_FAIL_BIN_TYPE = 30
export const FREE_BIN_TYPE = 40
export const MOKAM_ADMIN_PANEL_BASE_URL = Cypress.env('commercePanelUrl');
export const MOKAM_SERVICE_BASE_URL = Cypress.env('serviceCallBaseUrl')
export const SUPPLIER_PANEL_BASE_URL = MOKAM_ADMIN_PANEL_BASE_URL + "supplierpanel/"
export const OPD_PANEL_BASE_URL = MOKAM_ADMIN_PANEL_BASE_URL + "omspanel/"
export const Unicorn_PANEL_BASE_URL = MOKAM_ADMIN_PANEL_BASE_URL + "unicornpanel/"
export const CMT_PANEL_BASE_URL = MOKAM_ADMIN_PANEL_BASE_URL + "cmtpanel/";
export const OMS_SERVICE_DOMAIN_URL = MOKAM_SERVICE_BASE_URL + "orders/"
export const CMT_SELLER_SECTION = "Sellers";
export const CMT_PRODUCT_LIST_SECTION = "Product List";
export const CMT_CATEGORY_MARGIN = "Category Margin";
export const CMT_BULK_UPLOAD_MARGIN = "Bulk Upload Margin"
export const UNICORN_PANEL_BASE_URL = MOKAM_ADMIN_PANEL_BASE_URL + "unicornpanel/"
export const MOKAM_BULK_PICKLIST_URL = UNICORN_PANEL_BASE_URL + "returntoanchormodule/bulkuploadpicklistcreation/"

export const MWS_MANAGER_URL = MOKAM_ADMIN_PANEL_BASE_URL + "mwsmanager/";
export const MWS_MANAGER_INVENTORY_URL = MWS_MANAGER_URL + "inventorymodule/";
export const MWS_MANAGER_SALABLE_INVENTORY_URL = MWS_MANAGER_INVENTORY_URL + "salableInventory/";
export const MWS_MANAGER_HOLD_INVENTORY_URL = MWS_MANAGER_INVENTORY_URL + "holdInventory/";
export const MWS_MANAGER_DAMAGE_INVENTORY_URL = MWS_MANAGER_INVENTORY_URL + "damage/";


export const MOKAM_BUSINESS_UNITS ={1: "UNICORN",
		2: "UNBRANDED",
		3: "BRANDED",
		4: "LIFESTYLE",
		5: "BLITZ",
		6: "AGRO",
		7: "WHOLESALE",
		8: "MWS",
		9: "FRESH",
		10: "POULTRY",
		11: "APPAREL",
		12: "INFRA",
		13: "ENERGY",
		14: "ELECTRONICS",
		20: "MOKAM_X"}

export const MOKAM_MARGIN_TYPE ={ 1: "PERCENTAGE",
            2: "FLAT_AMOUNT_PER_KG",
            3: "FLAT_AMOUNT"}

export const CONTENT_MANAGEMENT_TOOL_AUTHORIZATION = "Basic MzJrMGs5NTMwZGlhMTkzMmhnNjUxaWc6eA==";
export const OUT_FOR_PICKUP_STATUS_CODE = 15;

export const SINGLE_ORDER_PICK_LIST_TYPE = 18
export const MULTIPLE_ORDERS_PICK_LIST_TYPE = 19
export const UNICORN_PICK_LIST_TYPE = 20

export const NATIONAL_DISTRIBUTOR_TEXT = 'National Distributor'

export const ORDER_MANAGEMENT_SERVICE_AUTHOTIZATION = "Basic MmJlMjU4OTloazZnMzNpZjc3YjRoMGk6eA=="

export function orderNumberGenerator(){
	var time =  new Date().getTime();
	return ("KA"+Cypress._.random(0,99)+"AO"+time);
}