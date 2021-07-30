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
                        textRange[0] = textRange[0] + (+startOffset+1);
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
                this.select_comment_id = unit.comments.filter(_ => _ != prevSame)[0];
                // this.select_comment_id = isPrevSame;
            } else {
                this.select_comment_id = nextSame;
                //     this.select_comment_id = nextSame;
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

    splitText(text, start, end) {

        return [text.substr(0, start), text.substr(start, end)];
    }





    splitUnit(componse, comments) {
        let [[start, pos], [start1, pos1]] = componse;
        let unit1 = this.spans[pos[0]][pos[1]];
        let unit2 = this.spans[pos1[0]][pos1[1]];
        
        let unit1text = unit1.text;
        let unit2text = unit2.text;
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
        if(pos1[0] - pos[0] == 0 && pos1[1] - pos[1]>1) {
            this.spans[pos[0]].map((unit, index) => {
                if(pos1[1]>index&&pos[1]<index) {
                    unit.setComments(comments);
                }
            })
        }

        let isUnitSame = (pos[0] == pos1[0] && pos[1] == pos1[1]);
        let isParagraghSame = pos[0] == pos1[0];


        let [text1, text2] = this.splitText(unit1text, start);
        if (!text1 || !text2) { isParagraghSame = false } else {
            let textUnits = [];
            if (text1) {
                let tu1 = new textUnit({
                    ...unit1,
                    text: text1,
                });
                textUnits.push(tu1);
            }
            if (text2) {
                let tu2 = new textUnit({
                    ...unit1,
                    text: text2,
                });
                tu2.setComments(comments);
                textUnits.push(tu2);
            }


            this.spans[pos[0]].splice(pos[1], 1, ...textUnits
            );
        };

        // 同一个元素
        if (isUnitSame) {
            unit2text = text2;
            start1 = start1 - start;
        }
        let [text3, text4] = this.splitText(unit2text, start1);
        // console.log(text3, text4)
        let pos11 = +pos1[1] + (isParagraghSame ? 1 : 0);
        let textUnits1 = [];
        if (text3) {
            let tu3 = new textUnit({
                ...unit2,
                text: text3,
            });
            tu3.setComments(comments);
            textUnits1.push(tu3);

        }

        if (text4) {
            let tu4 = new textUnit({
                ...unit2,
                text: text4
            })
            textUnits1.push(tu4);
        }
        this.spans[pos1[0]].splice(pos11, 1, ...textUnits1);














    }
}