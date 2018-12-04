import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-tag-statistics-pages-results',
  templateUrl: './tag-statistics-pages-results.component.html',
  styleUrls: ['./tag-statistics-pages-results.component.css']
})
export class TagStatisticsPagesResultsComponent implements OnInit {

  comboio: any = {'altImg': {'img_01a': {'w': '3', 'i': 'u'}, 'img_01b': {'w': '3', 'i': 'd', 'q': 'imgAltNo'}, 'img_02': {'w': '2', 'i': 'h', 'q': 'imgAltNull'}, 'img_03': {'w': '3', 'i': 'd', 'q': 'imgAltNot'}, 'img_04': {'w': '2', 'i': 'h', 'q': 'imgAltLong'}, 'long_01': {'w': '2', 'i': 'd', 'q': 'longDNo'}}, 'altArea': {'area_01a': {'w': '3', 'i': 'u'}, 'area_01b': {'w': '3', 'i': 'd', 'q': 'areaAltNo'}}, 'altInput': {'inp_img_01a': {'w': '3', 'i': 'u'}, 'inp_img_01b': {'w': '3', 'i': 'd', 'q': 'inpImgAltNo'}}, 'media': {'applet_01': {'w': '3', 'i': 'd', 'q': 'appletAltNo'}, 'embed_01': {'w': '3', 'i': 'd', 'q': 'embedAltNo'}, 'iframe_01': {'w': '3', 'i': 'd', 'q': 'iframeTitleNo'}, 'object_01': {'w': '2', 'i': 'd', 'q': 'objectAltNo'}}, 'js': {'a_08': {'w': '1', 'i': 'd', 'q': 'aJs'}, 'ehandler_01': {'w': '3', 'i': 'd', 'q': 'ehandMouse'}, 'ehandler_02': {'w': '3', 'i': 'd', 'q': 'ehandBothNo'}, 'ehandler_03': {'w': '3', 'i': 'u', 'q': 'ehandBoth'}, 'ehandler_04': {'w': '2', 'i': 'd', 'q': 'ehandTagNo'}, 'noscript': {'w': '1', 'i': 'd'}}, 'head': {'hx_01a': {'w': '3', 'i': 'd'}, 'hx_01b': {'w': '3', 'i': 'h', 'q': 'hx'}, 'hx_01c': {'w': '3', 'i': 'd'}, 'hx_02': {'w': '3', 'i': 'd', 'q': 'hxNo'}, 'hx_03': {'w': '3', 'i': 'd', 'q': 'hxSkip'}}, 'links': {'a_03': {'w': '3', 'i': 'd', 'q': 'aImgAltNo'}, 'a_04': {'w': '2', 'i': 'd'}, 'a_05': {'w': '2', 'i': 'd', 'q': 'aTitleMatch'}, 'a_06': {'w': '2', 'i': 'd', 'q': 'aAdjacentSame'}, 'a_07': {'w': '3', 'i': 'h', 'q': 'aGroupNo'}, 'a_09': {'w': '3', 'i': 'd', 'q': 'aSameText'}, 'a_10': {'w': '1', 'i': 'd', 'q': 'aAdjacent'}, 'br_01': {'w': '2', 'i': 'h', 'q': 'brSec'}, 'list_01': {'w': '3', 'i': 'd', 'q': 'liNoList'}}, 'jumps': {'a_01a': {'w': '2', 'i': 'u'}, 'a_01b': {'w': '2', 'i': 'd'}, 'a_02a': {'w': '3', 'i': 'd'}, 'a_02b': {'w': '3', 'i': 'h'}}, 'tData': {'scope_01': {'w': '2', 'i': 'd', 'q': 'scopeNo'}, 'table_02': {'w': '3', 'i': 'd', 'q': 'tableDataCaption'}, 'table_03': {'w': '3', 'i': 'd', 'q': 'tableCaptionSummary'}, 'table_05a': {'w': '3', 'i': 'd', 'q': 'tableLayout'}, 'table_06': {'w': '2', 'i': 'd', 'q': 'tableComplexError'}}, 'tLayout': {'table_01': {'w': '3', 'i': 'd', 'q': 'tableLayoutCaption'}, 'table_04': {'w': '2', 'i': 'd', 'q': 'tableNested'}, 'table_05b': {'w': '1', 'i': 'u'}}, 'frame': {'frame_01': {'w': '3', 'i': 'd', 'q': 'frameTitleNo'}, 'frame_02': {'w': '2', 'i': 'd'}, 'noframes_01': {'w': '1', 'i': 'd'}}, 'form': {'field_01': {'w': '2', 'i': 'd', 'q': 'fieldLegNo'}, 'field_02': {'w': '2', 'i': 'd', 'q': 'fieldNoForm'}, 'focus_01': {'w': '2', 'i': 'd', 'q': 'focusBlur'}, 'form_01a': {'w': '2', 'i': 'u'}, 'form_01b': {'w': '2', 'i': 'd', 'q': 'formSubmitNo'}, 'input_01': {'w': '2', 'i': 'd', 'q': 'inputIdTitleNo'}, 'input_02': {'w': '3', 'i': 'h', 'q': 'inputLabelNo'}, 'input_02b': {'w': '3', 'i': 'u'}, 'input_03': {'w': '2', 'i': 'd', 'q': 'inputAltNo'}, 'label_01': {'w': '3', 'i': 'd', 'q': 'labelForNo'}, 'label_02': {'w': '2', 'i': 'd', 'q': 'labelPosNo'}, 'label_03': {'w': '2', 'i': 'd', 'q': 'labelTextNo'}}, 'w3c': {'css_validator_01': {'w': '3', 'i': 'u'}, 'css_validator_02': {'w': '3', 'i': 'd', 'q': 'cssValidatorErrors'}, 'dtd_01': {'w': '3', 'i': 'd'}, 'dtd_02': {'w': '1', 'i': 'd'}, 'id_01': {'w': '2', 'i': 'd', 'q': 'idRep'}, 'w3c_validator_01a': {'w': '3', 'i': 'u'}, 'w3c_validator_01b': {'w': '3', 'i': 'd', 'q': 'w3cValidatorErrors'}}, 'deprec': {'blink_01': {'w': '3', 'i': 'd', 'q': 'blink'}, 'blink_02': {'w': '3', 'i': 'd', 'q': 'cssBlink'}, 'deprec_01a': {'w': '1', 'i': 'u'}, 'deprec_01b': {'w': '1', 'i': 'd', 'q': 'deprecElem'}, 'deprec_02a': {'w': '1', 'i': 'u'}, 'deprec_02b': {'w': '1', 'i': 'd', 'q': 'deprecAttr'}, 'font_01': {'w': '2', 'i': 'd', 'q': 'fontHtml'}, 'layout_01a': {'w': '3', 'i': 'u'}, 'layout_01b': {'w': '3', 'i': 'd', 'q': 'layoutElem'}, 'layout_02a': {'w': '3', 'i': 'u'}, 'layout_02b': {'w': '3', 'i': 'd', 'q': 'layoutAttr'}, 'marquee_01': {'w': '3', 'i': 'd'}}, 'abs': {'font_02': {'w': '3', 'i': 'd', 'q': 'fontAbsVal'}, 'layout_03': {'w': '2', 'i': 'h', 'q': 'layoutFixed'}, 'values_01a': {'w': '3', 'i': 'd'}, 'values_01b': {'w': '3', 'i': 'u'}, 'values_02a': {'w': '3', 'i': 'd'}, 'values_02b': {'w': '3', 'i': 'u'}}, 'meta': {'link_01': {'w': '3', 'i': 'u', 'q': 'linkRel'}, 'meta_01': {'w': '3', 'i': 'd'}, 'meta_02': {'w': '3', 'i': 'd'}, 'title_01': {'w': '3', 'i': 'd'}, 'title_02': {'w': '3', 'i': 'd'}, 'title_03': {'w': '3', 'i': 'd'}, 'title_04': {'w': '2', 'i': 'h', 'q': 'titleLong'}, 'title_05': {'w': '3', 'i': 'h'}, 'title_06': {'w': '3', 'i': 'u'}, 'title_07': {'w': '2', 'i': 'd'}}, 'lang': {'lang_01': {'w': '3', 'i': 'u'}, 'lang_02': {'w': '3', 'i': 'd'}, 'lang_03': {'w': '3', 'i': 'd'}, 'lang_04': {'w': '3', 'i': 'd'}, 'lang_05': {'w': '3', 'i': 'd'}}, 'text': {'justif_txt_01': {'w': '2', 'i': 'd', 'q': 'justifiedTxt'}, 'justif_txt_02': {'w': '2', 'i': 'd', 'q': 'justifiedCss'}, 'css_01': {'w': '2', 'i': 'h', 'q': 'lineHeightNo'}}, 'color': {'color_01': {'w': '2', 'i': 'h', 'q': 'colorFgBgNo'}, 'color_02': {'w': '2', 'i': 'd', 'q': 'colorContrast'}}, 'abbr': {'abbr_01': {'w': '3', 'i': 'd', 'q': 'abbrNo'}}, 'aKey': {'akey_01': {'w': '3', 'i': 'd', 'q': 'acckeyRep'}}, 'nWin': {'win_01': {'w': '2', 'i': 'd'}}, 'pagalt': {'flash': {'w': '1', 'i': 'd'}}};
  tests: any = {'a_01a': {'type': 'true', 'elem': 'a', 'test': 'aSkipFirst', 'score': 10, 'level': 'a', 'trust': '0.7', 'ref': 'G1', 'scs': '2.4.1', 'dis': '43522'}, 'a_01b': {'type': 'fals', 'elem': 'a', 'test': 'aSkipFirst', 'score': 3, 'level': 'a', 'trust': '0.9', 'ref': 'G1', 'scs': '2.4.1', 'dis': '43522'}, 'a_02a': {'type': 'fals', 'elem': 'a', 'test': 'aSkip', 'score': 3, 'level': 'a', 'trust': '0.9', 'ref': 'G123', 'scs': '2.4.1', 'dis': '43522'}, 'a_02b': {'type': 'true', 'elem': 'a', 'test': 'aSkip', 'score': 10, 'level': 'a', 'trust': '0.7', 'ref': 'G123', 'scs': '2.4.1', 'dis': '43522'}, 'a_03': {'type': 'decr', 'elem': 'a', 'test': 'aImgAltNo', 'score': 3, 'level': 'A', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'F89', 'scs': '2.4.4,2.4.9,4.1.2', 'dis': '53322'}, 'a_04': {'type': 'fals', 'elem': 'all', 'test': 'a', 'score': 3, 'level': 'AA', 'trust': '1', 'ref': 'G125', 'scs': '2.4.5', 'dis': '54353'}, 'a_05': {'type': 'prop', 'elem': 'a', 'test': 'aTitleMatch', 'score': 5, 'level': 'a', 'trust': '1', 'ref': 'H33', 'scs': '2.4.4,2.4.9', 'dis': '52132'}, 'a_06': {'type': 'decr', 'elem': 'a', 'test': 'aAdjacentSame', 'score': 5, 'level': 'A', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'H2', 'scs': '1.1.1,2.4.4,2.4.9', 'dis': '54353'}, 'a_09': {'type': 'decr', 'elem': 'a', 'test': 'aSameText', 'score': 3, 'level': 'AAA', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'F84', 'scs': '2.4.9', 'dis': '52122'}, 'abbr_01': {'type': 'true', 'elem': 'all', 'test': 'abbrNo', 'score': 3, 'level': 'AAA', 'trust': '1', 'ref': 'G102', 'scs': '3.1.4', 'dis': '42153'}, 'akey_01': {'type': 'true', 'elem': 'all', 'test': 'acckeyRep', 'score': 4, 'level': 'A', 'trust': '1', 'ref': 'F17', 'scs': '1.3.1,4.1.1', 'dis': '44151'}, 'applet_01': {'type': 'prop', 'elem': 'applet', 'test': 'appletAltNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H35', 'scs': '1.1.1', 'dis': '53142'}, 'area_01a': {'type': 'fals', 'elem': 'area', 'test': 'areaAltNo', 'score': 10, 'level': 'a', 'trust': '0.9', 'ref': 'H24', 'scs': '1.1.1,2.4.4,2.4.9', 'dis': '54222'}, 'area_01b': {'type': 'prop', 'elem': 'area', 'test': 'areaAltNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F65', 'scs': '1.1.1', 'dis': '53322'}, 'blink_01': {'type': 'decr', 'elem': 'all', 'test': 'blink', 'score': 2, 'level': 'A', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'F47', 'scs': '2.2.2', 'dis': '15154'}, 'blink_02': {'type': 'true', 'elem': 'all', 'test': 'cssBlink', 'score': 3, 'level': 'A', 'trust': '0.9', 'ref': 'F4', 'scs': '2.2.2', 'dis': '15152'}, 'br_01': {'type': 'decr', 'elem': 'all', 'test': 'brSec', 'score': 3, 'level': 'a', 'trust': '0.7', 'top': 1, 'steps': 1, 'ref': 'H48', 'scs': '1.3.1', 'dis': '53342'}, 'color_01': {'type': 'true', 'elem': 'all', 'test': 'colorFgBgNo', 'score': 5, 'level': 'aa', 'trust': '0.9', 'ref': 'F24', 'scs': '1.4.3,1.4.6,1.4.8', 'dis': '13113'}, 'color_02': {'type': 'decr', 'elem': 'all', 'test': 'colorContrast', 'score': 4, 'level': 'AA', 'trust': '0.8', 'top': 1, 'steps': 1, 'ref': 'G145', 'scs': '1.4.3', 'dis': '15113'}, 'css_01': {'type': 'decr', 'elem': 'all', 'test': 'lineHeightNo', 'score': 3, 'level': 'aaa', 'trust': '0.8', 'top': 1, 'steps': 1, 'ref': 'C21', 'scs': '1.4.8', 'dis': '15153'}, 'dtd_01': {'type': 'fals', 'elem': 'all', 'test': 'dtd', 'score': 3, 'level': 'a', 'trust': '1', 'ref': 'H88', 'scs': '4.1.1,4.1.2', 'dis': '22232'}, 'ehandler_01': {'type': 'true', 'elem': 'ehandler', 'test': 'ehandMouse', 'score': 1, 'level': 'A', 'trust': '1', 'ref': 'F54', 'scs': '2.1.1', 'dis': '53512'}, 'ehandler_02': {'type': 'prop', 'elem': 'ehandler', 'test': 'ehandBothNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'SCR20', 'scs': '2.1.1,2.1.3', 'dis': '53511'}, 'ehandler_03': {'type': 'true', 'elem': 'ehandler', 'test': 'ehandBoth', 'score': 10, 'level': 'a', 'trust': '0.9', 'ref': 'G90', 'scs': '2.1.1,2.1.3', 'dis': '52522'}, 'ehandler_04': {'type': 'prop', 'elem': 'ehandler', 'test': 'ehandTagNo', 'score': 3, 'level': 'A', 'trust': '0.8', 'ref': 'F59', 'scs': '4.1.2', 'dis': '43411'}, 'embed_01': {'type': 'prop', 'elem': 'embed', 'test': 'embedAltNo', 'score': 3, 'level': 'A', 'trust': '0.9', 'ref': 'H46', 'scs': '1.1.1,1.2.8', 'dis': '54353'}, 'field_01': {'type': 'true', 'elem': 'all', 'test': 'fieldLegNo', 'score': 4, 'level': 'A', 'trust': '1', 'ref': 'H71', 'scs': '1.3.1,3.3.2', 'dis': '54152'}, 'field_02': {'type': 'decr', 'elem': 'all', 'test': 'fieldNoForm', 'score': 3, 'level': 'A', 'trust': '0.9', 'top': 1, 'steps': 1, 'ref': 'H71', 'scs': '1.3.1,3.3.2', 'dis': '54152'}, 'focus_01': {'type': 'true', 'elem': 'all', 'test': 'focusBlur', 'score': 3, 'level': 'a', 'trust': '0.8', 'ref': 'F55', 'scs': '2.1.1,2.4.7,3.2.1', 'dis': '54142'}, 'font_01': {'type': 'decr', 'elem': 'all', 'test': 'fontHtml', 'score': 4, 'level': 'AA', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'C22', 'scs': '1.3.1,1.4.4,1.4.5,1.4.9', 'dis': '33111'}, 'font_02': {'type': 'prop', 'elem': 'fontValues', 'test': 'fontAbsVal', 'score': 4, 'level': 'AA', 'trust': '1', 'ref': 'C12', 'scs': '1.4.4', 'dis': '15123'}, 'form_01a': {'type': 'fals', 'elem': 'form', 'test': 'formSubmitNo', 'score': 10, 'level': 'a', 'trust': '1', 'ref': 'H32', 'scs': '3.2.2', 'dis': '21211'}, 'form_01b': {'type': 'prop', 'elem': 'form', 'test': 'formSubmitNo', 'score': 3, 'level': 'A', 'trust': '0.9', 'ref': 'H32', 'scs': '3.2.2', 'dis': '21211'}, 'frame_01': {'type': 'prop', 'elem': 'frame', 'test': 'frameTitleNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H64', 'scs': '2.4.1,4.1.2', 'dis': '53222'}, 'frame_02': {'type': 'true', 'elem': 'frameset', 'test': 'frameDtdNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H88', 'scs': '4.1.1,4.1.2', 'dis': '22232'}, 'hx_01a': {'type': 'fals', 'elem': 'all', 'test': 'hx', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H42', 'scs': '1.3.1', 'dis': '54322'}, 'hx_01b': {'type': 'true', 'elem': 'all', 'test': 'hx', 'score': 10, 'level': 'aaa', 'trust': '0.9', 'ref': 'G141', 'scs': '1.3.1,2.4.10', 'dis': '54343'}, 'hx_01c': {'type': 'fals', 'elem': 'hx', 'test': 'h1', 'score': 4, 'level': 'aaa', 'trust': '1', 'ref': 'G141', 'scs': '1.3.1,2.4.10', 'dis': '54343'}, 'hx_02': {'type': 'true', 'elem': 'hx', 'test': 'hxNo', 'score': 3, 'level': 'AA', 'trust': '1', 'ref': 'G130', 'scs': '2.4.6', 'dis': '54253'}, 'hx_03': {'type': 'prop', 'elem': 'hx', 'test': 'hxSkip', 'score': 3, 'level': 'AAA', 'trust': '1', 'ref': 'G141', 'scs': '1.3.1,2.4.10', 'dis': '54343'}, 'id_01': {'type': 'true', 'elem': 'id', 'test': 'idRep', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F77', 'scs': '4.1.1', 'dis': '32321'}, 'iframe_01': {'type': 'prop', 'elem': 'iframe', 'test': 'iframeTitleNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H64', 'scs': '2.4.1,4.1.2', 'dis': '53222'}, 'img_01a': {'type': 'fals', 'elem': 'img', 'test': 'imgAltNo', 'score': 10, 'level': 'a', 'trust': '0.9', 'ref': 'H37', 'scs': '1.1.1', 'dis': '53322'}, 'img_01b': {'type': 'prop', 'elem': 'img', 'test': 'imgAltNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F65', 'scs': '1.1.1', 'dis': '53322'}, 'img_02': {'type': 'prop', 'elem': 'img', 'test': 'imgAltNull', 'score': 8, 'level': 'a', 'trust': '1', 'ref': 'C9', 'scs': '1.1.1', 'dis': '41111'}, 'img_03': {'type': 'decr', 'elem': 'img', 'test': 'imgAltNot', 'score': 3, 'level': 'A', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'F30', 'scs': '1.1.1,1.2.1', 'dis': '53211'}, 'img_04': {'type': 'prop', 'elem': 'img', 'test': 'imgAltLong', 'score': 5, 'level': 'a', 'trust': '0.9', 'ref': 'H45', 'scs': '1.1.1', 'dis': '54153'}, 'inp_img_01a': {'type': 'fals', 'elem': 'inpImg', 'test': 'inpImgAltNo', 'score': 10, 'level': 'a', 'trust': '0.9', 'ref': 'H36', 'scs': '1.1.1', 'dis': '54211'}, 'inp_img_01b': {'type': 'prop', 'elem': 'inpImg', 'test': 'inpImgAltNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F65', 'scs': '1.1.1', 'dis': '53322'}, 'input_01': {'type': 'prop', 'elem': 'inputLabel', 'test': 'inputIdTitleNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H65', 'scs': '1.1.1,1.3.1,3.3.2,4.1.2', 'dis': '53122'}, 'input_02': {'type': 'prop', 'elem': 'label', 'test': 'inputLabelNo', 'score': 3, 'level': 'a', 'trust': '0.8', 'ref': 'H44', 'scs': '1.1.1,1.3.1,3.3.2,4.1.2', 'dis': '54532'}, 'input_02b': {'type': 'fals', 'elem': 'inputLabel', 'test': 'inputLabelNo', 'score': 10, 'level': 'a', 'trust': '0.7', 'ref': 'H44', 'scs': '1.1.1,1.3.1,3.3.2,4.1.2', 'dis': '54532'}, 'input_03': {'type': 'true', 'elem': 'all', 'test': 'inputAltNo', 'score': 5, 'level': 'a', 'trust': '1', 'ref': 'H36', 'scs': '1.1.1', 'dis': '54211'}, 'justif_txt_01': {'type': 'decr', 'elem': 'all', 'test': 'justifiedTxt', 'score': 3, 'level': 'AAA', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'F88', 'scs': '1.4.8', 'dis': '15152'}, 'justif_txt_02': {'type': 'decr', 'elem': 'all', 'test': 'justifiedCss', 'score': 3, 'level': 'AAA', 'trust': '0.9', 'top': 1, 'steps': 1, 'ref': 'C19', 'scs': '1.4.8', 'dis': '14142'}, 'label_01': {'type': 'prop', 'elem': 'label', 'test': 'labelForNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F68', 'scs': '1.3.1,4.1.2', 'dis': '52523'}, 'label_02': {'type': 'decr', 'elem': 'all', 'test': 'labelPosNo', 'score': 3, 'level': 'A', 'trust': '0.9', 'top': 1, 'steps': 1, 'ref': 'G162', 'scs': '1.3.1,3.3.2', 'dis': '43353'}, 'label_03': {'type': 'prop', 'elem': 'label', 'test': 'labelTextNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F68', 'scs': '1.3.1,4.1.2', 'dis': '52523'}, 'lang_01': {'type': 'true', 'elem': 'all', 'test': 'lang', 'score': 10, 'level': 'a', 'trust': '0.9', 'ref': 'H57', 'scs': '3.1.1', 'dis': '53112'}, 'lang_02': {'type': 'true', 'elem': 'all', 'test': 'langCodeNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H57', 'scs': '3.1.1', 'dis': '53112'}, 'lang_03': {'type': 'true', 'elem': 'all', 'test': 'langNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H57', 'scs': '3.1.1', 'dis': '53112'}, 'lang_04': {'type': 'true', 'elem': 'all', 'test': 'langMatchNo', 'score': 4, 'level': 'A', 'trust': '1', 'ref': 'H57', 'scs': '3.1.1', 'dis': '53112'}, 'lang_05': {'type': 'true', 'elem': 'all', 'test': 'langExtra', 'score': 5, 'level': 'A', 'trust': '1', 'ref': 'H57', 'scs': '3.1.1', 'dis': '53112'}, 'layout_01a': {'type': 'fals', 'elem': 'all', 'test': 'layoutElem', 'score': 10, 'level': 'a', 'trust': '1', 'ref': 'G115', 'scs': '1.3.1', 'dis': '34212'}, 'layout_01b': {'type': 'decr', 'elem': 'all', 'test': 'layoutElem', 'score': 5, 'level': 'A', 'trust': '1', 'top': 2, 'steps': 2, 'ref': 'G115', 'scs': '1.3.1', 'dis': '34212'}, 'layout_02a': {'type': 'fals', 'elem': 'all', 'test': 'layoutAttr', 'score': 10, 'level': 'a', 'trust': '1', 'ref': 'G140', 'scs': '1.3.1,1.4.5,1.4.9', 'dis': '25243'}, 'layout_02b': {'type': 'decr', 'elem': 'all', 'test': 'layoutAttr', 'score': 5, 'level': 'A', 'trust': '0.9', 'top': 3, 'steps': 3, 'ref': 'G140', 'scs': '1.3.1,1.4.5,1.4.9', 'dis': '25243'}, 'layout_03': {'type': 'decr', 'elem': 'all', 'test': 'layoutFixed', 'score': 5, 'level': 'aa', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'G146', 'scs': '1.4.4,1.4.8', 'dis': '15222'}, 'link_01': {'type': 'true', 'elem': 'all', 'test': 'linkRel', 'score': 10, 'level': 'aa', 'trust': '0.9', 'ref': 'H59', 'scs': '2.4.5,2.4.8', 'dis': '55554'}, 'list_01': {'type': 'decr', 'elem': 'all', 'test': 'liNoList', 'score': 3, 'level': 'A', 'trust': '1', 'top': 3, 'steps': 3, 'ref': 'H48', 'scs': '1.3.1', 'dis': '53342'}, 'long_01': {'type': 'prop', 'elem': 'longDImg', 'test': 'longDNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H45', 'scs': '1.1.1', 'dis': '54153'}, 'marquee_01': {'type': 'true', 'elem': 'all', 'test': 'marquee', 'score': 1, 'level': 'A', 'trust': '1', 'ref': 'F16', 'scs': '2.2.2', 'dis': '45153'}, 'meta_01': {'type': 'true', 'elem': 'all', 'test': 'metaRefresh', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F41', 'scs': '2.2.1,2.2.4,3.2.5', 'dis': '43353'}, 'meta_02': {'type': 'true', 'elem': 'all', 'test': 'metaRedir', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F40', 'scs': '2.2.1,2.2.4', 'dis': '43353'}, 'object_01': {'type': 'prop', 'elem': 'object', 'test': 'objectAltNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H27', 'scs': '1.1.1', 'dis': '54152'}, 'scope_01': {'type': 'decr', 'elem': 'table', 'test': 'scopeNo', 'score': 3, 'level': 'A', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'H63', 'scs': '1.3.1', 'dis': '53353'}, 'table_01': {'type': 'prop', 'elem': 'tableLayout', 'test': 'tableLayoutCaption', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F46', 'scs': '1.3.1', 'dis': '51421'}, 'table_02': {'type': 'prop', 'elem': 'tableData', 'test': 'tableDataCaption', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H39', 'scs': '1.3.1', 'dis': '52211'}, 'table_03': {'type': 'prop', 'elem': 'table', 'test': 'tableCaptionSummary', 'score': 4, 'level': 'A', 'trust': '1', 'ref': 'H73', 'scs': '1.3.1', 'dis': '33152'}, 'table_04': {'type': 'prop', 'elem': 'table', 'test': 'tableNested', 'score': 3, 'level': 'a', 'trust': '0.9', 'ref': 'F49', 'scs': '1.3.2', 'dis': '53311'}, 'table_05a': {'type': 'decr', 'elem': 'all', 'test': 'tableLayout', 'score': 4, 'level': 'a', 'trust': '1', 'top': 1, 'steps': 1, 'ref': 'H51', 'scs': '1.3.1', 'dis': '53352'}, 'table_06': {'type': 'decr', 'elem': 'tableComplex', 'test': 'tableComplexError', 'score': 4, 'level': 'a', 'trust': '0.8', 'top': 1, 'steps': 1, 'ref': 'H43', 'scs': '1.3.1', 'dis': '53211'}, 'title_01': {'type': 'true', 'elem': 'all', 'test': 'titleVrs', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H25', 'scs': '2.4.2', 'dis': '52112'}, 'title_02': {'type': 'true', 'elem': 'all', 'test': 'titleNo', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'H25', 'scs': '2.4.2', 'dis': '52112'}, 'title_03': {'type': 'true', 'elem': 'all', 'test': 'titleNull', 'score': 3, 'level': 'A', 'trust': '1', 'ref': 'F25', 'scs': '2.4.2', 'dis': '33151'}, 'title_04': {'type': 'decr', 'elem': 'all', 'test': 'titleLong', 'score': 10, 'level': 'a', 'trust': '0.9', 'top': 64, 'steps': 10, 'ref': 'G88', 'scs': '2.4.2', 'dis': '42253'}, 'title_05': {'type': 'true', 'elem': 'all', 'test': 'titleChars', 'score': 4, 'level': 'a', 'trust': '0.9', 'ref': 'G88', 'scs': '2.4.2', 'dis': '42253'}, 'title_06': {'type': 'true', 'elem': 'all', 'test': 'titleOk', 'score': 10, 'level': 'a', 'trust': '0.9', 'ref': 'H25', 'scs': '2.4.2', 'dis': '52112'}, 'title_07': {'type': 'true', 'elem': 'all', 'test': 'titleSame', 'score': 4, 'level': 'A', 'trust': '1', 'ref': 'F25', 'scs': '2.4.2', 'dis': '33151'}, 'values_01a': {'type': 'decr', 'elem': 'all', 'test': 'valueAbsHtml', 'score': 4, 'level': 'AA', 'trust': '0.9', 'top': 1, 'steps': 1, 'ref': 'G146', 'scs': '1.4.4', 'dis': '15222'}, 'values_01b': {'type': 'true', 'elem': 'all', 'test': 'valueRelHtml', 'score': 10, 'level': 'aa', 'trust': '0.9', 'ref': 'G146', 'scs': '1.4.4', 'dis': '15222'}, 'values_02a': {'type': 'decr', 'elem': 'all', 'test': 'valueAbsCss', 'score': 3, 'level': 'AAA', 'trust': '0.9', 'top': 1, 'steps': 1, 'ref': 'C24', 'scs': '1.4.8', 'dis': '15113'}, 'values_02b': {'type': 'true', 'elem': 'all', 'test': 'valueRelCss', 'score': 10, 'level': 'aaa', 'trust': '1', 'ref': 'C24', 'scs': '1.4.8', 'dis': '15113'}, 'w3c_validator_01a': {'type': 'fals', 'elem': 'w3cValidator', 'test': 'w3cValidatorErrors', 'score': 10, 'level': 'a', 'trust': '1', 'ref': 'G134', 'scs': '4.1.1', 'dis': '22232'}, 'w3c_validator_01b': {'type': 'decr', 'elem': 'w3cValidator', 'test': 'w3cValidatorErrors', 'score': 5, 'level': 'A', 'trust': '1', 'top': 10, 'steps': 10, 'ref': 'G134', 'scs': '4.1.1', 'dis': '22232'}, 'win_01': {'type': 'true', 'elem': 'all', 'test': 'newWinOnLoad', 'score': 3, 'level': 'A', 'trust': '0.9', 'ref': 'F52', 'scs': '3.2.1', 'dis': '53454'}};
  elems: any = {'a': 'Links', 'aAdjacentSame': 'Links adjacentes que nos conduzem a um mesmo destino', 'aImgAltNo': 'Links em que o \u00fanico conte\u00fado \u00e9 uma imagem com <code>alt<\/code> nulo ou sem legenda', 'aSameText': 'Links com o mesmo texto que apontam destinos diferentes', 'aSkip': 'Links para contornar blocos de conte\u00fado', 'aSkipFirst': 'Link para saltar para o conte\u00fado principal', 'aTitleMatch': 'Links com o mesmo texto afixado no conte\u00fado e no atributo <code>title<\/code>', 'abbrNo': 'Elementos <code>&lt;abbr&gt;<\/code> ou <code>&lt;acronym&gt;<\/code> sem defini\u00e7\u00e3o', 'acckeyRep': 'Atributos <code>accesskey<\/code> com valores duplicados', 'applet': 'Elementos <code>&lt;applet&gt;<\/code>', 'appletAltNo': 'Elementos <code>&lt;applet&gt;<\/code> sem texto alternativo', 'area': 'Zonas activas de um mapa de imagem', 'areaAltNo': '\u00c1reas de mapas de imagem sem <code>alt<\/code>', 'blink': 'Elementos <code>&lt;blink&gt;<\/code>', 'brSec': 'Sequ\u00eancia de elementos <code>&lt;br&gt;<\/code>', 'colorContrast': 'Combina\u00e7\u00f5es de cor com um r\u00e1cio de contraste inferior a 3:1', 'colorFgBgNo': 'Regras de CSS em que n\u00e3o se especifica simultaneamente a cor de fundo e\/ou cor da letra', 'cssBlink': 'Propriedade de CSS <code>text-decoration<\/code> com valor <code>blink<\/code>', 'dtd': 'DTD - Defini\u00e7\u00e3o de Tipo de Documento', 'ehandBoth': 'Manipuladores de eventos redundantes', 'ehandBothNo': 'Manipuladores de eventos n\u00e3o redundantes', 'ehandMouse': 'Manipuladores de eventos espec\u00edficos do rato', 'ehandTagNo': 'Eventos associados a elementos n\u00e3o interactivos', 'ehandler': 'Manipuladores de eventos', 'embed': 'Elementos <code>&lt;embed&gt;<\/code>', 'embedAltNo': 'Elementos <code>&lt;embed&gt;<\/code> sem <code>&lt;noembed&gt;<\/code>', 'fieldLegNo': 'Elementos <code>&lt;fieldset&gt;<\/code> sem descri\u00e7\u00e3o', 'fieldNoForm': 'Elementos <code>&lt;fieldset&gt;<\/code> usados fora de um formul\u00e1rio', 'focusBlur': 'Scripts para remover o foco', 'fontAbsVal': 'Tamanhos de letra definidos em unidades de medida absolutos', 'fontHtml': 'Elementos e Atributos (X)HTML para formatar o Texto das p\u00e1ginas (p.e. <code>&lt;basefont&gt;<\/code>, <code>&lt;font&gt;<\/code>, <code>link<\/code> e <code>alink<\/code>)', 'fontValues': 'Tamanhos de letra definidos nas CSS', 'form': 'Formul\u00e1rios', 'formSubmitNo': 'Formul\u00e1rios sem o bot\u00e3o de envio', 'frame': 'Elementos <code>&lt;frame&gt;<\/code>', 'frameDtdNo': 'Documento <code>&lt;frameset&gt;<\/code> com doctype incorrecto ou inexistente', 'frameTitleNo': 'Elementos <code>&lt;frame&gt;<\/code> sem <code>t\u00edtle<\/code>', 'frameset': 'Documento <code>&lt;frameset&gt;<\/code>', 'h1': 'Cabe\u00e7alho principal da p\u00e1gina (<code>&lt;h1&gt;<\/code>)', 'hx': 'Cabe\u00e7alhos (<code>&lt;h1&gt;<\/code>-<code>&lt;h6&gt;<\/code>)', 'hxNo': 'Cabe\u00e7alhos (<code>&lt;h1&gt;<\/code>~<code>&lt;h6&gt;<\/code>) sem conte\u00fado descritivo', 'hxSkip': 'Cabe\u00e7alhos com salto(s) de nivel hier\u00e1rquico incorrectos', 'id': 'Elementos com atributo <code>id<\/code>', 'idRep': 'Atributos <code>id<\/code> com valores duplicados', 'iframe': 'Elementos <code>iframe<\/code>', 'iframeTitleNo': 'Elementos <code>iframe<\/code> sem <code>title<\/code>', 'img': 'Imagens', 'imgAltLong': 'Imagens com um atributo <code>alt<\/code> longo', 'imgAltNo': 'Imagens sem <code>alt<\/code>', 'imgAltNot': 'Imagens com um texto alternativo incorrecto', 'imgAltNull': 'Imagens com <code>alt<\/code> nulo', 'inpImg': 'Bot\u00f5es gr\u00e1ficos', 'inpImgAltNo': 'Bot\u00f5es gr\u00e1ficos sem <code>alt<\/code>', 'inputAltNo': 'Elementos <code>&lt;input&gt;<\/code> com atributo <code>alt<\/code>', 'inputIdTitleNo': 'Controlos de formul\u00e1rio sem etiquetas [&lt;label&gt;] associadas e sem atributo <code>title<\/code>', 'inputLabel': 'Controlos de formul\u00e1rio que t\u00eam explicitamente associados uma etiqueta (<code>&lt;label&gt;<\/code>)', 'inputLabelNo': 'Controlos de formul\u00e1rio sem etiquetas associadas', 'justifiedCss': 'Texto justificado com CSS', 'justifiedTxt': 'Texto justificado com atributos (X)HTML', 'label': 'Elementos <code>&lt;label&gt;<\/code>', 'labelForNo': 'Elementos <code>&lt;label&gt;<\/code> sem associa\u00e7\u00e3o expl\u00edcita', 'labelPosNo': 'Elementos <code>&lt;label&gt;<\/code> posicionadas incorrectamente', 'labelTextNo': 'Elementos <code>&lt;label&gt;<\/code> sem conte\u00fado texto', 'lang': 'Idioma principal da p\u00e1gina', 'langCodeNo': 'C\u00f3digo de idioma incorrecto', 'langExtra': 'Atributos <code>lang<\/code> ou <code>xml:lang<\/code> n\u00e3o permitidos', 'langMatchNo': 'Indica\u00e7\u00f5es de idioma n\u00e3o coincidentes', 'langNo': 'Idioma principal n\u00e3o referenciado', 'layoutAttr': 'Atributos (X)HTML para formatar o Layout das p\u00e1ginas (p.e. <code>align<\/code>, <code>hspace<\/code> e <code>bgcolor<\/code>)', 'layoutElem': 'Elementos (x)HTML para formatar o Layout das p\u00e1ginas (p.e. <code>&lt;blink&gt;<\/code> e <code>&lt;center&gt;<\/code>)', 'layoutFixed': 'Elementos com valores absolutos na propriedade "width" da CSS', 'liNoList': 'Itens de lista utilizados fora das listas', 'lineHeightNo': 'Espa\u00e7amento entre linhas incorrecto', 'linkRel': 'Elementos <code>&lt;link&gt;<\/code> para navega\u00e7\u00e3o', 'longDImg': 'Atributos <code>longdesc<\/code> em <code>&lt;img&gt;<\/code>', 'longDNo': 'Atributos <code>longdesc<\/code> com valores incorrectos', 'marquee': 'Elementos <code>&lt;marquee&gt;<\/code>', 'metaRedir': 'Elemento <code>&lt;meta&gt;<\/code> para redireccionar os utilizadores', 'metaRefresh': 'Elemento <code>&lt;meta&gt;<\/code> para reiniciar a p\u00e1gina', 'newWinOnLoad': 'Nova janela assim que a p\u00e1gina \u00e9 carregada', 'object': 'Elementos <code>&lt;object&gt;<\/code>', 'objectAltNo': 'Elementos <code>&lt;object&gt;<\/code> sem textos alternativos', 'scopeNo': 'Valores inv\u00e1lidos para o atributo <code>scope<\/code>', 'table': 'Tabelas', 'tableCaptionSummary': 'Tabelas com o mesmo texto no elemento <code>&lt;caption&gt;<\/code> e no atributo <code>summary<\/code>', 'tableComplex': 'Tabelas de dados complexas', 'tableComplexError': 'Tabelas de dados complexas sem o atributo <code>headers<\/code> nas c\u00e9lulas de dados', 'tableData': 'Tabelas de dados', 'tableDataCaption': 'Tabelas de dados sem o elemento <code>&lt;caption&gt;<\/code> ou o atributo <code>summary<\/code>', 'tableLayout': 'Tabelas sem c\u00e9lulas de cabe\u00e7alhos (i.e. elementos <code>&lt;th&gt;<\/code>)', 'tableLayoutCaption': 'Tabelas sem c\u00e9lulas de cabe\u00e7alhos, mas com o elemento <code>&lt;caption&gt;<\/code> ou o atributo <code>summary<\/code>', 'tableNested': 'Tabelas encadeadas', 'titleChars': 'T\u00edtulo com cadeia de caracteres n\u00e3o textuais (provavelmente arte ASCII)', 'titleLong': 'Quantidade de caracteres no elemento <code>&lt;title&gt;<\/code>', 'titleNo': 'Elemento <code>&lt;title&gt;<\/code> inexistente', 'titleNull': 'Elemento <code>&lt;title&gt;<\/code> sem conte\u00fado textual', 'titleOk': 'T\u00edtulo da p\u00e1gina', 'titleSame': 'T\u00edtulo da p\u00e1gina repetido noutras p\u00e1ginas do s\u00edtio', 'titleVrs': 'Elementos <code>&lt;title&gt;<\/code>', 'valueAbsCss': 'Unidades de medida absolutas nas CSS', 'valueAbsHtml': 'Unidades de medida absolutas em (X)HTML', 'valueRelCss': 'Unidades de medida relativas em CSS', 'valueRelHtml': 'Unidades de medida relativas em (X)HTML', 'w3cValidator': 'Valida\u00e7\u00e3o (X)HTML', 'w3cValidatorErrors': 'Erros de valida\u00e7\u00e3o (X)HTML'};
  elemStats: any = {'aImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'a': {'lev': 'AA', 't': 0, 'p': 0}, 'aAdjacentSame': {'lev': 'A', 't': 0, 'p': 0}, 'aSameText': {'lev': 'AAA', 't': 0, 'p': 0}, 'abbrNo': {'lev': 'AAA', 't': 0, 'p': 0}, 'acckeyRep': {'lev': 'A', 't': 0, 'p': 0}, 'appletAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'areaAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'blink': {'lev': 'A', 't': 0, 'p': 0}, 'cssBlink': {'lev': 'A', 't': 0, 'p': 0}, 'colorContrast': {'lev': 'AA', 't': 0, 'p': 0}, 'ehandMouse': {'lev': 'A', 't': 0, 'p': 0}, 'ehandBothNo': {'lev': 'A', 't': 0, 'p': 0}, 'ehandTagNo': {'lev': 'A', 't': 0, 'p': 0}, 'embedAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldLegNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldNoForm': {'lev': 'A', 't': 0, 'p': 0}, 'fontHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'fontAbsVal': {'lev': 'AA', 't': 0, 'p': 0}, 'formSubmitNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameDtdNo': {'lev': 'A', 't': 0, 'p': 0}, 'hx': {'lev': 'A', 't': 0, 'p': 0}, 'hxNo': {'lev': 'AA', 't': 0, 'p': 0}, 'hxSkip': {'lev': 'AAA', 't': 0, 'p': 0}, 'idRep': {'lev': 'A', 't': 0, 'p': 0}, 'iframeTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNot': {'lev': 'A', 't': 0, 'p': 0}, 'inpImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'inputIdTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'justifiedTxt': {'lev': 'AAA', 't': 0, 'p': 0}, 'justifiedCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'labelForNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelPosNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelTextNo': {'lev': 'A', 't': 0, 'p': 0}, 'langCodeNo': {'lev': 'A', 't': 0, 'p': 0}, 'langNo': {'lev': 'A', 't': 0, 'p': 0}, 'langMatchNo': {'lev': 'A', 't': 0, 'p': 0}, 'langExtra': {'lev': 'A', 't': 0, 'p': 0}, 'layoutElem': {'lev': 'A', 't': 0, 'p': 0}, 'layoutAttr': {'lev': 'A', 't': 0, 'p': 0}, 'liNoList': {'lev': 'A', 't': 0, 'p': 0}, 'longDNo': {'lev': 'A', 't': 0, 'p': 0}, 'marquee': {'lev': 'A', 't': 0, 'p': 0}, 'metaRefresh': {'lev': 'A', 't': 0, 'p': 0}, 'metaRedir': {'lev': 'A', 't': 0, 'p': 0}, 'objectAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'scopeNo': {'lev': 'A', 't': 0, 'p': 0}, 'tableLayoutCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableDataCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableCaptionSummary': {'lev': 'A', 't': 0, 'p': 0}, 'titleVrs': {'lev': 'A', 't': 0, 'p': 0}, 'titleNo': {'lev': 'A', 't': 0, 'p': 0}, 'titleNull': {'lev': 'A', 't': 0, 'p': 0}, 'titleSame': {'lev': 'A', 't': 0, 'p': 0}, 'valueAbsHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'valueAbsCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'w3cValidatorErrors': {'lev': 'A', 't': 0, 'p': 0}, 'newWinOnLoad': {'lev': 'A', 't': 0, 'p': 0}};

