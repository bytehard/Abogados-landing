(function ($) {
  "use strict";

  var WHATSAPP_NUMBER = "";

  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  $(".navbar-toggle").on("click", function () {
    $(".custom-navbar").toggleClass("nav-open");
  });

  $(window).on("scroll", function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });

  $(".smoothScroll").on("click", function (event) {
    var target = $(this).attr("href");

    if (target && target.charAt(0) === "#" && $(target).length) {
      $("html, body").stop().animate({
        scrollTop: $(target).offset().top - 64
      }, 700);
      event.preventDefault();
    }
  });

  var today = new Date().toISOString().split("T")[0];
  $("#booking-day").attr("min", today);

  $("#reservation-form").on("submit", function (event) {
    event.preventDefault();

    var data = {
      nombre: $("#full-name").val().trim(),
      whatsapp: $("#whatsapp").val().trim(),
      ciudad: $("#city").val(),
      tema: $("#topic").val(),
      situacion: $("#case-summary").val().trim(),
      dia: $("#booking-day").val(),
      hora: $("#booking-time").val()
    };

    var message = [
      "Solicitud de videollamada gratuita",
      "",
      "Nombre: " + data.nombre,
      "WhatsApp: " + data.whatsapp,
      "Ciudad: " + data.ciudad,
      "Tema: " + data.tema,
      "Situación: " + data.situacion,
      "Dia: " + data.dia,
      "Hora: " + data.hora
    ].join("\n");

    try {
      localStorage.setItem("ultimaReservaAbogados", JSON.stringify(data));
    } catch (error) {
      // Local storage can be unavailable in private browsing.
    }

    if (WHATSAPP_NUMBER) {
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank");
      $("#form-status").text("Se abrio WhatsApp para completar la reserva.");
      return;
    }

    $("#form-status").text("Solicitud preparada. Falta configurar el número de WhatsApp o la integración de agenda para recibir reservas.");
  });
})(jQuery);
