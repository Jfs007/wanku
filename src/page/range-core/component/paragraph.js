import Base from './base.js';
import textUnit from './text-unit'
export default class Paragraphs extends Base {
    constructor(textUnits) {
        super();
        // 段落数
        this.number = 0;
        this.paragragh = [];
        this.spans = [];
        this.select_comment_id = '';
        // this.p_class = p_class;
        this.init(textUnits);


    }
    init(textUnits) {
        let lineFeedIndex = 0;
        for (let index = textUnits.length - 1; index >= 0; index--) {
            let unit = textUnits[index];
            if (unit.isLineFeed()) {
                this.paragragh.unshift(unit);
                lineFeedIndex = this.number;
                this.number++;
            } else {
                if (!this.spans[lineFeedIndex]) {
                    this.spans.unshift([])
                }
                this.spans[0].unshift(unit);
            }
        }

    }
    getTextLength(text) {
        return text.length;
    }
    getLastUnit(spans) {
        return spans[spans.length - 1];
    }
    getPrevUnit(pos, level = 1) {
        let [pindex, uindex] = pos;
        let currentSpans = this.spans[pindex];
        if (uindex == 0) return this.spans[pindex - 1] ? this.getLastUnit(this.spans[pindex - 1]) : null;
        return currentSpans[uindex - 1];

    }