  @Input('tag') tag: string;
  @Input('pages') pages: Array<any>;

  resultsKeys: Array<string>;
  results: any;
  errors: any;

  constructor() {
    this.errors = {};
    this.results = {};
  }

  ngOnInit(): void {
    const keys = _.uniq(_.map(this.tests, 'test'));
    const size = _.size(keys);

    for (const p of this.pages) {
      const tot = JSON.parse(atob(p.Tot));

      const perrors = tot.elems;

      for (const t in tot.results) {
        if (t) {
          const v = tot.results[t];
          if (!this.results[t]) {
            this.results[t] = v;
          }
        }
      }

      for (let i = 0 ; i < size ; i++) {
        const k = keys[i];
        /*if (k === 'a' || k === 'hx') {
          if (perrors[k]) {
            if (_.includes(_.keys(this.errors), k)) {
              this.errors[k]['n_elems']++;
              this.errors[k]['n_pages']++;
            } else {
              this.errors[k] = { n_elems: 1, n_pages: 1 };
            }
          } else if (!this.errors[k]) {
            this.errors[k] = { n_elems: 0, n_pages: 0 };
          }
        } else {
          if (perrors[k]) {
            let n = 0;
            if (k === 'langNo' || k === 'langCodeNo' || k === 'langExtra' || k === 'titleNo') {
              n = 1;
            } else {
              n = parseInt(perrors[k], 0);
            }
            if (_.includes(_.keys(this.errors), k)) {
              this.errors[k]['n_elems'] += n;
              this.errors[k]['n_pages']++;
            } else {
              this.errors[k] = { n_elems: n, n_pages: 1 };
            }
          } else if (!this.errors[k]) {
            this.errors[k] = { n_elems: 0, n_pages: 0 };
          }
        }*/
        if (perrors[k]) {
          let n = 0;
          let lang = null;
          if (k === 'langNo' || k === 'langCodeNo' || k === 'langExtra' || k === 'titleNo') {
            n = 1;
          } else if (k === 'lang') {
            n = 1;
            lang = _.split(tot.results['lang_01'], '@')[3];
          } else {
            n = parseInt(perrors[k], 0);
          }
          if (_.includes(_.keys(this.errors), k)) {
            this.errors[k]['n_elems'] += n;
            this.errors[k]['n_pages']++;
            if (lang) {
              this.errors[k]['lang'].push(lang);
            }
          } else {
            this.errors[k] = { n_elems: n, n_pages: 1 };
            if (lang) {
              this.errors[k]['lang'] = [];
              this.errors[k]['lang'].push(lang);
            }
          }
        } else if (!this.errors[k]) {
          this.errors[k] = { n_elems: 0, n_pages: 0 };
        }
      }
    }

    const results = {};

    for (const h in this.comboio) {
      if (h) {
        for (const t in this.comboio[h]) {
          if (!this.tests[t] || !this.results[t]) {
            continue;
          }

          if (!results[h]) {
            results[h] = [];
          }

          const desc = t;
          const result = this.results[t];
          const test = this.tests[t]['test'];
          const langs = this.errors[test]['lang'];
          const n_elems = this.errors[test]['n_elems'];
          const n_pages = this.errors[test]['n_pages'];

          if (n_elems === 0 && n_pages === 0) {
            continue;
          }

          const lvl = _.toUpper(this.tests[t]['level']);

          const s = _.split(result, '@');

          const _class = parseInt(s[0], 0) === 10 ? 'scoreok' : parseInt(s[0], 0) < 6 ? 'scorerror' : 'scorewar';
          const prio = parseInt(s[0], 0) === 10 ? 3 : parseInt(s[0], 0) < 6 ? 1 : 2;
          const quartiles = this.calculateQuartiles(this.getErrorOcurrenceByPage(test));

          results[h].push({
            desc,
            test,
            lang: _.join(_.uniq(langs), ', '),
            n_elems,
            n_pages,
            lvl,
            _class,
            prio,
            quartiles
          });
        }
      }
    }

    this.resultsKeys = _.keys(results);
    this.results = results;
  }

