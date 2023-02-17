function linkedCheckbox(widget) {
  // Get the main controller based on the kjs-role=controller
  const controller = widget.querySelector("[kjs-role=controller]");
  // Get all the related checkboxes present in the widget which is controlled by the above controller
  const related = widget.querySelectorAll("[kjs-role=related]");
  // converted the obtained nodes list to an array so that we can use .every() & .some()
  const relatedArr = Array.from(related);

  // This function is trigged on the start to setup the state of the controller based on how all related are initiated
  function setup() {
    // returns true if all related checkboxes are checked
    const isAllChecked = relatedArr.every((r) => r.checked);
    // returns true if all related checkboxes are unchecked
    const isNoneChecked = relatedArr.every((r) => !r.checked);

    controller.checked = isAllChecked;
    controller.indeterminate = !isAllChecked && !isNoneChecked;
  }

  function onChange(e) {
    const targetRoleType = e.target.getAttribute("kjs-role");

    if (targetRoleType === "controller") {
      switch (controller.checked) {
        case true:
          const isSomeChecked = relatedArr.some((r) => r.checked);

          // this condition checks if the checkbox was previously in indeterminate state
          // So when the checkbox is checked, it resets the indeterminate flag. Hence had to decide based on the status of related checkboxes
          if (isSomeChecked) {
            // Intermediate state -> unchecked state
            related.forEach((relate) => (relate.checked = false));
            e.target.checked = false;
          } else {
            // unchecked state -> checked state
            related.forEach((relate) => (relate.checked = true));
          }
          break;
        case false:
          // checked state -> unchecked state
          related.forEach((relate) => (relate.checked = false));
          break;
      }
    } else {
      const isAllChecked = relatedArr.every((r) => r.checked);
      const isNoneChecked = relatedArr.every((r) => !r.checked);

      // check the controller if all related checkboxes are checked
      controller.checked = isAllChecked;
      // set the indeterminate (intermediate state) flag if some of the related flags are checked and some are not
      controller.indeterminate = !isAllChecked && !isNoneChecked;
    }
  }

  const actions = [];

  // fetch all checkboxes in the widget. This is mainly used to add custom listeners/actions
  const checkboxes = widget.querySelectorAll("[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    actions.push({
      element: checkbox,
      event: "change",
      handler: onChange,
    });
  });

  return { setup, actions };
}

module.exports = linkedCheckbox;
