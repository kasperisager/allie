import {find, split, trim, toLower} from 'bundstreg';
import {attr, tag, matches} from 'hoardom';

/**
 * @see https://www.w3.org/TR/html-aria/#docconformance
 */
const IMPLICITS = {
  a: [{role: 'link', include: '[href]'}],
  area: [{role: 'link', include: '[href]'}],
  article: [{role: 'article'}],
  aside: [{role: 'complementary'}],
  body: [{role: 'document'}],
  button: [{role: 'button'}],
  datalist: [{role: 'listbox'}],
  dd: [{role: 'definiton'}],
  details: [{role: 'group'}],
  dialog: [{role: 'dialog'}],
  dl: [{role: 'list'}],
  dt: [{role: 'listitem'}],
  figure: [{role: 'figure'}],
  footer: [{role: 'contentinfo', exclude: 'article footer, aside footer, main footer, nav footer, section footer'}],
  form: [{role: 'form'}],
  h1: [{role: 'heading'}],
  h2: [{role: 'heading'}],
  h3: [{role: 'heading'}],
  h4: [{role: 'heading'}],
  h5: [{role: 'heading'}],
  h6: [{role: 'heading'}],
  header: [{role: 'banner', exclude: 'article header, aside header, main header, nav header, section header'}],
  hr: [{role: 'separator'}],
  img: [{role: 'img', exclude: '[alt=""]'}],
  input: [
    {role: 'button', include: '[type=button], [type=image], [type=reset], [type=submit]'},
    {role: 'checkbox', include: '[type=checkbox]'},
    {role: 'textbox', include: '[type=email], [type=tel], [type=text], [type=url]', exclude: '[list]'},
    {role: 'spinbutton', include: '[type=number]'},
    {role: 'radio', include: '[type=radio]'},
    {role: 'slider', include: '[type=range]'},
    {role: 'searchbox', include: '[type=search]', exclude: '[list]'},
    {role: 'combobox', include: '[type=text][list], [type=search][list], [type=text][list], [type=tel][list], [type=url][list]'}
  ],
  li: [{role: 'listitem', include: 'ol li, ul li'}],
  link: [{role: 'link', include: '[href]'}],
  main: [{role: 'main'}],
  math: [{role: 'math'}],
  menu: [{role: 'menu', include: '[type=context]'}],
  menuitem: [
    {role: 'menuitem', include: '[type=command]'},
    {role: 'menuitemcheckbox', include: '[type=checkbox]'},
    {role: 'menuitemradio', include: '[type=radio]'}
  ],
  nav: [{role: 'navigation'}],
  ol: [{role: 'list'}],
  optgroup: [{role: 'group'}],
  option: [{role: 'option', include: 'select option, datalist option'}],
  output: [{role: 'status'}],
  progress: [{role: 'progressbar'}],
  section: [{role: 'region'}],
  select: [{role: 'listbox'}],
  summary: [{role: 'button'}],
  table: [{role: 'table'}],
  textarea: [{role: 'textarea'}],
  tbody: [{role: 'rowgroup'}],
  thead: [{role: 'rowgroup'}],
  tfoot: [{role: 'rowgroup'}],
  td: [{role: 'cell'}],
  th: [
    {role: 'columnheader', exclude: '[scope=row]'},
    {role: 'rowheader', include: '[scope=row]'}
  ],
  tr: [{role: 'row'}],
  ul: [{role: 'list'}]
};

/**
 * Get the semantic role of an element.
 *
 * @see https://www.w3.org/TR/html-aria/
 *
 * @param {Element} element
 * @param {Boolean} [implicit=true]
 * @return {String}
 */
export default function role(element, implicit = true) {
  let role = trim(attr(element, 'role'));

  if (!role && implicit) {
    const feature = tag(element);

    implicit = find(IMPLICITS[feature], implicit => {
      const {include, exclude} = implicit;

      if (include && !matches(element, include)) {
        return false;
      }

      if (exclude && matches(element, exclude)) {
        return false;
      }

      return true;
    });

    if (implicit) {
      role = implicit.role;
    }
  }

  return role ? split(toLower(role), /\s+/)[0] : null;
}
