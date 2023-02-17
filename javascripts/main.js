import kjs           from './k';
import drawers       from './widgets/drawers';
import extendingForm from './widgets/extending-form';
import tabs          from './widgets/tabs';
import linkedCheckbox from "./widgets/linked-checkbox";

document.addEventListener("DOMContentLoaded", () => {
  kjs({ drawers, extendingForm, tabs, linkedCheckbox}, document);
});
