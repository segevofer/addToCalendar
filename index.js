$(function () {
    var timePickerDef = {datepicker:false, format:'H:i'};
    var datePickerDef = {timepicker: false ,format:'d.m.Y'};

    $('#fromDate').datetimepicker(datePickerDef);
    $('#fromTime').datetimepicker(timePickerDef);
    $('#toDate').datetimepicker(datePickerDef);
    $('#toTime').datetimepicker(timePickerDef);

    setTimeout(function () {
        $('#title').focus();
    }, 100);

    function createAddToCalendarLink(title, from, to, location, details) {
        return 'https://calendar.google.com/calendar/render?' +
            'action=TEMPLATE' +
            '&text=' + title.split(' ').join('+') +
            '&dates=' + from + '/' + to +
            '&details=' + details +
            '&location=' + location.split(' ').join('+') +
            '&sf=true&output=xml';
    }

    function generateLink() {
        const from = getDate('fromDate', 'fromTime');
        const to = getDate('toDate', 'toTime');
        const title = $('#title').val();
        const place = $('#place').val();
        const details = $('#details').val();

        if (from && to && title) {
            return createAddToCalendarLink(title, from, to, place, details);
        }
        return '';
    }

    function getDate(dateId, timeId) {
        var date = $('#' + dateId).val();
        var time = $('#' + timeId).val();

        if (!date || !time) {
            return '';
        }

        var dateSplit = date.split('.');
        var timeSplit = time.split(':');

        var day = dateSplit[0],
            month = dateSplit[1],
            year = dateSplit[2];

        var hour = timeSplit[0],
            minute = timeSplit[1];

        return year + month + day + 'T' + hour + minute + '00';
    }

    function updateLink() {
        var link = generateLink();
        if (!link) {
            return;
        }
        document.getElementById('result').href = link;
        document.getElementById('result').innerHTML = link;
        copyToClipboard(link);
    }

    $('#createEventButton').on('click', updateLink);

    function copyToClipboard(link) {
        clipboard.copy(link).then(showCopyIndication, function () {});
    }

    $('#copiedToClipboard').hide();
    function showCopyIndication() {
        $('#copiedToClipboard').show();
        setTimeout(function () {
            $('#copiedToClipboard').hide();
        }, 2000)
    }

});