    getTextRange(pos, pos1, startOffset, endOffset) {
        let textRange = [0, 0];
        for (let index = 0; index <= pos1[0]; index++) {
            let spans = this.spans[index];

            let startCount = true;
            let endCount = true;
            spans.map((unit, idx) => {

                // 表示在第一行
                if ((index == pos[0]) && startCount) {
                    if (idx == pos[1]) {
                        startCount = false;
                        textRange[0] = textRange[0] + (+startOffset + 1);
                    }
                }

                if ((pos1[0] == index) && endCount) {

                    if (idx == pos1[1]) {
                        endCount = false;
                        textRange[1] = textRange[1] + (+endOffset);
                    }


                }
                if (startCount) {
                    textRange[0] = textRange[0] + unit.getTextLength();
                    textRange[1] = textRange[0];
                }
                if (!startCount && endCount) {
                    textRange[1] = textRange[1] + unit.getTextLength();
                }

            });


        }
        return textRange;
    }
    getNextUnit(pos, level = 1) {
        let [pindex, uindex] = pos;
        let currentSpans = this.spans[pindex];
        let currentSpansNumber = currentSpans.length;
        if (uindex == currentSpansNumber.length - 1) return this.spans[pindex + 1] ? this.spans[pindex + 1][0] : currentSpans[uindex + 1];
        return currentSpans[uindex + 1]
    }
    commentDiff(comments, diffComments) {
        let sameUnit = null;
        if (!(comments && diffComments)) return sameUnit;
        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            let same = diffComments.find(diffComment => comment == diffComment);
            if (same) {
                sameUnit = same;
                break;
            };
        }
        return sameUnit;

    }

    getJSON() {
        let jsonAr = [];
        for (let i = 0; i < this.spans.length; i++) {
            let span = this.spans[i];
            span.map(unit => {
                jsonAr.push({
                    ...unit
                });
            });
            jsonAr.push({
                text: '\n',
                type: 'text'
            })
        }
        return jsonAr;
    }

    setCommentSameId() {

    }

    computedComments(comments) {
        let _comments = [];
        for (let i = 0; i < this.spans.length; i++) {
            let span = this.spans[i];
            let comment_units = [];
            _comments[i] = {
                comments: comment_units
            }
            span.map(unit => {
                unit.comments.map(comment => {
                    let fidx = comments.findIndex(_ => _.id == comment);
                    // 存在相同的comment
                    if (fidx > -1) {
                        let sameid_comment_idx = comment_units.findIndex(_ => _.id == comment);
                        if (sameid_comment_idx > -1) {
                            comment_units[sameid_comment_idx].unit.push(comments[fidx]);
                        } else {
                            comment_units.push({
                                id: comment,
                                unit: []
                            })
                        }
                        comments.splice(fidx, 1);
                    }
                })

            });
        }
        return _comments;
    }
    computedComments2x(comments) {
        let _comments = [];
        for (let i = 0; i < this.spans.length; i++) {
            let span = this.spans[i];
            span.map(unit => {
                unit.comments.map(comment => {
                    let COMMENTS = _comments.find(_ => _.id == comment);
                    if(!COMMENTS) {
                        _comments.push({
                            top: 0,
                            index: i,
                            id: comment,
                            unit: []
                        })
                    }
                    COMMENTS.unit.push(comments.pop());
                })

            });
        }
        return _comments;
    }



    selectComment(pos) {
        let [pindex, uindex] = pos;
        let unit = this.spans[pindex][uindex];
        let comments = unit.comments;
        let prevUnit = this.getPrevUnit(pos);
        let nextUnit = this.getNextUnit(pos);
        let prevSame = this.commentDiff(comments, prevUnit ? prevUnit.comments : []);
        let nextSame = this.commentDiff(comments, nextUnit ? nextUnit.comments : []);
        if (prevSame && nextSame) {
            this.select_comment_id = prevSame
            if (prevSame == nextSame) {

                let sameComments = unit.comments.filter(_ => _ == prevSame)[0];
                if (sameComments.length) {
                    this.select_comment_id = prevSame;
                } else {
                    this.select_comment_id = unit.comments.filter(_ => _ != prevSame)[0];
                }

                // this.select_comment_id = unit.comments.filter(_ => _ == prevSame)[0];
            } else {
                this.select_comment_id = nextSame;
            }
        } else {
            if (!prevSame && !nextSame) {
                this.select_comment_id = unit.comments[0];
            } else {
                if (prevSame != nextSame) {
                    this.select_comment_id = unit.comments[0];
                } else {
                    this.select_comment_id = nextSame || prevSame;
                }

            }

        }
    }





    mapUnit() {
        for (let index = pos[0]; index <= pos1[0]; index++) {

        }
    }

    splitUnit(componse, comments, textRange) {
        let [[start, pos], [start1, pos1]] = componse;
        let unit1 = this.spans[pos[0]][pos[1]];
        let unit2 = this.spans[pos1[0]][pos1[1]];
        if (pos1[0] - pos[0] > 0) {
            for (let index = pos[0]; index <= pos1[0]; index++) {
                let spans = this.spans[index];
                spans.map((unit, idx) => {
                    // 表示在第一行
                    if (pos1[0] - index == pos1[0] - pos[0]) {
                        if (idx > pos[1]) {
                            unit.setComments(comments);
                        }
                    } else if (pos1[0] - index == 0) {
                        // 表示在最后行
                        if (idx < pos1[1]) {
                            unit.setComments(comments);
                        }
                    } else {
                        unit.setComments(comments);
                    }
                })
            }
        }
        if (pos1[0] - pos[0] == 0 && pos1[1] - pos[1] > 1) {
            this.spans[pos[0]].map((unit, index) => {
                if (pos1[1] > index && pos[1] < index) {
                    unit.setComments(comments);
                }
            })
        }


        let isUnitSame = (pos[0] == pos1[0] && pos[1] == pos1[1]);
        let isParagraghSame = pos[0] == pos1[0];
        if (!unit1.isText()) {
            unit1.setComments(comments);
        }


        let modal = unit1.fission(start, isUnitSame ? start1 : undefined);

        modal = modal.map(_ => {
            let unit = new textUnit({
                ...unit1,
                text: _.text
            });
            if (_.isRange) {
                unit.setComments(comments);
            }
            return unit;
        });
        if (modal.length) {
            this.spans[pos[0]].splice(pos[1], 1, ...modal);
        }

        if (!isUnitSame) {

            if (!unit2.isText()) {
                unit2.setComments(comments);
            }
            let oneModalLength = modal.length;
            modal = unit2.fission(0, start1);
            modal = modal.map(_ => {
                let unit = new textUnit({
                    ...unit2,
                    text: _.text
                });
                if (_.isRange) {
                    unit.setComments(comments);
                }
                return unit;
            });

            let offset = oneModalLength - 1 <= 0 ? 0 : oneModalLength - 1;
            let pos11 = +pos1[1] + (isParagraghSame ? offset : 0);
            if (modal.length) {
                this.spans[pos1[0]].splice(pos11, 1, ...modal);
            }

        }

    }
}