  getErrorOcurrenceByPage(error: string): Array<number> {
    const ocur = new Array<number>();
    for (const p of this.pages) {
      const e = JSON.parse(atob(p.Tot)).elems;
      ocur.push(e[error]);
    }

    return _.without(ocur, undefined);
  }

  calculateQuartiles(errors: any): Array<any> {
    const values = _.without(errors, undefined).sort((a, b) => a - b);

    let q1, q2, q3, q4;

    q1 = values[Math.round(0.25 * (values.length + 1)) - 1];

    if (values.length % 2 === 0) {
      q2 = (values[(values.length / 2) - 1] + values[(values.length / 2)]) / 2;
    } else {
      q2 = values[(values.length + 1) / 2];
    }

    q3 = values[Math.round(0.75 * (values.length + 1)) - 1];
    q4 = values[values.length - 1];

    const tmp = {
      q1: new Array<number>(),
      q2: new Array<number>(),
      q3: new Array<number>(),
      q4: new Array<number>()
    };

    let q;
    for (const v of values) {
      if (v <= q1) {
        q = 'q1';
      } else {
        if (v <= q2) {
          q = 'q2';
        } else {
          if (v <= q3) {
            q = 'q3';
          } else {
            q = 'q4';
          }
        }
      }

      tmp[q].push(v);
    }

    const final = new Array<any>();

    for (const k in tmp) {
      if (k) {
        const v = tmp[k];
        const sum = v.length;

        if (sum > 0) {
          const test = {
            tot: sum,
            por: Math.round((sum * 100) / values.length),
            int: {
              lower: v[0],
              upper: v[v.length - 1]
            }
          };
          final.push(test);
        }
      }
    }

    return final;
  }
}
