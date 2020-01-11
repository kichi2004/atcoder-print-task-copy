// ==UserScript==
// @name         AtCoder Print Task Copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add copy buttons to tasks_print page.
// @author       kichi2004
// @match        https://atcoder.jp/contests/*/tasks_print*
// @grant        none
// @require      https://atcoder.jp/public/js/lib/jquery-1.9.1.min.js?v=202001082219
// @run-at   document-start
// ==/UserScript==

'use strict';

var style;

(function () {
  if (document.queryCommandSupported('copy')) {
    $('#task-statement h3+pre').each(function (i) {
      const id = 'pre-sample' + i
      $(this).attr('id', id)
      const h3 = $(this).prev('h3')
      h3.append(' <span class="btn btn-default btn-sm btn-copy" tabindex="0" data-toggle="tooltip" data-trigger="manual" title="Copied!" data-target="' + id + '">Copy</span>')
      $(this).before('<div class="div-btn-copy"><span class="btn-copy btn-pre" tabindex="0" data-toggle="tooltip" data-trigger="manual" title="Copied!" data-target="' + id + '">Copy</span></div>')
    })
    let cnt = 0
    $('pre.prettyprint').each(function () {
      const pre_id = 'for_copy' + cnt
      const btn_html = '<div class="div-btn-copy"><span class="btn-copy btn-pre" tabindex="0" data-toggle="tooltip" data-trigger="manual" title="Copied!" data-target="' + pre_id + '">Copy</span></div>'
      $(this).before(btn_html)
      $(this).addClass('source-code')
      const for_copy_html = '<pre id="' + pre_id + '" class="source-code-for-copy"></pre>'
      $(this).after($(for_copy_html).text($(this).text()))
      cnt++
    })
  }
  $('.btn-copy').click(function () {
    window.getSelection().removeAllRanges()
    try {
      const range = document.createRange()
      range.selectNode($('#' + $(this).data('target')).get(0))
      window.getSelection().addRange(range)
      document.execCommand('copy')
    } catch (err) {
      console.log(err)
    }
    window.getSelection().removeAllRanges()
  })


})()

// randint
function rand() {
  const range = [0, 100000]
  return Math.floor(Math.random() * (range[1] - range[0])) + range[0]
}
