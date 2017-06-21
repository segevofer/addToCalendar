$(function () {
    var timePickerDef = {
        datepicker: false,
        format: 'H:i',
        allowTimes: [
            '00:00', '00:30',
            '01:00', '01:30',
            '02:00', '02:30',
            '03:00', '03:30',
            '04:00', '04:30',
            '05:00', '05:30',
            '06:00', '06:30',
            '07:00', '07:30',
            '08:00', '08:30',
            '09:00', '09:30',
            '10:00', '10:30',
            '11:00', '11:30',
            '12:00', '12:30',
            '13:00', '13:30',
            '14:00', '14:30',
            '15:00', '15:30',
            '16:00', '16:30',
            '17:00', '17:30',
            '18:00', '18:30',
            '19:00', '19:30',
            '20:00', '20:30',
            '21:00', '21:30',
            '22:00', '22:30',
            '23:00', '23:30'
        ]
    };

    var datePickerDef = {
        timepicker: false,
        format: 'd.m.Y'
    };

    $('#fromDate').datetimepicker(datePickerDef);
    $('#fromTime').datetimepicker(timePickerDef);
    $('#toDate').datetimepicker(datePickerDef);
    $('#toTime').datetimepicker(timePickerDef);
    $('#createEventButton').on('click', updateLink);

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

        var isValidEvent = !!from && !!to && !!title;
        return isValidEvent ? createAddToCalendarLink(title, from, to, place, details) : undefined;
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
        if (link) {
            document.getElementById('result').href = link;
            document.getElementById('result').innerHTML = link;
            copyToClipboard(link);
        }
    }

    function copyToClipboard(link) {
        clipboard.copy(link).then(showCopyIndication, function () {
        });
    }

    function showCopyIndication() {
        $('#copiedToClipboard').show();
        setTimeout(function () {
            $('#copiedToClipboard').hide();
        }, 2000)
    }

});
