function linkedCheckbox(widget) {
  const checkboxes = widget.querySelectorAll("[type=checkbox]");
  const controller = widget.querySelector("[kjs-role=controller]");
  const related = widget.querySelectorAll("[kjs-role=related]");
  const relatedArr = Array.from(related);

  function setup() {
    const isAllChecked = relatedArr.every((r) => r.checked);
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
          if (isSomeChecked) {
            related.forEach((relate) => (relate.checked = false));
            e.target.checked = false;
          } else {
            related.forEach((relate) => (relate.checked = true));
          }
          break;
        case false:
          related.forEach((relate) => (relate.checked = false));
          break;
      }
    } else {
      const isAllChecked = relatedArr.every((r) => r.checked);
      const isNoneChecked = relatedArr.every((r) => !r.checked);

      controller.checked = isAllChecked;
      controller.indeterminate = !isAllChecked && !isNoneChecked;
    }
  }

  const actions = [];

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
