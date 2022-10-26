/* Theme Name: The Project - Responsive Website Template
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version:1.0.0
 * Created:March 2015
 * License URI:http://support.wrapbootstrap.com/
 * File Description: Place here your custom scripts
 */
/* Search AutoComplete */
$('#txtSearch').autocomplete({
    source: function (request, response) {
        $.getJSON("/ajax/Products/GetSearchTerm/?term=" + request.term, function (data) {
            response($.map(data, function (item) {
                return {
                    label: item.Name,
                    value: item.Name,
                    url: item.Url,
                    urlphoto: item.UrlPhoto
                };
            }));
        });
    },
    minLength: 2,
    select: function (event, ui) {
        window.location.href = ui.item.url;
    }
}).data("autocomplete")._renderItem = function (ul, item) {
    return $("<li></li>")
        .data("item.autocomplete", item)
        .append("<a><img src='" + item.urlphoto + "' width='50' />" + item.label + "</a>")
        .appendTo(ul);
};