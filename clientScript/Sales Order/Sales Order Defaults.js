//Change References
//Set second language default as empty(Issue# : ISS-2024-00010)
//Hide "Create New Item" Option in Sales Order Item (ISS-2025-00050)
//>>ISS-2024-00010
frappe.ui.form.on("Sales Order", {
  // Setup
  //setup(frm) {
  //Sometimes, the second documentation language is English.
  //In such cases, modify the onload event and also update the new form.
  onload: function (frm) {
    //Only in the case the form is new
    //console.log('I am triggered onLoad from Sales Order defaults')
    if (frm.is_new()) {
      //Second documentation language is link field and
      //is pulling system defualt language as default language even
      //when the default is set with no value
      //Manually setting it to blank so that this allows the Save
      //without popping the not found error
      frm.doc.second_language = "";
      frm.refresh_fields();
    }
    // Identify and hide the "Create a new Item" option
    // Dynamically in the item code,
    // as simple items are not created from the sales order
    // After the design feature adaptation,
    // item creation is done from the design.>>ISS-2025-00050
    new MutationObserver(() => {
      $("ul[role='listbox']").each(function () {
        if (
          $(this).prev(
            "input[data-doctype='Sales Order Item'][data-fieldname='item_code']"
          ).length
        ) {
            $(this).find("div[role='option']:has(i.fa-plus)").hide();
        }
      });
    }).observe(document.body, { childList: true, subtree: true });
    //<<ISS-2025-00050
  },
});
//<<ISS-2024-00010
