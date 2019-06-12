import $ from 'jquery';

$(document).ready(function(){
    $('.home-icon').click(function(){
        var home = $('.home-icon');
        var star = $('.star-icon');

        home.css({
            "margin-top" : "110px",
            "margin-bottom" : "20px",
            "background-color" : "#313541",
            "padding" : "7px"
        })

        star.css({
            "background-color" : "#00E4BD",
            "padding" : "7px"
        })
    })

    $('.star-icon').click(function(){
        var home = $('.home-icon');
        var star = $('.star-icon');

        home.css({
            "margin-top" : "110px",
            "margin-bottom" : "20px",
            "background-color" : "#00E4BD",
            "padding" : "7px"
        })

        star.css({
            "background-color" : "#313541",
            "padding" : "7px"
        })
    })
})