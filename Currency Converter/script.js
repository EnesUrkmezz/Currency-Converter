// Kullanacağımız dövizler
const currencies = ["USD", "EUR", "JPY", "GBP", "DKK", "NOK"];

// API anahtarı
const apiURL = "https://api.exchangerate.host/latest?base=TRY";

// API'den verileri almak için AJAX isteği gönderdim
$.ajax({
  url: apiURL,
  method: "GET",
  dataType: "json",
  success: function (data) {
    // AJAX isteği başarılı olursa, döviz kurlarını yazdırıcaz
    currencies.forEach(function (currency) {
      // Döviz kuru bilgileri
      const rate = data.rates[currency];
      const buyPrice = rate.toFixed(4); // Alış fiyatı
      const sellPrice = (1 / rate).toFixed(4); // Satış fiyatı

      // Döviz kuru bilgilerini ekrana yazdırdım
      $(`#${currency.toLowerCase()}-buy`).text(buyPrice);
      $(`#${currency.toLowerCase()}-sell`).text(sellPrice);
    });
  },
});

// Döviz Çevirici
$(document).ready(function () {
  $("#amount, #currency").on("input", function () {
    var amount = $("#amount").val();
    var currency = $("#currency").val();
    var apiURL = "https://api.exchangerate.host/latest?base=" + currency;

    $.ajax({
      url: apiURL,
      success: function (data) {
        var rate = data.rates["TRY"];
        var tlAmount = amount * rate;
        $("#tl-amount").val(
          tlAmount.toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      },
    });
  });
});
