/**
 * @fileoverview    Implements the shiftkey + click remove column
 *                  from order by clause functionality
 * @name            columndelete
 *
 * @requires    jQuery
 */

window.AJAX.registerOnload('keyhandler.js', function () {
    $('th.draggable.column_heading.pointer.marker a').on('click', function (event) {
        var orderUrlRemove = $(this).parent().find('input[name="url-remove-order"]').val();
        var orderUrlAdd = $(this).parent().find('input[name="url-add-order"]').val();
        var argsep = window.CommonParams.get('arg_separator');
        if (event.ctrlKey || event.altKey) {
            event.preventDefault();
            window.AJAX.source = $(this);
            Functions.ajaxShowMessage();
            orderUrlRemove += argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
            $.post('index.php?route=/sql', orderUrlRemove, window.AJAX.responseHandler);
        } else if (event.shiftKey) {
            event.preventDefault();
            window.AJAX.source = $(this);
            Functions.ajaxShowMessage();
            orderUrlAdd += argsep + 'ajax_request=true' + argsep + 'ajax_page_request=true';
            $.post('index.php?route=/sql', orderUrlAdd, window.AJAX.responseHandler);
        }
    });
});

window.AJAX.registerTeardown('keyhandler.js', function () {
    $(document).off('click', 'th.draggable.column_heading.pointer.marker a');
});
