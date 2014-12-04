module.exports = {
    reg: {
        link: /(http|https|ftp)\:\/\/[\.\-\_\/a-zA-Z0-9\~\?\%\#\=\@\:\&\;\*\+\!\(\)\{\}]+\b[\?\#\/\*\=]*/g
    },
    string: {
        insertText: function (obj, str) {
            if (document.selection) {
                obj.focus();
                sel = document.selection.createRange();
                sel.text = str;
                sel.select();
            }
            else if (obj.selectionStart || obj.selectionStart == '0') {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    restoreTop = obj.scrollTop;
                obj.focus();
                obj.value = obj.value.substring(0, startPos) + str + obj.value.substring(endPos, obj.value.length);
                if (restoreTop > 0) {
                    obj.scrollTop = restoreTop;
                }
                startPos += str.length;
                obj.selectionStart = obj.selectionEnd = startPos;
            } else {
                obj.value += str;
                obj.focus();
            }
        }
    }
};