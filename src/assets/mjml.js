ace.define("ace/theme/mjml",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-mjml";
exports.cssText = ".ace-mjml .ace_gutter {\
background: #323232;\
color: #929292\
}\
.ace-mjml .ace_print-margin {\
width: 1px;\
background: #232323\
}\
.ace-mjml {\
background-color: #191919;\
color: #929292\
}\
.ace-mjml .ace_cursor {\
color: #7DA5DC\
}\
.ace-mjml .ace_marker-layer .ace_selection {\
background: #000000\
}\
.ace-mjml.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #191919;\
}\
.ace-mjml .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-mjml .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
}\
.ace-mjml .ace_marker-layer .ace_active-line {\
background: rgba(215, 215, 215, 0.031)\
}\
.ace-mjml .ace_gutter-active-line {\
background-color: rgba(215, 215, 215, 0.031)\
}\
.ace-mjml .ace_marker-layer .ace_selected-word {\
border: 1px solid #000000\
}\
.ace-mjml .ace_invisible {\
color: #666\
}\
.ace-mjml .ace_keyword,\
.ace-mjml .ace_meta,\
.ace-mjml .ace_support.ace_constant.ace_property-value {\
color: #f45e43\
}\
.ace-mjml .ace_keyword.ace_operator {\
color: #4B4B4B\
}\
.ace-mjml .ace_keyword.ace_other.ace_unit {\
color: #366F1A\
}\
.ace-mjml .ace_constant.ace_language {\
color: #39946A\
}\
.ace-mjml .ace_constant.ace_numeric {\
color: #46A609\
}\
.ace-mjml .ace_constant.ace_character.ace_entity {\
color: #A165AC\
}\
.ace-mjml .ace_invalid {\
color: #FFFFFF;\
background-color: #E92E2E\
}\
.ace-mjml .ace_fold {\
background-color: #927C5D;\
border-color: #929292\
}\
.ace-mjml .ace_storage,\
.ace-mjml .ace_support.ace_class,\
.ace-mjml .ace_support.ace_function,\
.ace-mjml .ace_support.ace_other,\
.ace-mjml .ace_support.ace_type {\
color: #E92E2E\
}\
.ace-mjml .ace_string {\
color: #f63a4d;\
}\
.ace-mjml .ace_comment {\
color: #3C403B\
}\
.ace-mjml .ace_entity.ace_name.ace_tag,\
.ace-mjml .ace_entity.ace_other.ace_attribute-name {\
color: #606060\
}\
.ace-mjml .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y\
}";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
