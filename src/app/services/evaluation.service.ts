import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map, retry, catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { Parser } from 'htmlparser2';
import DomHandler from 'domhandler';
import * as DomUtils from 'domutils';
import * as CSSSelect from 'css-select';

import * as _ from 'lodash';

import { Response } from '../models/response';
import { Evaluation } from '../models/evaluation';
import { AsError } from '../models/error';

import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { MessageService } from './message.service';

import tests from './tests.new';
import scs from './scs';
import xpath from './xpath';
import tests_colors from './tests_colors';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  url: string;
  evaluation: Evaluation;

  constructor(
    private router: Router,
    private http: HttpClient,
    private message: MessageService,
    private user: UserService,
    private config: ConfigService,
    private translate: TranslateService
  ) { }

  getEvaluation(tag: string, website: string, url: string): Observable<Evaluation> {
    if (this.url && _.isEqual(this.url, url) && this.evaluation) {
      return of(this.evaluation.processed);
    } else {
      const _url = sessionStorage.getItem('url');
      if (_url && _.isEqual(_url, url)) {
        this.url = _url;
        this.evaluation = <Evaluation> JSON.parse(sessionStorage.getItem('evaluation'));
        return of(this.evaluation.processed);
      } else {
        return this.http.get<any>(this.config.getServer(`/evaluation/studyMonitor/${tag}/${website}/${encodeURIComponent(url)}`), {observe: 'response'}).pipe(
          retry(3),
          map(res => {
            const response = <Response> res.body;

            if (!res.body || res.status === 404) {
              throw new AsError(404, 'Service not found', 'SERIOUS');
            }

            if (response.success !== 1) {
              throw new AsError(response.success, response.message);
            }

            this.url = url;
            this.evaluation = response.result;
            this.evaluation.processed = this.processData();
            this.fixImgSrc();
            this.fixStyleSheet();
            this.fixScripts();

            try {
              sessionStorage.setItem('url', url);
              sessionStorage.setItem('evaluation', JSON.stringify(this.evaluation));
            } catch (err) {
              console.log(err);
            }

            return this.evaluation.processed;
          }),
          catchError(err => {
            console.log(err);
            return of(null);
          }));
      }
    }
  }

  evaluateUrl(tag: string, website: string, url: string): Observable<any> {
    return this.http.post<any>(this.config.getServer('/page/studyMonitor/evaluate'), {tag, website, url: encodeURIComponent(url)}, {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.body;

        if (!res.body || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        return response.result;
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  downloadWebsiteEARL(tag: string, website: string): Observable<void> {
    return this.http.get<any>(this.config.getServer('/evaluation/studyMonitor/tag/' + tag + '/website/evaluations/' + website), {observe: 'response'}).pipe(
      retry(3),
      map(res => {
        const response = <Response> res.body;

        if (!res.body || res.status === 404) {
          throw new AsError(404, 'Service not found', 'SERIOUS');
        }

        if (response.success !== 1) {
          throw new AsError(response.success, response.message);
        }

        const data = {
          '@context': 'https://act-rules.github.io/earl-context.json',
          '@graph': new Array<any>()
        };
    
        for (const page of response.result || []) {
          this.evaluation = page;
          this.evaluation.processed = this.processData();
          const testSubject = this.generateEARL(this.evaluation);
          data['@graph'].push(testSubject);
        }
    
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/json' });
        saveAs(blob, 'eval.json');
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );      
  }

  getTestResults(test: string): any {
    if (!this.url || !this.evaluation) {
      this.url = sessionStorage.getItem('url');
      this.evaluation = JSON.parse(sessionStorage.getItem('evaluation'));
    }

    const data = this.evaluation.data;
    const allNodes = data.nodes;
    const ele = test;

    const testSee = {
      'css': ['colorContrast', 'colorFgBgNo', 'cssBlink', 'fontAbsVal', 'fontValues',
        'justifiedCss', 'layoutFixed', 'lineHeightNo', 'valueAbsCss', 'valueRelCss'
      ],
      'div': ['aGroupNo', 'applet', 'appletAltNo', 'blink', 'brSec', 'ehandBoth', 'ehandBothNo',
        'ehandMouse', 'ehandTagNo', 'ehandler', 'charSpacing', 'embed', 'embedAltNo',
        'fieldLegNo', 'fieldNoForm', 'form', 'formSubmitNo', 'hx', 'hxSkip', 'id', 'idRep',
        'iframe', 'iframeTitleNo', 'justifiedTxt', 'liNoList', 'marquee', 'object', 'objectAltNo',
        'table', 'tableCaptionSummary', 'tableComplex', 'tableComplexError', 'tableData',
        'tableDataCaption', 'tableLayout', 'tableLayoutCaption', 'tableNested', 'valueAbsHtml',
        'valueRelHtml'
      ],
      'span': ['a', 'abbrNo', 'aJs', 'aSameText', 'aAdjacent', 'aAdjacentSame', 'aImgAltNo',
        'aSkip', 'aSkipFirst', 'aTitleMatch', 'deprecElem', 'fontHtml', 'img', 'imgAltLong',
        'imgAltNo', 'imgAltNot', 'imgAltNull', 'inpImg', 'inpImgAltNo', 'inputAltNo',
        'inputIdTitleNo', 'inputLabel', 'inputLabelNo', 'label', 'labelForNo', 'labelPosNo',
        'labelTextNo', 'layoutElem', 'longDImg', 'longDNo'
      ]
    };

    let results = {};
    if (ele !== 'fontAbsVal' && ele !== 'justifiedCss' && ele !== 'lineHeightNo' && ele !== 'colorContrast' && ele !== 'colorFgBgNo' && testSee['css'].includes(ele)) {
      results = this.getCSSList(ele, JSON.parse(allNodes[ele]));
    } else {
      results = this.getElements(allNodes, ele, ele !== 'titleOk' && ele !== 'lang' /*testSee['div'].includes(ele) || testSee['span'].includes(ele)*/);
    }

    return results;
  }

  private getCSSList(ele: string, cssResults: any): any {
    const results = new Array();
    
    for (const result of cssResults || []) {
      results.push({
        file: result.stylesheetFile,
        property: ele === 'colorFgBgNo' ? result.resultCode === 'RC2' ? 'color' : 'background-color' : result.property.name,
        value: result.property.value,
        location: result.selector.value,
        line: result.property.position?.start.line,
        description: ele === 'colorFgBgNo' ? result.description : undefined
      });
    }

    return {
      type: 'css',
      elements: results,
      size: results.length,
      page: undefined,
      finalUrl: _.clone(this.evaluation.processed.metadata.url)
    };
  }

  downloadCSV(): void {
    const data = [];

    let error, level, sc, desc, num;
    const descs = ['CSV.errorType', 'CSV.level', 'CSV.criteria', 'CSV.desc', 'CSV.count'];
    const numTable = [];

    const _eval = this.evaluation.processed;

    for (const row in _eval['results']) {
      if (_eval['results'][row]) {
        const rowData = [];
        error = 'CSV.' + (_eval['results'][row]['prio'] === 3 ? 'scoreok' : _eval['results'][row]['prio'] === 2 ? 'scorewar' : 'scorerror');
        level = _eval['results'][row]['lvl'];
        //sc = _eval['scoreBoard'][row]['sc'];
        num = _eval['results'][row]['value'];
        desc = 'TESTS_RESULTS.' + _eval['results'][row]['msg'] + ((num === 1) ? '.s' : '.p');

        descs.push(desc, error);
        rowData.push(error, level, /*sc,*/ desc, num);
        data.push(rowData);
      }
    }

    this.translate.get(descs).subscribe(res => {
      const labels = new Array <string>();

      for (const row in data) {
        if (data[row]) {
          data[row][2] = res[data[row][2]].replace('{{value}}', data[row][3]);
          data[row][2] = data[row][2].replace(new RegExp('<mark>', 'g'), '');
          data[row][2] = data[row][2].replace(new RegExp('</mark>', 'g'), '');
          data[row][2] = data[row][2].replace(new RegExp('<code>', 'g'), '');
          data[row][2] = data[row][2].replace(new RegExp('</code>', 'g'), '');
          data[row][0] = res[data[row][0]];
        }
      }
      labels.push(res['CSV.errorType']);
      labels.push(res['CSV.level']);
      //labels.push(res['CSV.criteria']);
      labels.push(res['CSV.desc']);
      labels.push(res['CSV.count']);

      let csvContent = labels.join(',') + '\r\n';
      for (const row of data || []) {
        csvContent += row.join(',') + '\r\n';
      }

      const blob = new Blob([csvContent], { type: 'text/csv' });
      saveAs(blob, 'eval.csv');
    });
  }

  private generateEARL(evaluation: any): any {
    const assertor = {
      '@id': 'Access Monitor',
      '@type': 'Software',
      homepage: 'http://accessmonitor.acessibilidade.gov.pt/amp/'
    };
  
    const testSubject = {
      '@type': 'TestSubject',
      source: evaluation.data.rawUrl,
      assertor,
      assertions: new Array<any>()
    };
    
    for (const test in evaluation.data.tot.results || {}) {
      
      const value = evaluation.processed.results.filter(r => r.msg === test)[0].tech_list.tot;
      
      const sources = new Array<any>();
      
      let pointers = new Array<any>(); 
      
      if (test === 'img_01a') {
        pointers = typeof evaluation.data.nodes['img'] === 'string' ?
          evaluation.data.nodes['img'].split(',') :
          evaluation.data.nodes['img'][0].split(',');
      } else if (evaluation.data.nodes[tests[test].test] !== undefined) {
        pointers = typeof evaluation.data.nodes[tests[test].test] === 'string' ?
          evaluation.data.nodes[tests[test].test].split(',') : 
          evaluation.data.nodes[tests[test].test][0].split(',');
      }

      for (const pointer of pointers || []) {

        const source = {
          result: {
            pointer: pointer.trim(),
            outcome: 'earl:' + (tests_colors[test] !== 'Y' ? tests_colors[test] === 'G' ? 'passed' : 'failed' : 'cantTell'),
          }
        };

        sources.push(source);
      }

      const result = {
        '@type': 'TestResult',
        outcome: 'earl:' + (tests_colors[test] !== 'Y' ? tests_colors[test] === 'G' ? 'passed' : 'failed' : 'cantTell'),
        source: sources,
        description: this.translate.instant('TESTS_RESULTS.' + test + (value === 1 ? '.s' : '.p'), { value })
                      .replace('<mark>', '')
                      .replace('</mark>', '')
                      .replace('<code>', '')
                      .replace('</code>', ''),
        date: evaluation.data.date
      };
      
      const assertion = {
        '@type': 'Assertion',
        test: {
          '@id': test,
          '@type': 'TestCase',
          title: this.translate.instant('TECHS.' + tests[test].ref),
          description: this.translate.instant('TXT_TECHNIQUES.' + tests[test].ref)
                        .replace('<p>', '')
                        .replace('</p>', '')
                        .replace('<code>', '')
                        .replace('</code>', '')
                        .replace('&lt;', '')
                        .replace('&gt;', '')
        },
        mode: 'earl:automatic',
        result
      };

      testSubject.assertions.push(assertion);
    }

    return testSubject;
  }

  downloadEARL(): void {
    const data = {
      '@context': 'https://act-rules.github.io/earl-context.json',
      '@graph': new Array<any>()
    };

    const testSubject = this.generateEARL(this.evaluation);

    data['@graph'].push(testSubject);

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/json' });
    saveAs(blob, 'eval.json');
  }

  private getElements(allNodes: Array < string > , ele: string, inpage: boolean): any {
    let path: string;

    var sub_regexes = {
      "tag": "([a-zA-Z][a-zA-Z0-9]{0,10}|\\*)",
      "attribute": "[.a-zA-Z_:][-\\w:.]*(\\(\\))?)",
      "value": "\\s*[\\w/:][-/\\w\\s,:;.]*"
  };
  
  var validation_re =
      "(?P<node>"+
        "("+
          "^id\\([\"\\']?(?P<idvalue>%(value)s)[\"\\']?\\)"+// special case! `id(idValue)`
        "|"+
          "(?P<nav>//?(?:following-sibling::)?)(?P<tag>%(tag)s)" + //  `//div`
          "(\\[("+
            "(?P<matched>(?P<mattr>@?%(attribute)s=[\"\\'](?P<mvalue>%(value)s))[\"\\']"+ // `[@id="well"]` supported and `[text()="yes"]` is not
          "|"+
            "(?P<contained>contains\\((?P<cattr>@?%(attribute)s,\\s*[\"\\'](?P<cvalue>%(value)s)[\"\\']\\))"+// `[contains(@id, "bleh")]` supported and `[contains(text(), "some")]` is not 
          ")\\])?"+
          "(\\[\\s*(?P<nth>\\d|last\\(\\s*\\))\\s*\\])?"+
        ")"+
      ")";
  
  for(var prop in sub_regexes) 
      validation_re = validation_re.replace(new RegExp('%\\(' + prop + '\\)s', 'gi'), sub_regexes[prop]);
  validation_re = validation_re.replace(/\?P<node>|\?P<idvalue>|\?P<nav>|\?P<tag>|\?P<matched>|\?P<mattr>|\?P<mvalue>|\?P<contained>|\?P<cattr>|\?P<cvalue>|\?P<nth>/gi, '');
  
  function XPathException(message) {
      this.message = message;
      this.name = "[XPathException]";
  }
  
  function cssify(xpath) {
      var prog, match, result, nav, tag, attr, nth, nodes, css, node_css = '', csses = [], xindex = 0, position = 0;
  
      // preparse xpath: 
      // `contains(concat(" ", @class, " "), " classname ")` => `@class=classname` => `.classname`
      xpath = xpath.replace(/contains\s*\(\s*concat\(["']\s+["']\s*,\s*@class\s*,\s*["']\s+["']\)\s*,\s*["']\s+([a-zA-Z0-9-_]+)\s+["']\)/gi, '@class="$1"');
      
      if (typeof xpath == 'undefined' || (
              xpath.replace(/[\s-_=]/g,'') === '' || 
              xpath.length !== xpath.replace(/[-_\w:.]+\(\)\s*=|=\s*[-_\w:.]+\(\)|\sor\s|\sand\s|\[(?:[^\/\]]+[\/\[]\/?.+)+\]|starts-with\(|\[.*last\(\)\s*[-\+<>=].+\]|number\(\)|not\(|count\(|text\(|first\(|normalize-space|[^\/]following-sibling|concat\(|descendant::|parent::|self::|child::|/gi,'').length)) {
          //`number()=` etc or `=normalize-space()` etc, also `a or b` or `a and b` (to fix?) or other unsupported keywords
          throw new XPathException('Invalid or unsupported XPath: ' + xpath);
      }
      
      var xpatharr = xpath.split('|');
      while(xpatharr[xindex]) {
          prog = new RegExp(validation_re,'gi');
          css = [];
          
          while(nodes = prog.exec(xpatharr[xindex])) {
              if(!nodes && position === 0) {
                  throw new XPathException('Invalid or unsupported XPath: ' + xpath);
              }
      
              match = {
                  node: nodes[5],
                  idvalue: nodes[12] || nodes[3],
                  nav: nodes[4],
                  tag: nodes[5],
                  matched: nodes[7],
                  mattr: nodes[10] || nodes[14],
                  mvalue: nodes[12] || nodes[16],
                  contained: nodes[13],
                  cattr: nodes[14],
                  cvalue: nodes[16],
                  nth: nodes[18]
              };
      
              if(position != 0 && match['nav']) {
                  if (~match['nav'].indexOf('following-sibling::')) nav = ' + ';
                  else nav = (match['nav'] == '//') ? ' ' : ' > ';
              } else {
                  nav = '';
              }
              tag = (match['tag'] === '*') ? '' : (match['tag'] || '');
      
              if(match['contained']) {
                  if(match['cattr'].indexOf('@') === 0) {
                      attr = '[' + match['cattr'].replace(/^@/, '') + '*=' + match['cvalue'] + ']';
                  } else { //if(match['cattr'] === 'text()')
                      throw new XPathException('Invalid or unsupported XPath attribute: ' + match['cattr']);
                  }
              } else if(match['matched']) {
                  switch (match['mattr']){
                      case '@id':
                          attr = '#' + match['mvalue'].replace(/^\s+|\s+$/,'').replace(/\s/g, '#');
                          break;
                      case '@class':
                          attr = '.' + match['mvalue'].replace(/^\s+|\s+$/,'').replace(/\s/g, '.');
                          break;
                      case 'text()':
                      case '.':
                          throw new XPathException('Invalid or unsupported XPath attribute: ' + match['mattr']);
                      default:
                          if (match['mattr'].indexOf('@') !== 0) {
                              throw new XPathException('Invalid or unsupported XPath attribute: ' + match['mattr']);
                          }
                          if(match['mvalue'].indexOf(' ') !== -1) {
                              match['mvalue'] = '\"' + match['mvalue'].replace(/^\s+|\s+$/,'') + '\"';
                          }
                          attr = '[' + match['mattr'].replace('@', '') + '=' + match['mvalue'] + ']';
                          break;
                  }
              } else if(match['idvalue'])
                  attr = '#' + match['idvalue'].replace(/\s/, '#');
              else
                  attr = '';
      
              if(match['nth']) {
                  if (match['nth'].indexOf('last') === -1){
                      if (isNaN(parseInt(match['nth'], 10))) {
                          throw new XPathException('Invalid or unsupported XPath attribute: ' + match['nth']);
                      }
                      nth = parseInt(match['nth'], 10) !== 1 ? ':nth-of-type(' + match['nth'] + ')' : ':first-of-type';
                  } else {
                      nth = ':last-of-type';
                  }
              } else {
                  nth = '';
              }
              node_css = nav + tag + attr + nth;
      
              css.push(node_css);
              position++;
          } //while(nodes
          
          result = css.join('');
    if (result === '') {
        throw new XPathException('Invalid or unsupported XPath: ' + match['node']);
    }
          csses.push(result);
          xindex++;
  
      } //while(xpatharr
  
      return csses.join(', ');
  }

    
    if (ele !== 'aSkipFirst' && allNodes[ele] !== undefined) {
      path = allNodes[ele];
    } else {
      path = !xpath[ele].includes('|') ? cssify(xpath[ele]) : xpath[ele].split('|').map(selector => cssify(selector)).join(', ');
    }
    
    const elements = this.getElementsList(ele, path);

    return {
      type: 'html',
      elements,
      size: elements.length,
      page: inpage ? this.showElementsHighlightedInPage(path, inpage, ele) : undefined,
      finalUrl: _.clone(this.evaluation.processed.metadata.url)
    };
  }

  private fixImgSrc(): void {
    const protocol = this.evaluation.processed.metadata.url.startsWith('https://') ? 'https://' : 'http://';
    const www = this.evaluation.processed.metadata.url.includes('www.') ? 'www.' : '';

    let fixSrcUrl = _.clone(this.evaluation.processed.metadata.url.replace('http://', '').replace('https://', '').replace('www.', '').split('/')[0]);
    if (fixSrcUrl[fixSrcUrl.length - 1] === '/') {
      fixSrcUrl = fixSrcUrl.substring(0, fixSrcUrl.length - 2);
    }

    const handler = new DomHandler(() => {}, { withStartIndices: true, withEndIndices: true });
    const parser = new Parser(handler);

    parser.write(this.evaluation.pagecode.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    const dom = handler.dom;
    const nodes = CSSSelect('img', dom);

    for (const node of nodes || []) {
      if (node['attribs']['src'] && !node['attribs']['src'].startsWith('http') && !node['attribs']['src'].startsWith('https')) {
        if (node['attribs']['src'].startsWith('/')) {
          node['attribs']['src'] = `${protocol}${www}${fixSrcUrl}${node['attribs']['src']}`;
        } else {
          node['attribs']['src'] = `${protocol}${www}${fixSrcUrl}/${node['attribs']['src']}`;
        }
      }
      if (node['attribs']['srcset']) {
        const split = node['attribs']['srcset'].split(', ');
        if (split.length > 0) {
          let value = '';
          for (const u of split) {
            if (!u.startsWith('http') && !u.startsWith('https')) {
              if (u.startsWith('/')) {
                value += `${protocol}${www}${fixSrcUrl}${u}, `;
              } else {
                value += `${protocol}${www}${fixSrcUrl}/${u}, `;
              }
            }
          }
          node['attribs']['srcset'] = _.clone(value.substring(0, value.length - 2));
        } else {
          node['attribs']['srcset'] = `${protocol}${www}${fixSrcUrl}${node['attribs']['srcset']}`;
        }
      }
    }

    this.evaluation.pagecode = DomUtils.getOuterHTML(dom);
  }

  private fixStyleSheet(): void {
    const protocol = this.evaluation.processed.metadata.url.startsWith('https://') ? 'https://' : 'http://';
    const www = this.evaluation.processed.metadata.url.includes('www.') ? 'www.' : '';

    let fixSrcUrl = _.clone(this.evaluation.processed.metadata.url.replace('http://', '').replace('https://', '').replace('www.', '').split('/')[0]);
    if (fixSrcUrl[fixSrcUrl.length - 1] === '/') {
      fixSrcUrl = fixSrcUrl.substring(0, fixSrcUrl.length - 2);
    }

    const handler = new DomHandler(() => {}, { withStartIndices: true, withEndIndices: true });
    const parser = new Parser(handler);

    parser.write(this.evaluation.pagecode.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    const dom = handler.dom;
    const nodes = CSSSelect('link', dom);

    for (const node of nodes || []) {
      if (node['attribs']['href'] && !node['attribs']['href'].startsWith('http') && !node['attribs']['href'].startsWith('https')) {
        if (node['attribs']['href'].startsWith('//')) {
          node['attribs']['href'] = 'http:' + node['attribs']['href'];
        } else if (node['attribs']['href'].startsWith('/')) {
          node['attribs']['href'] = `${protocol}${www}${fixSrcUrl}${node['attribs']['href']}`;
        } else {
          node['attribs']['href'] = `${protocol}${www}${fixSrcUrl}/${node['attribs']['href']}`;
        }
      }
    }

    this.evaluation.pagecode = DomUtils.getOuterHTML(dom);
  }

  private fixScripts(): void {
    const protocol = this.evaluation.processed.metadata.url.startsWith('https://') ? 'https://' : 'http://';
    const www = this.evaluation.processed.metadata.url.includes('www.') ? 'www.' : '';

    let fixSrcUrl = _.clone(this.evaluation.processed.metadata.url.replace('http://', '').replace('https://', '').replace('www.', '').split('/')[0]);
    if (fixSrcUrl[fixSrcUrl.length - 1] === '/') {
      fixSrcUrl = fixSrcUrl.substring(0, fixSrcUrl.length - 2);
    }

    const handler = new DomHandler(() => {}, { withStartIndices: true, withEndIndices: true });
    const parser = new Parser(handler);

    parser.write(this.evaluation.pagecode.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    const dom = handler.dom;
    const nodes = CSSSelect('script', dom);

    for (const node of nodes || []) {
      if (node['attribs']['src'] && !node['attribs']['src'].startsWith('http') && !node['attribs']['src'].startsWith('https')) {
        if (node['attribs']['src'].startsWith('//')) {
          node['attribs']['src'] = 'http:' + node['attribs']['src'];
        } else if (node['attribs']['src'].startsWith('/')) {
          node['attribs']['src'] = `${protocol}${www}${fixSrcUrl}${node['attribs']['src']}`;
        } else {
          node['attribs']['src'] = `${protocol}${www}${fixSrcUrl}/${node['attribs']['src']}`;
        }
      }
    }

    this.evaluation.pagecode = DomUtils.getOuterHTML(dom);
  }

  private showElementsHighlightedInPage(paths: string, inpage: boolean, test: string): string {
    const handler = new DomHandler(() => {}, { withStartIndices: true, withEndIndices: true });
    const parser = new Parser(handler);

    parser.write(this.evaluation.pagecode.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();

    const dom = handler.dom;
    const nodes = CSSSelect(paths, dom);

    for (const node of nodes || []) {
      if (inpage) {
        node['attribs']['style'] = 'background:#ff0 !important;border:2px dotted #900 !important;padding:2px !important;visibility:visible !important;display:inherit !important;';
      }

      if (test === 'aSkipFirst') {
        break;
      }
    }

    return DomUtils.getOuterHTML(dom);
  }

  private getElementsList(test: string, paths: string): Array < any > {
    const handler = new DomHandler(() => {}, { withStartIndices: true, withEndIndices: true });
    const parser = new Parser(handler);

    parser.write(this.evaluation.pagecode.replace(/(\r\n|\n|\r|\t)/gm, ''));
    parser.end();
    
    const dom = handler.dom;
    const nodes = CSSSelect(paths, dom);

    const elements = new Array();

    for (const node of nodes || []) {
      let attrs = '';
      for (const attr of Object.keys(node['attribs']) || []) {
        const value = node['attribs'][attr];
        
        if (value) {
          attrs += attr + '="' + value + '" ';
        } else {
          attrs += attr+ ' ';
        }
      }

      let eleOuterHtml = DomUtils.getOuterHTML(node);
      let code = null;
      if (node['tagName'].toLowerCase() === 'title') {
        code = DomUtils.getText(node);
      } else if (node['tagName'].toLowerCase() === 'html') {
        code = node['attribs']['lang'];
        const cloneNode = _.clone(node);
        cloneNode['children'] = [];
        eleOuterHtml = DomUtils.getOuterHTML(cloneNode);
      } else {
        code = DomUtils.getOuterHTML(node);
      }

      elements.push({
        ele: node['tagName'].toLowerCase(),
        attr: attrs,
        code: code,
        showCode: eleOuterHtml,
        //pointer: paths.split(',')[elements.length]
      });

      if (test === 'aSkipFirst') {
        break;
      }
    }
    
    return elements;
  }

  private processData() {
    const tot = this.evaluation.data.tot;

    const data = {};
    data['metadata'] = {};
    data['metadata']['url'] = tot['info']['url'];
    data['metadata']['title'] = tot['info']['title'];
    data['metadata']['n_elements'] = tot['info']['htmlTags'];
    data['metadata']['score'] = tot['info']['score'];
    data['metadata']['size'] = this.convertBytes(tot['info']['size']);
    data['metadata']['last_update'] = tot['info']['date'];
    data['metadata']['count_results'] = tot['results'].length;

    data['results'] = [];

    const infoak = {
      'A': {
        'ok': 0,
        'err': 0,
        'war': 0,
      },
      'AA': {
        'ok': 0,
        'err': 0,
        'war': 0,
      },
      'AAA': {
        'ok': 0,
        'err': 0,
        'war': 0,
      }
    };

    for (const test in tests) {
      if (test) {
        if (tot.results[test]) {
          const tes = tests[test]['test'];
          const lev = tests[test]['level'];
          const ref = tests[test]['ref'];
          const ele = tests[test]['elem'];

          let color;

          if (tests_colors[test] === 'R') {
            color = 'err';
          } else if (tests_colors[test] === 'Y') {
            color = 'war';
          } else if (tests_colors[test] === 'G') {
            color = 'ok';
          }

          const level = lev.toUpperCase();

          infoak[level][color]++;

          let tnum;
          
          if (tot.elems[tes]) {
            if (tes === 'titleOk') {
              tnum = tot.info.title;
            } else if (tes === 'lang') {
              tnum = tot.info.lang;
            } else if (tes === 'titleLong') {
              tnum = tot.info.title.length;
            } else {
              tnum = tot['elems'][tes];
            }
          } else {
            tnum = tot['elems'][ele];
          }
          
          const result = {};
          result['ico'] = 'assets/images/ico' + color + '.png';
          result['color'] = color;
          result['lvl'] = level;
          result['msg'] = test;
          result['ref'] = ref;
          result['ref_website'] = 'http://www.acessibilidade.gov.pt/w3/TR/WCAG20-TECHS/' + ref + '.html';
          result['relation'] = tests[test]['ref'] === 'F' ? 'relationF' : 'relationT';
          result['ref_related_sc'] = new Array();
          result['value'] = tnum;
          result['prio'] = color === 'ok' ? 3 : color === 'err' ? 1 : 2;

          const scstmp = tests[test]['scs'].split(',');
          const li = {};
          for (let s in scstmp) {
            if (s) {
              s = scstmp[s].trim();
              if (s !== '') {
                li['sc'] = s;
                li['lvl'] = scs[s]['1'];
                li['link'] = 'https://www.w3.org/TR/UNDERSTANDING-WCAG20/' + scs[s]['0'] + '.html';

                result['ref_related_sc'].push(_.clone(li));
              }
            }
          }
          
          if (color === 'ok' && ele !== 'all') {
            result['tech_list'] = this.testView(ele, ele, tes, color, tnum);
          } else {
            result['tech_list'] = this.testView(tes, tes, tes, color, tnum);
          }

          data['results'].push(result);
        }
      }
    }

    data['infoak'] = infoak;

    return data;
  }

  private testView(ele: string, txt: string, test: string, color: string, tot: number): any {
    const item = {};

    item['txt'] = txt;
    item['tot'] = tot ? tot : 0;

    if (ele === 'dtdOld') {
      return item;
    }
    
    if (ele === 'w3cValidatorErrors') {
      item['html_validator'] = true;
      item['ele'] = 'http://validador-html.fccn.pt/check?uri=' + encodeURIComponent(this.url);
    } else if (tot || tot > 0) {
      item['ele'] = ele;
      
      if ((/*test === 'aSkipFirst' ||*/ test === 'aSkip' || test === 'langNo' || test === 'h1' || test === 'titleNo') && color === 'err') {
        delete item['ele'];
      }
    } else if (test === 'aSkipFirst') {
      item['ele'] = ele;
    }
    
    if (test === 'ehandBoth' || test === 'ehandler') {
      item['ele'] = 'ehandBoth';
    }

    return item;
  }

  private convertBytes(length: number): string {
    if (length < 1024) {
      return length + ' bytes';
    } else if (length < 1024000) {
      return Math.round((length / 1024)) + ' KB <em>(' + length + ' bytes)</em>';
    } else {
      return Math.round((length / 1048576)) + ' MB <em>(' + length + ' bytes)</em>';
    }
  }
}
