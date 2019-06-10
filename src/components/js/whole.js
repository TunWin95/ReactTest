$(document).ready(function() {
    $('.extract-year').load(function (redate)
    {
        moment(redate, "DD/MM/YYYY").year();
    });
});