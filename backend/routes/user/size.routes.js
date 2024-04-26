const express = require("express");

const {
  getAllSizeList,
  addNewSize,
  getSizeById,
} = require("../../controllers/user/sizeController");
const router = express.Router();

router.get("/", getAllSizeList);
router.post("/", addNewSize);
router.get("/:sizeId", getSizeById);

module.exports = router;

/* let { paginationData, invoice_status } = this.state;
    let str = `page=${paginationData.page_no}&page_size=${paginationData.page_size}&sort_by=${paginationData.sort_by}&sort_by_field=${paginationData.sort_by_field}`;
 
    let search_text = paginationData.searchText.replace("#", "");
    if (search_text.length > 0) {
      str = str.concat(`&search=${encodeURIComponent(search_text)}`);
    }
    if (invoice_status !== "" && selectedTab === 2) {
      str = str.concat(`&status=${invoice_status}`);
    } */
